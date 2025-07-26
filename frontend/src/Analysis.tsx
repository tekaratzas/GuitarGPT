import type { GuitarAnalysisResponse } from './shared/types';

interface AnalysisProps {
  analysis: GuitarAnalysisResponse;
}

export function Analysis({ analysis }: AnalysisProps) {
  return (
    <div className="analysis">
      <h2>🎸 Your Guitar Analysis</h2>
      
      {/* Overall Feedback */}
      <section className="analysis-section">
        <h3>Overall Assessment</h3>
        <p className="feedback-text">{analysis.overall_feedback}</p>
      </section>

      {/* Strong Points */}
      <section className="analysis-section positive">
        <h3>✅ Your Strengths</h3>
        <p className="feedback-text">{analysis.strong_points}</p>
      </section>

      {/* Areas to Improve */}
      <section className="analysis-section improvement">
        <h3>🎯 Areas to Focus On</h3>
        <p className="feedback-text">{analysis.areas_to_improve}</p>
      </section>

      {/* Practice Routine */}
      <section className="analysis-section">
        <h3>📝 Your Practice Routine</h3>
        <div className="practice-routine">
          {analysis.practice_routine.map((exercise: any, index: number) => (
            <div key={index} className="exercise-card">
              <div className="exercise-header">
                <h4>{exercise.title}</h4>
                <span className="time-badge">{exercise.time_minutes} min</span>
              </div>
              <p>{exercise.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Songs */}
      <section className="analysis-section">
        <h3>🎵 Recommended Songs</h3>
        <div className="songs-list">
          {analysis.recommended_songs.map((song: string, index: number) => (
            <div key={index} className="song-item">
              <span className="song-number">{index + 1}</span>
              <span className="song-name">{song}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
