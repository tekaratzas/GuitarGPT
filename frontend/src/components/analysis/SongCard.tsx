interface Props {
    song: string;
    index: number;
}

export default function SongCard({ song, index }: Props) {
    return (
        <div
            className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-400/30 shadow-xl"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                </div>
                <span className="text-white font-medium">{song}</span>
            </div>
        </div>
    );
}
