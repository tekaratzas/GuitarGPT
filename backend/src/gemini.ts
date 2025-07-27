import {
    GoogleGenAI,
    Type,
    createUserContent
} from '@google/genai';
import { GuitarAnalysisResponse } from '../src/shared/types';

export async function analyzeGuitarPlaying(videoBuffer: Buffer, practiceTime: number): Promise<GuitarAnalysisResponse> {
    // Convert video buffer to base64 for Gemini
    const videoBase64 = videoBuffer.toString('base64');

    // Create a more detailed prompt with practice time
    const userPrompt = `
I have a max 30-second video of my guitar playing. I can practice for ${practiceTime} minutes per day.
    `;

    const config = await createGeminiConfig(userPrompt, videoBase64);

    return await executeGeminiConfig(config);
}



const systemPrompt = `
You are an expert guitar teacher and expert on getting players better.

You will be given a short video of a guitar player attempting a piece they find difficult. As well as how much time they have to practice per day.

Your job is to analyze the video and provide a detailed analysis of the player's playing.

You will encourage them by accentuating their strengths, then give them specific areas to improve on.

When you give feedback, be sure to refer to points in the video. Timestamps are fine.

You will also provide recommended songs to learn to help them improve. The goal is that these songs are slightly easier than what they are currently attempting.

Any time you make a timestamp, make sure it is in seconds. ex: 3.5 is three and a half seconds.
`;

type GeminiConfig = {
    model: string;
    config: any;
    contents: any;
};

async function createGeminiConfig(userPrompt: string, videoBase64: string): Promise<GeminiConfig> {
    const config = {
        thinkingConfig: {
            thinkingBudget: -1,
        },
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            required: [
                "overall_feedback",
                "strong_points",
                "areas_to_improve",
                "practice_routine",
                "recommended_songs",
                "highlight_segments"
            ],
            properties: {
                overall_feedback: {
                    type: Type.STRING,
                    description: "A summary of the user's guitar playing, highlighting general strengths and weaknesses."
                },
                strong_points: {
                    type: Type.STRING,
                    description: "Specific strong aspects of the user's guitar playing."
                },
                areas_to_improve: {
                    type: Type.STRING,
                    description: "Specific areas where the user should focus on improving."
                },
                practice_routine: {
                    type: Type.ARRAY,
                    description: "A list of targeted practice exercises to help the user improve.",
                    items: {
                        type: Type.OBJECT,
                        required: ["title", "description", "time_minutes"],
                        properties: {
                            title: {
                                type: Type.STRING,
                                description: "A short name for the practice exercise."
                            },
                            description: {
                                type: Type.STRING,
                                description: "Detailed guidance on how to perform the exercise."
                            },
                            time_minutes: {
                                type: Type.NUMBER,
                                description: "Recommended duration in minutes for this exercise."
                            }
                        }
                    }
                },
                recommended_songs: {
                    type: Type.ARRAY,
                    description: "Songs that align with the user's current skill level and areas of improvement.",
                    items: {
                        type: Type.STRING
                    }
                },
                highlight_segments: {
                    type: Type.ARRAY,
                    description: "Time-stamped segments highlighting strengths or weaknesses in the user's playing.",
                    items: {
                        type: Type.OBJECT,
                        required: ["start", "end", "type", "description"],
                        properties: {
                            start: {
                                type: Type.NUMBER,
                                description: "Start time of the segment in seconds. can be decimals. ex: 3.5 is three and a half seconds."
                            },
                            end: {
                                type: Type.NUMBER,
                                description: "End time of the segment in seconds. can be decimals. ex: 3.5 is three and a half seconds."
                            },
                            type: {
                                type: Type.STRING,
                                enum: ["mistake", "highlight", "timing_issue", "string_noise", "clean_passage", "other"],
                                description: "The type of segment."
                            },
                            description: {
                                type: Type.STRING,
                                description: "Detailed explanation of what happened during this segment."
                            }
                        }
                    }
                }
            }
        }
    };
    const model = 'gemini-2.5-flash';
    const contents = [
        {
            inlineData: {
                mimeType: "video/mp4",
                data: videoBase64,
            },
        },
        { text: userPrompt }
    ];

    return {
        model,
        config,
        contents,
    };
}

async function executeGeminiConfig(config: GeminiConfig): Promise<GuitarAnalysisResponse> {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContentStream({
        model: config.model,
        config: config.config,
        contents: config.contents,
    });

    let responseText = '';
    for await (const chunk of response) {
        responseText += chunk.text;
    }

    try {
        return JSON.parse(responseText) as GuitarAnalysisResponse;
    } catch (e) {
        console.error(e);
        throw new Error('Failed to parse response from Gemini');
    }
}