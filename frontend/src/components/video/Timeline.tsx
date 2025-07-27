import type { HighlightSegment } from '../../shared/types';

type TimelineProps = {
    duration: number;
    highlightSegments: HighlightSegment[];
    currentTime: number;
    onSeek: (time: number) => void;
};

const Timeline = ({ duration, highlightSegments, currentTime, onSeek }: TimelineProps) => {
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

    const getSegmentIcon = (type: HighlightSegment['type']): string => {
        switch (type) {
            case 'mistake':
                return '❌';
            case 'highlight':
                return '⭐';
            case 'timing_issue':
                return '⏱️';
            case 'string_noise':
                return '🔇';
            case 'clean_passage':
                return '✨';
            default:
                return '📝';
        }
    };

    if (duration === 0) return null;

    const currentTimePercentage = (currentTime / duration) * 100;

    return (
        <div className="w-full bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-lg">Performance Timeline</h3>
                <div className="text-gray-400 text-sm">
                    {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
                </div>
            </div>
            
            {/* Timeline bar */}
            <div className="relative w-full h-8 bg-gray-800 rounded-lg overflow-hidden mb-4">
                {/* Background segments */}
                {highlightSegments.map((segment, index) => {
                    const startSeconds = segment.start;
                    const endSeconds = segment.end;
                    const startPercentage = (startSeconds / duration) * 100;
                    const endPercentage = (endSeconds / duration) * 100;
                    const width = endPercentage - startPercentage;
                    
                    return (
                        <div
                            key={index}
                            className="absolute h-full opacity-80 cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-y-110"
                            style={{
                                left: `${startPercentage}%`,
                                width: `${width}%`,
                                backgroundColor: getSegmentColor(segment.type)
                            }}
                            onClick={() => onSeek(startSeconds)}
                            title={`${segment.type}: ${segment.description} (${startSeconds.toFixed(1)}s - ${endSeconds.toFixed(1)}s)`}
                        />
                    );
                })}
                
                {/* Current time indicator */}
                <div 
                    className="absolute top-0 w-1 h-full bg-white shadow-lg z-10"
                    style={{ left: `${currentTimePercentage}%` }}
                />
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {[
                    { type: 'highlight' as const, label: 'Highlights' },
                    { type: 'clean_passage' as const, label: 'Clean Passages' },
                    { type: 'mistake' as const, label: 'Mistakes' },
                    { type: 'timing_issue' as const, label: 'Timing Issues' },
                    { type: 'string_noise' as const, label: 'String Noise' }
                ].map(({ type, label }) => (
                    <div key={type} className="flex items-center gap-2 text-gray-300">
                        <div 
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: getSegmentColor(type) }}
                        />
                        <span>{getSegmentIcon(type)} {label}</span>
                    </div>
                ))}
            </div>
            
            {/* Segment details */}
            <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
                {highlightSegments.map((segment, index) => {
                    const startSeconds = segment.start;
                    const endSeconds = segment.end;
                    
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer"
                            onClick={() => onSeek(startSeconds)}
                        >
                            <div 
                                className="w-4 h-4 rounded-sm"
                                style={{ backgroundColor: getSegmentColor(segment.type) }}
                            />
                            <span className="text-white font-medium text-sm">
                                {getSegmentIcon(segment.type)} {segment.type.replace('_', ' ')}
                            </span>
                            <span className="text-gray-400 text-xs">
                                {startSeconds.toFixed(1)}s - {endSeconds.toFixed(1)}s
                            </span>
                            <span className="text-gray-300 text-xs truncate flex-1">
                                {segment.description}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline; 