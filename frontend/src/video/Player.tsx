import { useRef } from 'react';
import ReactPlayer from 'react-player';
import type { HighlightSegment } from '../shared/types';

type VideoPlayerProps = {
    video: File;
    highlightSegments: HighlightSegment[];
}

function VideoPlayer({ video, highlightSegments }: VideoPlayerProps) {
    const currentTimeRef = useRef(0);
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
                    currentTimeRef.current = currentTime;
                    
                    // You can add your overlay update logic here
                    // This won't cause re-renders but you can still track changes
                    updateOverlay(currentTime);
                }}
            />

            {/* Optional: overlay canvas */}
            <canvas
                id="overlay"
                width="640"
                height="360"
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    pointerEvents: 'none',
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
};

// Function to update overlay without causing re-renders
function updateOverlay(currentTime: number) {
    // You can access the canvas directly and update it
    const canvas = document.getElementById('overlay') as HTMLCanvasElement;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Add a semi-transparent background for better visibility
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(10, 10, 200, 40);
            
            // Add your overlay content based on currentTime
            // For example, draw text showing the current time
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px Arial';
            ctx.fillText(`Time: ${currentTime.toFixed(2)}s`, 20, 35);
            
            // You can add more complex overlay logic here based on timestamps
        }
    }
}

export default VideoPlayer;