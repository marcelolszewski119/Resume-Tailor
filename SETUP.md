# Resume Tailor - Setup Guide

## Prerequisites

- **Node.js** v16 or higher
- **Python** v3.8 or higher
- **npm** (comes with Node.js)
- **OpenAI API Key** - Get one at https://platform.openai.com/api-keys

## Quick Start

### 1. Clone & Navigate

```bash
git clone https://github.com/marcelolszewski119/Resume-Tailor.git
cd Resume-Tailor
```

### 2. Setup Backend (Node.js/Express)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=sk-...

# Start the backend server
npm start
# Server will run on http://localhost:5000
```

### 3. Setup Frontend (React)

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# Frontend will run on http://localhost:3000
```

### 4. (Optional) Setup Python Services

For enhanced ATS scoring capabilities:

```bash
cd python-services

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development

```bash
cd frontend
npm run dev
```

### Building for Production

**Backend:**
```bash
cd backend
npm run build
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Environment Variables

### Backend (.env)

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (vite.config.js)

The proxy is already configured to connect to the backend:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## API Endpoints

### Resume Tailoring

**POST** `/api/tailor`

Tailor a resume based on job description.

Request:
```json
{
  "resume": "Your resume text here...",
  "jobDescription": "Job description text here..."
}
```

Response:
```json
{
  "success": true,
  "originalResume": "...",
  "tailoredResume": "...",
  "originalAtsScore": 65,
  "tailoredAtsScore": 82,
  "improvement": 17
}
```

### ATS Score Calculation

**POST** `/api/ats-score`

Calculate ATS score for a resume.

Request:
```json
{
  "resume": "Your resume text here...",
  "jobDescription": "Job description text here..."
}
```

Response:
```json
{
  "success": true,
  "atsScore": 75
}
```

### Compare Scores

**POST** `/api/compare`

Compare ATS scores before and after.

Request:
```json
{
  "originalResume": "...",
  "tailoredResume": "...",
  "jobDescription": "..."
}
```

Response:
```json
{
  "success": true,
  "comparison": {
    "originalScore": 65,
    "tailoredScore": 82,
    "improvement": 17,
    "improvementPercentage": "26.15"
  }
}
```

## Troubleshooting

### OpenAI API Key Issues

- Verify your API key is correct in the `.env` file
- Check that your OpenAI account has credits
- Ensure the API key has appropriate permissions

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend:**
```bash
cd backend
PORT=5001 npm start
```

**Frontend:**
Edit `vite.config.js` and change the port:
```javascript
server: {
  port: 3001,
  // ...
}
```

### CORS Issues

Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

## Project Structure

```
Resume-Tailor/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── python-services/
    ├── ats_scorer/
    └── requirements.txt
```

## Next Steps

1. **Add File Upload** - Support PDF/DOCX resume uploads
2. **Database Integration** - Store user tailoring history
3. **Authentication** - Add user accounts
4. **Enhanced Feedback** - Provide specific recommendations
5. **Performance Optimization** - Cache results and optimize API calls

## Support

For issues or questions, please open a GitHub issue or check the main README.

## License

MIT License
