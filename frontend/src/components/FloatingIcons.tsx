type FloatingIconsProps = {
  showMic?: boolean;
};

export default function FloatingIcons({ showMic }: FloatingIconsProps) {
  return (
    <>
      <div className="absolute top-1/4 left-10 text-cyan-400/30 text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎵</div>
      <div className="absolute top-1/3 right-16 text-purple-400/30 text-4xl animate-bounce" style={{ animationDelay: '1.5s' }}>🎼</div>
      <div className="absolute bottom-1/4 left-20 text-blue-400/30 text-5xl animate-bounce" style={{ animationDelay: '2.5s' }}>🎸</div>
      {showMic && (
        <div className="absolute top-1/2 right-10 text-yellow-400/30 text-3xl animate-bounce" style={{ animationDelay: '3.5s' }}>🎤</div>
      )}
    </>
  );
}
