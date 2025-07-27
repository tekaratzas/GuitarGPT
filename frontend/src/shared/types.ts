export type HighlightSegment = {
  start: number; // in seconds
  end: number;   // in seconds
  type: 'mistake' | 'highlight' | 'timing_issue' | 'string_noise' | 'clean_passage' | 'other';
  description: string;
};

export type PracticeRoutine = {
  title: string;
  description: string;
  time_minutes: number;
};

export type GuitarAnalysisResponse = {
  overall_feedback: string;
  strong_points: string;
  areas_to_improve: string;
  practice_routine: PracticeRoutine[];
  recommended_songs: string[];
  highlight_segments: HighlightSegment[];
};