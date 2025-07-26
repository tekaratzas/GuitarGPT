import type { GuitarAnalysisResponse } from './shared/types';

interface AnalysisProps {
  analysis: GuitarAnalysisResponse;
}

export function Analysis({ analysis }: AnalysisProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            🎸 Your Guitar Analysis
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overall Assessment */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-3xl font-bold text-white">Overall Assessment</h3>
            </div>
            <p className="text-lg text-gray-200 leading-relaxed">{analysis.overall_feedback}</p>
          </div>

          {/* Strengths & Improvements Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Strong Points */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-400/30 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <h3 className="text-2xl font-bold text-white">Your Strengths</h3>
              </div>
              <p className="text-gray-200 leading-relaxed">{analysis.strong_points}</p>
            </div>

            {/* Areas to Improve */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-3xl p-8 border border-orange-400/30 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-white">Areas to Focus On</h3>
              </div>
              <p className="text-gray-200 leading-relaxed">{analysis.areas_to_improve}</p>
            </div>
          </div>

          {/* Practice Routine */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-2xl">
                📝
              </div>
              <h3 className="text-3xl font-bold text-white">Your Practice Routine</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysis.practice_routine.map((exercise: any, index: number) => (
                <div 
                  key={index} 
                  className="group backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/25"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {exercise.title}
                    </h4>
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      {exercise.time_minutes} min
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed">{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Songs */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-2xl">
                🎵
              </div>
              <h3 className="text-3xl font-bold text-white">Recommended Songs</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysis.recommended_songs.map((song: string, index: number) => (
                <div 
                  key={index} 
                  className="group backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-400/30 shadow-xl transform hover:scale-105 transition-all duration-500 hover:shadow-yellow-500/25"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium group-hover:text-yellow-200 transition-colors">
                      {song}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 text-cyan-400/30 text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🎵</div>
        <div className="absolute top-1/3 right-16 text-purple-400/30 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🎼</div>
        <div className="absolute bottom-1/4 left-20 text-blue-400/30 text-5xl animate-bounce" style={{animationDelay: '2.5s'}}>🎸</div>
        <div className="absolute top-1/2 right-10 text-yellow-400/30 text-3xl animate-bounce" style={{animationDelay: '3.5s'}}>🎤</div>
      </div>
    </div>
  );
}
