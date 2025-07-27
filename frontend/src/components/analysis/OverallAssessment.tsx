interface Props {
    feedback: string;
}

export default function OverallAssessment({ feedback }: Props) {
    return (
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">
                    🎯
                </div>
                <h3 className="text-3xl font-bold text-white">Overall Assessment</h3>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">{feedback}</p>
        </div>
    );
}
