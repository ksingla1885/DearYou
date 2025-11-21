# DearYou - A Romantic Gift Website 💕

A full-stack web application for creating a personalized romantic experience with galleries, messages, and surprises.

## Project Structure

```
DearYou/
├── client/          # React + Vite frontend
├── server/          # Node.js + Express backend
└── README.md
```

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd DearYou
   ```

2. **Set up the Server**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and other credentials
   npm run dev
   ```

3. **Set up the Client**
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Edit .env if needed (default uses localhost:5000)
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## Deployment

See the [Deployment Guide](.agent/workflows/deploy.md) for detailed instructions on deploying to production.

### Quick Deployment Steps

1. **Database**: Set up MongoDB Atlas
2. **Backend**: Deploy to Render/Railway
3. **Frontend**: Deploy to Vercel/Netlify
4. **Configure**: Set environment variables on each platform

## Features

- 🏠 **Landing Page**: Beautiful entrance to your romantic site
- 💕 **Home**: Personalized welcome page
- 📸 **Gallery**: Upload and share photos
- 💌 **Messages**: Exchange love notes
- 🎁 **Surprises**: Time-locked special content
- 🎵 **Music Player**: Background music throughout the site

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Three Fiber (3D effects)
- Axios

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Cloudinary (image storage)
- Multer (file uploads)

## Environment Variables

### Client (.env)
```
VITE_API_URL=http://localhost:5000
```

### Server (.env)
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## License

This is a personal project. Feel free to use it as inspiration for your own romantic gestures! ❤️
