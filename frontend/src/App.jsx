import { useState } from 'react'
import axios from 'axios'
import ResumeTailerForm from './components/ResumeTailerForm'
import ResultsDisplay from './components/ResultsDisplay'
import './App.css'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTailorResume = async (formData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.post('/api/tailor', {
        resume: formData.resume,
        jobDescription: formData.jobDescription
      })
      setResults(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error tailoring resume. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🚀 Resume Tailor</h1>
          <p>AI-Powered Resume Optimization for Better ATS Scores</p>
        </header>

        <main className="main-content">
          {!results ? (
            <ResumeTailerForm 
              onSubmit={handleTailorResume} 
              loading={loading}
              error={error}
            />
          ) : (
            <>
              <ResultsDisplay results={results} />
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => {
                  setResults(null)
                  setError(null)
                }}
              >
                ← Tailor Another Resume
              </button>
            </>
          )}
        </main>

        <footer className="footer">
          <p>Resume Tailor © 2024 | Powered by OpenAI</p>
        </footer>
      </div>
    </div>
  )
}

export default App