# Romantic Gift Website ❤️

A full-stack MERN application built as a special gift.

## Features
- **3D Hero Section**: Interactive floating elements using React Three Fiber.
- **Gallery**: Upload and view memories (Images stored locally).
- **Messages**: Public notes wall.
- **Surprise**: Date-locked content that reveals automatically.
- **Responsive Design**: Beautiful on all devices.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Three Fiber
- **Backend**: Node.js, Express, MongoDB, Multer

## Setup

### Prerequisites
- Node.js installed
- MongoDB Atlas URI (provided in `server/server.js`)

### Installation

1. **Backend**
   ```bash
   cd server
   npm install
   npm start
   ```
   Server runs on `http://localhost:5000`.

2. **Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`.

## Deployment
- **Backend**: Deploy to Render/Vercel/Heroku. Ensure `uploads/` directory is handled (use persistent disk or switch to Cloudinary for production).
- **Frontend**: Deploy to Vercel/Netlify. Update API URL in frontend code to point to deployed backend.

## License
Made with ❤️.
