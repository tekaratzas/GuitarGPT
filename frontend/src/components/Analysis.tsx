import { useState } from 'react';
import type { GuitarAnalysisResponse } from '../shared/types';
import VideoPlayer from './video/Player';
import AnimatedOrbs from './AnimatedOrbs';
import FloatingIcons from './FloatingIcons';
import HeroHeader from './analysis/HeroHeader';
import OverallAssessment from './analysis/OverallAssessment';
import StrengthsAndImprovements from './analysis/StrengthsAndImprovements';
import PracticeRoutineSection from './analysis/PracticeRoutineSection';
import RecommendedSongsSection from './analysis/RecommendedSongsSection';

interface AnalysisProps {
    analysis: GuitarAnalysisResponse;
    video: File;
}

export function Analysis({ analysis, video }: AnalysisProps) {
    const [copySuccess, setCopySuccess] = useState(false);
        
    const copyPracticeRoutine = async () => {
        const routineText = analysis.practice_routine.map((exercise, index) => {
            return `${index + 1}. ${exercise.title} (${exercise.time_minutes} min)\n   ${exercise.description}`;
        }).join('\n\n');
        
        const fullText = `🎸 My Guitar Practice Routine\n\n${routineText}\n\nTotal time: ${analysis.practice_routine.reduce((total, exercise) => total + exercise.time_minutes, 0)} minutes`;
        
        try {
            await navigator.clipboard.writeText(fullText);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <AnimatedOrbs />

            <div className="relative z-10 container mx-auto px-4 py-12">
                <HeroHeader />

                <div className="mx-auto space-y-8 max-w-6xl mb-8">
                    <VideoPlayer video={video} highlightSegments={analysis.highlight_segments} />
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    <OverallAssessment feedback={analysis.overall_feedback} />
                    <StrengthsAndImprovements
                        strengths={analysis.strong_points}
                        improvements={analysis.areas_to_improve}
                    />
                    <PracticeRoutineSection
                        routine={analysis.practice_routine}
                        copySuccess={copySuccess}
                        onCopy={copyPracticeRoutine}
                    />
                    <RecommendedSongsSection songs={analysis.recommended_songs} />
                </div>

                {/* Floating Elements */}
                <FloatingIcons showMic />
            </div>
        </div>
    );
}
