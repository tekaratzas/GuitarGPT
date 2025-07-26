import { useRef } from 'react';
import ReactPlayer from 'react-player';
import type { HighlightSegment } from '../../../shared/types';
import OverlayCanvas, { type OverlayCanvasRef } from './OverlayCanvas';

type VideoPlayerProps = {
    video: File;
    highlightSegments: HighlightSegment[];
}

function VideoPlayer({ video, highlightSegments }: VideoPlayerProps) {
    const currentTimeRef = useRef(0);
    const overlayRef = useRef<OverlayCanvasRef>(null);
    const videoUrl = URL.createObjectURL(video)

    return (
        <div className="w-full h-full relative">
            <ReactPlayer
                src={videoUrl}
                width="100%"
                height="100%"
                controls={true}
                playing={false}
                onTimeUpdate={(progress) => {
                    // @ts-ignore
                    const currentTime = progress.target.currentTime;
                    console.log(currentTime);
                    currentTimeRef.current = currentTime; // these are in Seconds!!
                    
                    // Update the overlay directly
                    overlayRef.current?.updateCanvas(currentTime);
                }}
            />

            <OverlayCanvas 
                ref={overlayRef}
                highlightSegments={highlightSegments}
            />
        </div>
    );
};

export default VideoPlayer;
