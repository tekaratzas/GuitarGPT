import { useState } from 'react'
import { Analysis } from './Analysis'
import type { GuitarAnalysisResponse } from './shared/types'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [practiceTime, setPracticeTime] = useState<number>(30)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<string>('')
  const [analysis, setAnalysis] = useState<GuitarAnalysisResponse | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!selectedFile) {
      setUploadResult('Please select a video file')
      return
    }

    setIsUploading(true)
    setUploadResult('')
    setAnalysis(null)

    try {
      const formData = new FormData()
      formData.append('video', selectedFile)
      formData.append('practiceTime', practiceTime.toString())

      const response = await fetch('/api/analyze-guitar-playing', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      setUploadResult(`Error: ${error instanceof Error ? error.message : 'Upload failed'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleNewAnalysis = () => {
    setAnalysis(null)
    setSelectedFile(null)
    setUploadResult('')
  }

  // Show analysis results if we have them
  if (analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10">
          <Analysis analysis={analysis} />
          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={handleNewAnalysis} 
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-2xl">🎸</span>
                <span>Analyze Another Video</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              🎸 GuitarGPT
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upload your guitar practice video and unlock the secrets of your playing with AI-powered analysis
          </p>
        </div>

        {/* Main Upload Form */}
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white mb-4">
                  Select your practice video (max 5 seconds)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                  <label 
                    htmlFor="video" 
                    className="group cursor-pointer block w-full p-8 border-2 border-dashed border-cyan-400/50 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📹</div>
                      <div className="text-white font-medium mb-2">Click to upload your video</div>
                      <div className="text-gray-400 text-sm">MP4, MOV, AVI up to 5 seconds</div>
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <div className="text-white font-medium">{selectedFile.name}</div>
                        <div className="text-gray-300 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Practice Time Section */}
              <div className="space-y-4">
                <label htmlFor="practiceTime" className="block text-lg font-semibold text-white">
                  How many minutes can you practice per day?
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="practiceTime"
                    min="5"
                    max="480"
                    value={practiceTime}
                    onChange={(e) => setPracticeTime(Number(e.target.value))}
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter practice time in minutes"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    minutes
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isUploading || !selectedFile}
                className="group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 hover:shadow-cyan-500/50 disabled:cursor-not-allowed overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isUploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xl">🔍</span>
                      <span>Analyze My Playing</span>
                    </>
                  )}
                </span>
                {!isUploading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                )}
              </button>
            </form>
          </div>

          {/* Result Message */}
          {uploadResult && (
            <div className={`mt-6 p-4 rounded-2xl backdrop-blur-xl border ${
              uploadResult.includes('Error') 
                ? 'bg-red-500/20 border-red-400/30 text-red-200' 
                : 'bg-green-500/20 border-green-400/30 text-green-200'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">
                  {uploadResult.includes('Error') ? '❌' : '✅'}
                </span>
                <span>{uploadResult}</span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 text-cyan-400/30 text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🎵</div>
        <div className="absolute top-1/3 right-16 text-purple-400/30 text-4xl animate-bounce" style={{animationDelay: '1.5s'}}>🎼</div>
        <div className="absolute bottom-1/4 left-20 text-blue-400/30 text-5xl animate-bounce" style={{animationDelay: '2.5s'}}>🎸</div>
      </div>
    </div>
  )
}

export default App
