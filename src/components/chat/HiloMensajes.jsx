import { useState, useEffect, useRef } from 'react';
import '../../styles/HiloMensajes.css';

export default function HiloMensajes({ conversacion, onVolver }) {
    const [mensajes,  setMensajes]  = useState(conversacion.mensajes);
    const [texto,     setTexto]     = useState('');
    const scrollRef  = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        setMensajes(conversacion.mensajes);
    }, [conversacion.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [mensajes]);

    function enviar() {
        const contenido = texto.trim();
        if (!contenido) return;

        const nuevoMensaje = {
            id:        Date.now(),
            tipo:      'saliente',
            texto:     contenido,
            hora:      new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
            leido:     false,
        };

        setMensajes(prev => [...prev, nuevoMensaje]);
        setTexto('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviar();
        }
    }

    function handleInput(e) {
        setTexto(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
    }

    return (
        <section className="hilo-mensajes">
            <div className="hilo-mensajes_cabecera">
                <div className="hilo-mensajes_cabecera-usuario">
                    <button className="hilo-mensajes_btn-volver" onClick={onVolver} aria-label="Volver a la lista de chats">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    {conversacion.esGrupo ? (
                        <div className="hilo-mensajes_cabecera-avatar hilo-mensajes_avatar-grupo">
                            <span className="material-symbols-outlined">group</span>
                        </div>
                    ) : (
                        <img className="hilo-mensajes_cabecera-avatar"
                            src={conversacion.avatar} alt={conversacion.nombre} />
                    )}
                    <div>
                        <p className="hilo-mensajes_cabecera-nombre">{conversacion.nombre}</p>
                        {conversacion.conectado && (
                            <p className="hilo-mensajes_cabecera-estado">
                                <span className="hilo-mensajes_punto-conectado" />
                                En línea
                            </p>
                        )}
                    </div>
                </div>
                <div className="hilo-mensajes_cabecera-acciones">
                    <button className="hilo-mensajes_btn-accion" title="Ver perfil">
                        <span className="material-symbols-outlined">person</span>
                    </button>
                    <button className="hilo-mensajes_btn-accion" title="Ver viaje">
                        <span className="material-symbols-outlined">directions_car</span>
                    </button>
                    <button className="hilo-mensajes_btn-accion" title="Más opciones">
                        <span className="material-symbols-outlined">more_vert</span>
                    </button>
                </div>
            </div>

            {conversacion.viaje && (
                <div className="hilo-mensajes_pastilla-viaje">
                    <span className="material-symbols-outlined">directions_car</span>
                    <span>{conversacion.viaje.descripcion}</span>
                    <a className="hilo-mensajes_pastilla-viaje-enlace" href="/trips">Ver reserva</a>
                </div>
            )}

            <div className="hilo-mensajes_scroll" ref={scrollRef}>
                {mensajes.map((msg, i) => {
                    const esSeparador = msg.tipo === 'separador';
                    if (esSeparador) {
                        return (
                            <div key={i} className="hilo-mensajes_separador-dia">
                                <span>{msg.etiqueta}</span>
                            </div>
                        );
                    }
                    const esSaliente = msg.tipo === 'saliente';
                    return (
                        <div key={msg.id}
                            className={`burbuja-mensaje${esSaliente ? ' burbuja-mensaje_saliente' : ' burbuja-mensaje_entrante'}`}>
                            {!esSaliente && (
                                conversacion.esGrupo ? (
                                    <div className="burbuja-mensaje_avatar hilo-mensajes_avatar-grupo">
                                        <span className="material-symbols-outlined">group</span>
                                    </div>
                                ) : (
                                    <img className="burbuja-mensaje_avatar"
                                        src={conversacion.avatar} alt={conversacion.nombre} />
                                )
                            )}
                            <div className="burbuja-mensaje_contenido">
                                <p className="burbuja-mensaje_texto">{msg.texto}</p>
                                <span className="burbuja-mensaje_hora">
                                    {msg.hora}
                                    {esSaliente && (
                                        <span className="material-symbols-outlined burbuja-mensaje_icono-leido">
                                            {msg.leido ? 'done_all' : 'done'}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="hilo-mensajes_area-escritura">
                <button className="hilo-mensajes_btn-adjuntar" title="Adjuntar">
                    <span className="material-symbols-outlined">attach_file</span>
                </button>
                <div className="hilo-mensajes_wrap-input">
                    <textarea
                        ref={textareaRef}
                        className="hilo-mensajes_input"
                        placeholder="Escribe un mensaje..."
                        rows={1}
                        value={texto}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button className="hilo-mensajes_btn-enviar" onClick={enviar} title="Enviar">
                    <span className="material-symbols-outlined">send</span>
                </button>
            </div>
        </section>
    );
}
