// URL base de la API.
// - VITE_API_URL (si está definida) manda siempre — útil para sobreescribir en Vercel.
// - En build de producción usa el backend desplegado en Render.
// - En local (npm run dev) usa el backend de desarrollo.
const apiUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD
    ? "https://unicar-backend.onrender.com/api/v1"
    : "http://127.0.0.1:8000/api/v1");

export default apiUrl;