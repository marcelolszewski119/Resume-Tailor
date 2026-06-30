import { useState } from 'react'
import './ResumeTailerForm.css'

export default function ResumeTailerForm({ onSubmit, loading, error }) {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (resume.trim() && jobDescription.trim()) {
      onSubmit({ resume, jobDescription })
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="resume">Your Resume</label>
          <textarea
            id="resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume here..."
            rows="12"
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows="12"
            disabled={loading}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="btn btn-submit"
          disabled={loading || !resume.trim() || !jobDescription.trim()}
        >
          {loading ? 'Tailoring Resume...' : '✨ Tailor My Resume'}
        </button>

        <div className="form-info">
          <p>💡 <strong>Tip:</strong> The more detailed your inputs, the better the AI tailoring results.</p>
        </div>
      </form>
    </div>
  )
}