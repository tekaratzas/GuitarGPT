import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [practiceTime, setPracticeTime] = useState<number>(30)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<string>('')

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

    try {
      const formData = new FormData()
      formData.append('video', selectedFile)
      formData.append('practiceTime', practiceTime.toString())

      const response = await fetch('http://localhost:3000/analyze-guitar-playing', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      setUploadResult(`Success! File size: ${result.size} bytes, Practice time: ${result.practiceTime} minutes`)
    } catch (error) {
      setUploadResult(`Error: ${error instanceof Error ? error.message : 'Upload failed'}`)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="app">
      <h1>🎸 GuitarGPT</h1>
      <p>Upload your guitar practice video for analysis</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="video">Select your practice video (max 5 seconds):</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
          {selectedFile && (
            <p className="file-info">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="practiceTime">How many minutes can you practice per day?</label>
          <input
            type="number"
            id="practiceTime"
            min="5"
            max="480"
            value={practiceTime}
            onChange={(e) => setPracticeTime(Number(e.target.value))}
            required
          />
        </div>

        <button type="submit" disabled={isUploading || !selectedFile}>
          {isUploading ? 'Uploading...' : 'Analyze My Playing'}
        </button>
      </form>

      {uploadResult && (
        <div className={`result ${uploadResult.includes('Error') ? 'error' : 'success'}`}>
          {uploadResult}
        </div>
      )}
    </div>
  )
}

export default App
