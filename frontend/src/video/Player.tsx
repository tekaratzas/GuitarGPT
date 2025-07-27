import { useRef } from 'react';
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
    const durationRef = useRef(0);
    const overlayRef = useRef<OverlayCanvasRef>(null);
    const playerRef = useRef<any>(null);
    const videoUrl = URL.createObjectURL(video)

    const handleSeek = (time: number) => {
        if (playerRef.current) {
            // @ts-ignore
            playerRef.current.seekTo(time / durationRef.current);
        }
    };

    return (
        <div>
            {/* Timeline above video */}
            <div className="mb-4">
                <Timeline
                    duration={durationRef.current}
                    highlightSegments={highlightSegments}
                    currentTime={currentTimeRef.current}
                    onSeek={handleSeek}
                />
            </div>

            <div className="w-full h-full relative">
                <ReactPlayer
                    ref={playerRef}
                    src={videoUrl}
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={false}
                    onDurationChange={(event: any) => {
                        durationRef.current = event.target.duration;
                    }}
                    onTimeUpdate={(progress) => {
                        // @ts-ignore
                        const currentTimeInSeconds = progress.target.currentTime;
                        currentTimeRef.current = currentTimeInSeconds; // these are in Seconds!!
                        
                        // Update the overlay directly
                        overlayRef.current?.updateCanvas(currentTimeInSeconds);
                    }}
                />

                <OverlayCanvas 
                    ref={overlayRef}
                    highlightSegments={highlightSegments}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
