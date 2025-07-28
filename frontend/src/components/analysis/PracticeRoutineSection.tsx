import RoutineExerciseCard from './RoutineExerciseCard';
import type { PracticeRoutine } from '../../shared/types';

interface Props {
    routine: PracticeRoutine[];
    copySuccess: boolean;
    onCopy: () => void;
}

export default function PracticeRoutineSection({ routine, copySuccess, onCopy }: Props) {
    return (
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                        📝
                    </div>
                    <h3 className="text-3xl font-bold text-white">Your Practice Routine</h3>
                </div>
                <button
                    onClick={onCopy}
                    className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        copySuccess
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white'
                    } shadow-2xl overflow-hidden`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {copySuccess ? (
                            <>
                                <span className="text-xl">✅</span>
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xl">📋</span>
                                <span>Copy Routine</span>
                            </>
                        )}
                    </span>
                    {!copySuccess && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    )}
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {routine.map((exercise, index) => (
                    <RoutineExerciseCard key={index} exercise={exercise} index={index} />
                ))}
            </div>
        </div>
    );
}
