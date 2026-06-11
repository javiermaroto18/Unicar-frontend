// URL base de la API.
const apiUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD
    ? "https://unicar-backend.onrender.com/api/v1"
    : "http://127.0.0.1:8000/api/v1");

export default apiUrl;