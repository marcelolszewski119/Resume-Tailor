# Resume Tailor

AI-powered resume tailoring application that rewrites your resume to match a job description and shows your ATS score before and after.

## Features

- 📄 Upload your resume and job description
- 🤖 AI-powered resume rewriting using OpenAI
- 📊 ATS (Applicant Tracking System) score calculation
- 📈 Before/after ATS score comparison
- 🎯 Keyword optimization for better ATS compatibility

## Tech Stack

### Backend
- **Node.js** with Express.js
- **OpenAI API** for AI-powered resume rewriting
- **Python** for ATS scoring and analysis

### Frontend
- **React** for the user interface
- **Axios** for API communication
- **TailwindCSS** for styling (optional)

## Project Structure

```
Resume-Tailor/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/    # Business logic
│   │   ├── services/       # OpenAI integration
│   │   └── utils/          # Helper functions
│   ├── .env.example
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   └── App.jsx
│   └── package.json
├── python-services/        # Python utilities
│   ├── ats_scorer/         # ATS scoring logic
│   └── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcelolszewski119/Resume-Tailor.git
   cd Resume-Tailor
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Add your OpenAI API key to .env
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Setup Python Services**
   ```bash
   cd python-services
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## API Endpoints

- `POST /api/tailor` - Tailor resume based on job description
- `POST /api/ats-score` - Calculate ATS score for a resume
- `POST /api/compare` - Compare ATS scores before and after

## Environment Variables

```
OPENAI_API_KEY=your_api_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Contributing

Feel free to open issues and submit pull requests for any improvements.

## License

MIT License

## Support

For questions or issues, please open a GitHub issue or contact the maintainers.
