import { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import type { HighlightSegment } from '../../../shared/types';

type OverlayCanvasProps = {
    highlightSegments: HighlightSegment[];
};

export type OverlayCanvasRef = {
    updateCanvas: (currentTime: number) => void;
};

const OverlayCanvas = forwardRef<OverlayCanvasRef, OverlayCanvasProps>(({ highlightSegments }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const segmentsRef = useRef<HighlightSegment[]>(highlightSegments);

    // Keep the ref updated with the latest segments
    useEffect(() => {
        segmentsRef.current = highlightSegments;
    }, [highlightSegments]);

    const updateCanvas = (currentTime: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Find the current highlight segment using the ref
        const currentSegment = segmentsRef.current.find(
            segment => currentTime >= segment.start && currentTime <= segment.end
        );

        // Add a semi-transparent background for better visibility
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, 10, 400, 80);

        // Draw the current time
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(`Time: ${currentTime.toFixed(2)}s`, 20, 30);

        // Draw segment information if we're in a highlight segment
        if (currentSegment) {
            ctx.fillStyle = getSegmentColor(currentSegment.type);
            ctx.font = 'bold 18px Arial';
            ctx.fillText(`${currentSegment.type.toUpperCase()}: ${currentSegment.description}`, 20, 55);
            
            // Draw segment timing
            ctx.fillStyle = 'yellow';
            ctx.font = '14px Arial';
            ctx.fillText(`${currentSegment.start}s - ${currentSegment.end}s`, 20, 75);
        } else {
            // No current segment
            ctx.fillStyle = 'lightgray';
            ctx.font = '16px Arial';
            ctx.fillText('No highlight segment', 20, 55);
        }
    };

    useImperativeHandle(ref, () => ({
        updateCanvas
    }));

    const getSegmentColor = (type: HighlightSegment['type']): string => {
        switch (type) {
            case 'mistake':
                return '#ff6b6b'; // Red
            case 'highlight':
                return '#4ecdc4'; // Teal
            case 'timing_issue':
                return '#ffa726'; // Orange
            case 'string_noise':
                return '#ab47bc'; // Purple
            case 'clean_passage':
                return '#66bb6a'; // Green
            default:
                return '#42a5f5'; // Blue
        }
    };

    return (
        <canvas
            ref={canvasRef}
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
    );
});

OverlayCanvas.displayName = 'OverlayCanvas';

export default OverlayCanvas; 