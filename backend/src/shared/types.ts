export type GuitarAnalysisResponse = {
    overall_feedback: string;
    strong_points: string;
    areas_to_improve: string;
    practice_routine: {
      title: string;
      description: string;
      time_minutes: number;
    }[];
    recommended_songs: string[];
  };