import { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import type { HighlightSegment } from '../../shared/types';

type OverlayCanvasProps = {
    highlightSegments: HighlightSegment[];
};

export type OverlayCanvasRef = {
    updateCanvas: (currentTime: number) => void;
};

const OverlayCanvas = forwardRef<OverlayCanvasRef, OverlayCanvasProps>(({ highlightSegments }, ref) => {
    const segmentsRef = useRef<HighlightSegment[]>(highlightSegments);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentSegment, setCurrentSegment] = useState<HighlightSegment | null>(null);

    // Keep the ref updated with the latest segments
    useEffect(() => {
        segmentsRef.current = highlightSegments;
    }, [highlightSegments]);

    const updateCanvas = (currentTimeInSeconds: number) => {
        setCurrentTime(currentTimeInSeconds);
        
        // Find the current highlight segment
        const segment = segmentsRef.current.find(
            segment => {
                const startSeconds = segment.start;
                const endSeconds = segment.end;
                return currentTimeInSeconds >= startSeconds && currentTimeInSeconds <= endSeconds;
            }
        );
        
        setCurrentSegment(segment || null);
    };

    useImperativeHandle(ref, () => ({
        updateCanvas
    }));

    const getSegmentColor = (type: HighlightSegment['type']): string => {
        switch (type) {
            case 'mistake':
                return '#ef4444';
            case 'highlight':
                return '#06b6d4';
            case 'timing_issue':
                return '#f97316';
            case 'string_noise':
                return '#a855f7';
            case 'clean_passage':
                return '#10b981';
            default:
                return '#3b82f6';
        }
    };

    if (!currentSegment) {
        return (
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-lg">
                <div className="text-white text-sm font-medium">
                    ⏱️ {currentTime.toFixed(1)}s
                </div>
            </div>
        );
    }

    return (
        <div 
            className="absolute top-4 left-4 z-10 bg-black/90 backdrop-blur-sm rounded-lg p-3 border shadow-lg max-w-xs"
            style={{ borderColor: getSegmentColor(currentSegment.type) }}
        >
            <div className="flex items-center gap-2 mb-2">
                <div 
                    className="px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: getSegmentColor(currentSegment.type) }}
                >
                    {currentSegment.type.toUpperCase()}
                </div>
                <div className="text-white/70 text-xs">
                    ⏱️ {currentTime.toFixed(1)}s
                </div>
            </div>
            
            <div className="text-white text-sm mb-2">
                {currentSegment.description}
            </div>
            
            <div className="text-yellow-400 text-xs font-medium">
                🎯 {currentSegment.start.toFixed(1)}s - {currentSegment.end.toFixed(1)}s
            </div>
        </div>
    );
});

OverlayCanvas.displayName = 'OverlayCanvas';

export default OverlayCanvas; 