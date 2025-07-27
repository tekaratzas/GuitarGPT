import SongCard from './SongCard';

interface Props {
    songs: string[];
}

export default function RecommendedSongsSection({ songs }: Props) {
    return (
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                    🎵
                </div>
                <h3 className="text-3xl font-bold text-white">Recommended Songs</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {songs.map((song, index) => (
                    <SongCard key={index} song={song} index={index} />
                ))}
            </div>
        </div>
    );
}
