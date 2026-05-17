import { useState } from 'react';

import AppLayout             from '../common/AppLayout.jsx';
import ListaConversaciones   from '../chat/ListaConversaciones.jsx';
import HiloMensajes          from '../chat/HiloMensajes.jsx';

import { MOCK_USER }            from '../../utils/mockData.js';
import { MOCK_CONVERSACIONES }  from '../../utils/mockDataChat.js';

import '../../styles/ChatLayout.css';

export default function ChatPage() {
    const [idActivo, setIdActivo] = useState(MOCK_CONVERSACIONES[0].id);

    const conversacionActiva = MOCK_CONVERSACIONES.find(c => c.id === idActivo);

    return (
        <AppLayout
            user={MOCK_USER}
            activeHref="/chat"
            hasNotifications
            onPublish={() => { window.location.href = '/publish'; }}
        >
            {/*
             * El chat tiene su propio layout interno de dos columnas
             * igual que el perfil — anula el padding del contenedor padre
             * con height y overflow propios.
             */}
            <div className="chat-diseno">
                <ListaConversaciones
                    conversaciones={MOCK_CONVERSACIONES}
                    idActivo={idActivo}
                    onSeleccionar={setIdActivo}
                />
                <HiloMensajes conversacion={conversacionActiva} />
            </div>
        </AppLayout>
    );
}
