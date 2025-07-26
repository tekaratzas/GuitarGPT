import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import multer, { Multer, StorageEngine } from 'multer';

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
    file?: any; // fallback to any for compatibility
}

app.post('/analyze-guitar-playing', upload.single('video'), async (req: MulterRequest, res: Response) => {
    const { practiceTime } = req.body;
    const videoFile = req.file; // videoFile.buffer contains the file data in memory

    // TODO: Replace with your actual analysis logic
    // const analysis = await analyzeGuitarPlaying(videoFile?.buffer);
    const analysis = { message: 'Received in memory!', size: videoFile?.size, practiceTime };

    // Explicitly clear the buffer if needed (optional)
    if (videoFile?.buffer) {
        videoFile.buffer = null;
    }

    res.json(analysis);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});