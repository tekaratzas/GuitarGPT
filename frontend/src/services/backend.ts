import axios from 'axios';
import type { GuitarAnalysisResponse } from "../shared/types";

const backendBaseUrl = '/api';

interface BackendService {
    analyzeGuitarPlaying(video: File, practiceTime: number): Promise<GuitarAnalysisResponse>;
}

export const backendService: BackendService = {
    analyzeGuitarPlaying: async (video: File, practiceTime: number) => {
        const formData = new FormData();
        formData.append('video', video);
        formData.append('practiceTime', practiceTime.toString());

        const response = await axios.post(`${backendBaseUrl}/analyze-guitar-playing`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};