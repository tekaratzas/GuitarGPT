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
    file?: Express.Multer.File // fallback to any for compatibility
}

app.post('/analyze-guitar-playing', upload.single('video'), async (req: MulterRequest, res: Response) => {
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

    // TODO: Replace with your actual analysis logic
    // const analysis = await analyzeGuitarPlaying(videoFile?.buffer);
    const analysis = { message: 'Received in memory!', size: videoFile?.size, practiceTime };

    res.json(analysis);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});