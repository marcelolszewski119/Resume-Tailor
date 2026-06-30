import { useState } from 'react'
import './ResultsDisplay.css'

export default function ResultsDisplay({ results }) {
  const [activeTab, setActiveTab] = useState('comparison')

  const getScoreColor = (score) => {
    if (score >= 80) return '#27ae60'
    if (score >= 60) return '#f39c12'
    if (score >= 40) return '#e67e22'
    return '#e74c3c'
  }

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <div className="results-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          📊 Score Comparison
        </button>
        <button
          className={`tab ${activeTab === 'original' ? 'active' : ''}`}
          onClick={() => setActiveTab('original')}
        >
          📄 Original Resume
        </button>
        <button
          className={`tab ${activeTab === 'tailored' ? 'active' : ''}`}
          onClick={() => setActiveTab('tailored')}
        >
          ✨ Tailored Resume
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'comparison' && (
          <div className="comparison-view">
            <h2>ATS Score Comparison</h2>
            
            <div className="scores-grid">
              <div className="score-card">
                <h3>Original Resume</h3>
                <div className="score-display">
                  <div 
                    className="score-circle"
                    style={{ borderColor: getScoreColor(results.originalAtsScore) }}
                  >
                    <span className="score-value">{results.originalAtsScore}</span>
                    <span className="score-label">%</span>
                  </div>
                  <p className="score-status" style={{ color: getScoreColor(results.originalAtsScore) }}>
                    {getScoreLabel(results.originalAtsScore)}
                  </p>
                </div>
              </div>

              <div className="arrow-container">
                <div className="arrow">→</div>
                <div className="improvement-badge" style={{ 
                  backgroundColor: results.improvement > 0 ? '#27ae60' : '#e74c3c'
                }}>
                  {results.improvement > 0 ? '+' : ''}{results.improvement}
                </div>
              </div>

              <div className="score-card">
                <h3>Tailored Resume</h3>
                <div className="score-display">
                  <div 
                    className="score-circle"
                    style={{ borderColor: getScoreColor(results.tailoredAtsScore) }}
                  >
                    <span className="score-value">{results.tailoredAtsScore}</span>
                    <span className="score-label">%</span>
                  </div>
                  <p className="score-status" style={{ color: getScoreColor(results.tailoredAtsScore) }}>
                    {getScoreLabel(results.tailoredAtsScore)}
                  </p>
                </div>
              </div>
            </div>

            <div className="improvement-stats">
              <div className="stat">
                <span className="stat-label">Original Score:</span>
                <span className="stat-value">{results.originalAtsScore}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Tailored Score:</span>
                <span className="stat-value">{results.tailoredAtsScore}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Improvement:</span>
                <span className="stat-value" style={{ color: results.improvement > 0 ? '#27ae60' : '#e74c3c' }}>
                  {results.improvement > 0 ? '+' : ''}{results.improvement}%
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'original' && (
          <div className="resume-view">
            <h2>Original Resume</h2>
            <div className="resume-content">
              {results.originalResume}
            </div>
            <button className="btn-copy" onClick={() => navigator.clipboard.writeText(results.originalResume)}>
              📋 Copy to Clipboard
            </button>
          </div>
        )}

        {activeTab === 'tailored' && (
          <div className="resume-view">
            <h2>Tailored Resume</h2>
            <div className="resume-content">
              {results.tailoredResume}
            </div>
            <button className="btn-copy" onClick={() => navigator.clipboard.writeText(results.tailoredResume)}>
              📋 Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  )
}