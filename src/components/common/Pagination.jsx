import '../../styles/Pagination.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    function getPageNumbers() {
        // Si hay 5 páginas o menos, mostrarlas todas sin puntos
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // Siempre incluir la primera, la última, y las adyacentes a la actual
        const fixed = new Set([1, totalPages]);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i >= 1 && i <= totalPages) fixed.add(i);
        }

        // Ordenar e insertar '...' donde haya saltos
        const sorted = [...fixed].sort((a, b) => a - b);
        const result = [];
        for (let i = 0; i < sorted.length; i++) {
            if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...');
            result.push(sorted[i]);
        }
        return result;
    }

    function NavButton({ direction, disabled, onClick }) {
        const isBack = direction === 'back';
        return (
            <button
                type="button" // <--- ESTO EVITA QUE LA PÁGINA SE RECARGUE
                className="pagination-btn"
                disabled={disabled}
                onClick={onClick}
                aria-label={isBack ? 'Página anterior' : 'Página siguiente'}
            >
                {isBack && <span className="material-symbols-outlined">arrow_back</span>}
                <span className="pagination-btn-texto">{isBack ? 'Anteriores' : 'Siguientes'}</span>
                {!isBack && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
        );
    }

    function PageButton({ page }) {
        if (page === '...') return <span className="pagination-dots">...</span>;

        const isActive = currentPage === page;
        return (
            <button
                type="button" // <--- ESTO EVITA QUE LA PÁGINA SE RECARGUE
                className={`pagination-page ${isActive ? 'pagination-page-active' : ''}`}
                onClick={() => onPageChange(page)}
            >
                {page}
            </button>
        );
    }


    return (
        <div className="pagination">
            <NavButton direction="back" disabled={currentPage === 1}          onClick={() => onPageChange(currentPage - 1)} />
            <div className="pagination-pages">
                {getPageNumbers().map((page, i) => <PageButton key={page === '...' ? `dots-${i}` : page} page={page} />)}
            </div>
            <NavButton direction="next" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
        </div>
    );
}