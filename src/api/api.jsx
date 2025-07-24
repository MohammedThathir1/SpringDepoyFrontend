import axios from "axios";

// Use environment variable or fallback to localhost
// For Vite projects, use import.meta.env; for Create React App, use process.env
const API_BASE_URL =
  (import.meta.env && import.meta.env.VITE_API_URL) ||
  "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export default api;


