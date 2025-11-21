// API Configuration
// Automatically select URL based on environment
const isProduction = import.meta.env.MODE === 'production';

export const API_URL = import.meta.env.VITE_API_URL || (isProduction
    ? 'https://dearyou-backend.vercel.app' // Fallback for production
    : 'http://localhost:5000');            // Fallback for development

export default API_URL;
