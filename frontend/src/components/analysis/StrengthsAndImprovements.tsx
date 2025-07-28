interface Props {
    strengths: string;
    improvements: string;
}

export default function StrengthsAndImprovements({ strengths, improvements }: Props) {
    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Strong Points */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-400/30 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl">
                        ✅
                    </div>
                    <h3 className="text-2xl font-bold text-white">Your Strengths</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">{strengths}</p>
            </div>

            {/* Areas to Improve */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-400/30 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                        🎯
                    </div>
                    <h3 className="text-2xl font-bold text-white">Areas to Focus On</h3>
                </div>
                <p className="text-gray-200 leading-relaxed">{improvements}</p>
            </div>
        </div>
    );
}
