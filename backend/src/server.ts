import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import multer, { Multer, StorageEngine } from 'multer';
import { analyzeGuitarPlaying } from './gemini';

// Add error handling for unhandled errors
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 40 * 1024 * 1024, // 40MB limit for 5-second 4K iPhone videos
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Type for request with optional file from multer
interface MulterRequest extends Request {
    file?: Express.Multer.File // fallback to any for compatibility
}

app.post('/analyze-guitar-playing', upload.single('video'), async (req: MulterRequest, res: Response) => {
    try {
        console.log('Received request to /analyze-guitar-playing');
        
        const practiceTimeRaw = req.body.practiceTime;
        const practiceTime = Number(practiceTimeRaw);
        if (!practiceTimeRaw || isNaN(practiceTime) || practiceTime < 5 || practiceTime > 480) {
            return res.status(400).json({ error: 'Invalid practiceTime. Must be a number between 5 and 480.' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No video file uploaded.' });
        }

        const videoFile: Express.Multer.File = req.file;

        console.log("Received video with size", videoFile?.size, "and practiceTime", practiceTime);

        const analysis = await analyzeGuitarPlaying(videoFile.buffer, practiceTime);

        console.log('Sending response:', analysis);
        res.json(analysis);
    } catch (error) {
        console.error('Error in /analyze-guitar-playing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a simple health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const server = app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

// Add graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});