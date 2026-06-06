import { useState } from 'react';
import '../../styles/Booking-widget.css';

// Recibimos la función onConfirm y el estado isProcessing desde el padre
export const BookingWidget = ({ pricePerSeat = 8, maxSeats = 4, onConfirm, isProcessing }) => {
    const [seats, setSeats] = useState(1);

    const handleMinus = () => {
        if (seats > 1) setSeats(s => s - 1);
    };

    const handlePlus = () => {
        if (seats < maxSeats) setSeats(s => s + 1);
    };

    const formattedPrice = (amount) => {
        return amount.toFixed(2).replace('.', ',') + '€';
    };

    const handlePayment = () => {
        // Ejecutamos la función del padre y le pasamos los asientos seleccionados
        onConfirm?.(seats);
    };

    return (
        <aside className="col-right">
            <div className="booking-card">
                <div className="booking-card__price-row">
                    <span className="booking-card__price-label">Precio</span>
                    <div className="booking-card__price">
                        <span className="booking-card__amount">{formattedPrice(pricePerSeat)}</span>
                        <span className="booking-card__per">/ plaza</span>
                    </div>
                </div>

                <div className="booking-card__seats">
                    <p className="booking-card__seats-label">Número de plazas</p>
                    <div className="counter">
                        <button 
                            className="counter__btn counter__btn--muted" 
                            onClick={handleMinus}
                            disabled={seats === 1 || isProcessing || maxSeats === 0}
                        >
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="counter__value">{seats}</span>
                        <button 
                            className="counter__btn counter__btn--primary" 
                            onClick={handlePlus}
                            disabled={seats === maxSeats || isProcessing || maxSeats === 0}
                        >
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                    {maxSeats === 0 && (
                        <p style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                            No quedan plazas libres.
                        </p>
                    )}
                </div>

                <div className="booking-card__total">
                    <span className="booking-card__total-label">Total a pagar:</span>
                    <span className="booking-card__total-amount">{formattedPrice(seats * pricePerSeat)}</span>
                </div>

                <button 
                    className="btn-pay" 
                    onClick={handlePayment}
                    disabled={isProcessing || maxSeats === 0}
                    style={{ opacity: isProcessing || maxSeats === 0 ? 0.7 : 1 }}
                >
                    {isProcessing ? 'Procesando...' : 'Confirmar Reserva'}
                    {!isProcessing && <span className="material-symbols-outlined">arrow_forward</span>}
                </button>

                <div className="booking-card__secure">
                    <span className="material-symbols-outlined">verified_user</span>
                    <span>Reserva segura garantizada</span>
                </div>
            </div>
        </aside>
    );
};