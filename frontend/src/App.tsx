import { useState, useEffect } from 'react'
import { Analysis } from './components/Analysis'
import AnimatedOrbs from './components/AnimatedOrbs'
import FloatingIcons from './components/FloatingIcons'
import type { GuitarAnalysisResponse } from './shared/types'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [practiceTime, setPracticeTime] = useState<number>(30)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<string>('')
  const [analysis, setAnalysis] = useState<GuitarAnalysisResponse | null>(null)
  const [loadingMessage, setLoadingMessage] = useState<string>('')

  const loadingMessages = [
    "🎵 Uploading your video...",
    "🔍 Analyzing your technique...",
    "🎸 Detecting chord progressions...",
    "⏱️ Checking timing and rhythm...",
    "🎼 Identifying finger positioning...",
    "🎯 Finding areas for improvement...",
    "✨ Generating personalized feedback...",
    "📝 Creating practice recommendations...",
    "🎪 Almost done, finalizing analysis..."
  ]

  useEffect(() => {
    if (isUploading) {
      let messageIndex = 0
      const interval = setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex])
        messageIndex = (messageIndex + 1) % loadingMessages.length
      }, 2000) // Change message every 2 seconds

      return () => clearInterval(interval)
    } else {
      setLoadingMessage('')
    }
  }, [isUploading])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    
    // Check video duration if file is selected
    if (file && file.type.startsWith('video/')) {
      const video = document.createElement('video')
      video.preload = 'metadata'
      
      video.onloadedmetadata = () => {
        if (video.duration > 30) {
          setUploadResult('Video must be 30 seconds or shorter. Please select a shorter video.')
          setSelectedFile(null)
          // Reset the file input
          event.target.value = ''
        } else {
          setUploadResult('')
        }
      }
      
      video.onerror = () => {
        setUploadResult('Unable to read video file. Please try another video.')
        setSelectedFile(null)
        event.target.value = ''
      }
      
      video.src = URL.createObjectURL(file)
    }
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
        <AnimatedOrbs />

        <div className="relative z-10">
          <Analysis analysis={analysis} video={selectedFile!} />
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
      <AnimatedOrbs />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              🎸 GuitarGPT
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stuck on a Riff or Lick? Let AI analyze your playing and give you personalized feedback.
          </p>
        </div>

        {/* Main Upload Form */}
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white mb-4">
                  Select your practice video (max 30 seconds)
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
                      <div className="text-gray-400 text-sm">MP4, MOV, AVI up to 30 seconds</div>
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
                      <div className="flex-grow"></div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <span className="text-2xl">❌</span>
                      </button>
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
              {isUploading ? (
                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30 backdrop-blur-xl">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    </div>
                    <div className="text-cyan-300 font-medium text-lg animate-pulse">
                      {loadingMessage}
                    </div>
                    <div className="text-gray-400 text-sm">
                      This usually takes 30-60 seconds. Please don't close this page.
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="group w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 disabled:scale-100 transition-all duration-300 hover:shadow-cyan-500/50 disabled:cursor-not-allowed overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-xl">🔍</span>
                    <span>Analyze My Playing</span>
                  </span>
                  {!isUploading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                </button>
              )}

            </form>
          </div>

          {/* Result Message */}
          {uploadResult && (
            <div className={`mt-6 p-4 rounded-2xl backdrop-blur-xl border ${uploadResult.includes('Error')
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
        <FloatingIcons />
      </div>
    </div>
  )
}

export default App
