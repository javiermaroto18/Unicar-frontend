import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function FormularioRegistro() {
    const [nombre,      setNombre]      = useState('');
    const [email,       setEmail]       = useState('');
    const [password,    setPassword]    = useState('');
    const [mostrarPass, setMostrarPass] = useState(false);
    const [isLoading,   setIsLoading]   = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Mapeamos "name" para que Laravel lo acepte correctamente
            await register({ name: nombre, email, password });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("Error al crear la cuenta. Revisa los datos ingresados.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="auth-formulario" onSubmit={handleSubmit}>
            <div className="auth-campo">
                <label className="auth-campo_etiqueta" htmlFor="reg-nombre">
                    Nombre Completo
                </label>
                <input
                    className="auth-campo_input"
                    id="reg-nombre"
                    type="text"
                    placeholder="Alex Johnson"
                    required
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="auth-campo">
                <label className="auth-campo_etiqueta" htmlFor="reg-email">
                    Correo Universitario
                </label>
                <input
                    className="auth-campo_input"
                    id="reg-email"
                    type="email"
                    placeholder="alex@alumnos.ucm.es"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="auth-campo_pista">
                    <svg className="auth-campo_pista-icono" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <p className="auth-campo_pista-texto">
                        Solo se admiten dominios universitarios autorizados.
                    </p>
                </div>
            </div>

            <div className="auth-campo">
                <label className="auth-campo_etiqueta" htmlFor="reg-password">
                    Contraseña
                </label>
                <div className="auth-campo_wrap-password">
                    <input
                        className="auth-campo_input auth-campo_input-password"
                        id="reg-password"
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
            </div>

            <button className="auth-btn-enviar" type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear cuenta'}
            </button>
        </form>
    );
}