# CareerPath AI — Phase 2

**AI Recommendation Engine & Skill Development Tracker**

A mentor-ready MERN + AI career guidance platform with an aesthetic React dashboard, explainable career matching, skill-gap analysis, curated learning resources, goals, analytics, AI chat, and printable reports.

## What is included
- AI career recommendations with explainable match scores
- Skill gap analysis: current vs target proficiency
- AI-curated learning hub with completion tracking
- Goal setting and progress tracking
- Career AI chatbot with optional Gemini integration
- Recharts analytics dashboard
- Mentor-ready printable performance report
- Demo mode works **without MongoDB or an API key**
- Optional MongoDB Atlas + Gemini integration
- Production mode can serve the built React app from Express on port 5000

## Run locally — easiest demo

### Terminal 1 — backend
```bash
cd server
npm install
npm run dev
```
Backend: http://localhost:5000
Health: http://localhost:5000/api/health

### Terminal 2 — frontend
```bash
cd client
npm install
npm run dev
```
Frontend: http://localhost:5173

### Demo login
- Email: `demo@careerpath.ai`
- Password: `Demo@123`

No MongoDB is required for the demo.

## Optional MongoDB / AI
Copy `server/.env.example` to `server/.env` and add your MongoDB Atlas URI and JWT secret.
For Gemini, set `AI_PROVIDER=gemini` and add `GEMINI_API_KEY`.

Copy `client/.env.example` to `client/.env` only if your API is hosted somewhere other than `http://localhost:5000/api`.

## Serve the complete website from port 5000
```bash
cd client
npm install
npm run build
cd ../server
npm install
npm start
```
Then open **http://localhost:5000**. Express will serve `client/dist` when the production build exists.

## Important troubleshooting
If the browser console says **React is not defined**, every JSX file that uses React/JSX must import React. This project already includes the required imports.

If you see `useEffect is not defined`, make sure the AuthContext import is:
```js
import React,{createContext,useContext,useEffect,useState} from "react";
```

If port 5000 shows API JSON instead of the UI, run `npm run build` inside `client` first. During development, use `http://localhost:5173` for the React UI and `http://localhost:5000` for the API.
