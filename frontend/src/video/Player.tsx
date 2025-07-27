import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import type { HighlightSegment } from '../../../shared/types';
import OverlayCanvas, { type OverlayCanvasRef } from './OverlayCanvas';
import Timeline from './Timeline';

type VideoPlayerProps = {
    video: File;
    highlightSegments: HighlightSegment[];
}

function VideoPlayer({ video, highlightSegments }: VideoPlayerProps) {
    const currentTimeRef = useRef(0);
    const overlayRef = useRef<OverlayCanvasRef>(null);
    const playerRef = useRef<any>(null);
    const [duration, setDuration] = useState(0);
    const videoUrl = URL.createObjectURL(video)

    const handleSeek = (time: number) => {
        if (playerRef.current) {
            // @ts-ignore
            playerRef.current.seekTo(time / duration);
        }
    };

    return (
        <div className="w-full h-full">
            {/* Timeline above video */}
            <div className="mb-4">
                <Timeline
                    duration={duration}
                    highlightSegments={highlightSegments}
                    currentTime={currentTimeRef.current}
                    onSeek={handleSeek}
                />
            </div>

            <div className="w-full h-full relative">
                <div className="max-h-[700px]">
                    <ReactPlayer
                        ref={playerRef}
                        src={videoUrl}
                        width="100%"
                        height="500px"
                        controls={true}
                        playing={false}
                        onDurationChange={(event: any) => {
                            setDuration(event.target.duration);
                        }}
                        onTimeUpdate={(progress) => {
                            // @ts-ignore
                            const currentTimeInSeconds = progress.target.currentTime;
                            currentTimeRef.current = currentTimeInSeconds; // these are in Seconds!!
                            
                            // Update the overlay directly
                            overlayRef.current?.updateCanvas(currentTimeInSeconds);
                        }}
                    />
                </div>

                <OverlayCanvas 
                    ref={overlayRef}
                    highlightSegments={highlightSegments}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
