import type { PracticeRoutine } from '../../shared/types';

interface Props {
    exercise: PracticeRoutine;
    index: number;
}

export default function RoutineExerciseCard({ exercise, index }: Props) {
    return (
        <div
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 shadow-xl"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="grid grid-cols-10 mb-4 place-items-center">
                <h4 className="text-lg font-semibold text-white col-span-7">
                    {exercise.title}
                </h4>
                <span className="col-span-3 p-3 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    {exercise.time_minutes} min
                </span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">{exercise.description}</p>
        </div>
    );
}
