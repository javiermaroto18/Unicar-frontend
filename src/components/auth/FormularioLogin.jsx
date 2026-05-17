import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function FormularioLogin() {
    const [email,          setEmail]          = useState('');
    const [password,       setPassword]       = useState('');
    const [mostrarPass,    setMostrarPass]    = useState(false);
    const [isLoading,      setIsLoading]      = useState(false);

    // Conectamos con nuestro contexto global y el router de React
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Ejecutamos el login del contexto (que guarda el token y el usuario global)
            await login({ email, password });
            // Redirigimos al dashboard automáticamente
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="auth-formulario" onSubmit={handleSubmit}>
            <div className="auth-campo">
                <label className="auth-campo_etiqueta" htmlFor="login-email">
                    Correo Universitario
                </label>
                <input
                    className="auth-campo_input"
                    id="login-email"
                    type="email"
                    placeholder="alex@alumnos.ucm.es"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="auth-campo">
                <label className="auth-campo_etiqueta" htmlFor="login-password">
                    Contraseña
                </label>
                <div className="auth-campo_wrap-password">
                    <input
                        className="auth-campo_input auth-campo_input-password"
                        id="login-password"
                        type={mostrarPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className={`auth-campo_btn-ojo${mostrarPass ? ' auth-campo_btn-ojo-activo' : ''}`}
                        onClick={() => setMostrarPass(v => !v)}
                    >
                        <svg className="auth-campo_icono-ojo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
                <div className="auth-campo_enlace-olvidado">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
            </div>

            <button className="auth-btn-enviar" type="submit" disabled={isLoading}>
                {isLoading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>
        </form>
    );
}