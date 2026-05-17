import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

const RATING_BARS = [
    { stars: 5, count: 18, pct: 78 },
    { stars: 4, count: 4,  pct: 17 },
    { stars: 3, count: 1,  pct: 4  },
    { stars: 2, count: 0,  pct: 0  },
    { stars: 1, count: 0,  pct: 0  },
];

function StarRow({ score }) {
    const full = Math.floor(score);
    const half = score % 1 >= 0.5;
    return (
        <div className="prof-ratings-summary-estrellas">
            {Array.from({ length: full }).map((_, i) => (
                <span key={i} className="material-symbols-outlined pn-star pn-star--full">star</span>
            ))}
            {half && <span className="material-symbols-outlined pn-star pn-star--half">star_half</span>}
        </div>
    );
}

export default function ProfileSectionRatings({ reviews, overallScore, totalCount }) {
    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Valoraciones</h2>
                    <p className="psection-subtitulo">Lo que otros usuarios dicen de ti.</p>
                </div>
            </div>

            <div className="prof-ratings-summary">
                <div className="prof-ratings-summary-puntuacion">
                    <span className="prof-ratings-summary-numero">{overallScore}</span>
                    <StarRow score={overallScore} />
                    <span className="prof-ratings-summary-cantidad">{totalCount} valoraciones</span>
                </div>
                <div className="prof-ratings-summary-barras">
                    {RATING_BARS.map(({ stars, count, pct }) => (
                        <div key={stars} className="prof-rating-bar">
                            <span>{stars} ★</span>
                            <div className="prof-rating-bar-pista">
                                <div
                                    className={`prof-rating-bar-relleno${pct === 0 ? ' prof-rating-bar-relleno--bajo' : ''}`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                            <span>{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="prof-reviews-list">
                {reviews.map((review, i) => (
                    <div key={i} className="prof-review-card">
                        <div className="prof-review-card-encabezado">
                            <img className="prof-review-card-avatar" src={review.avatar} alt={review.name} />
                            <div>
                                <p className="prof-review-card-nombre">{review.name}</p>
                                <p className="prof-review-card-fecha">{review.date} · {review.route}</p>
                            </div>
                            <div className="prof-review-card-estrellas">
                                {Array.from({ length: Math.floor(review.score) }).map((_, j) => (
                                    <span key={j} className="material-symbols-outlined pn-star pn-star--full">star</span>
                                ))}
                                {review.score % 1 >= 0.5 && (
                                    <span className="material-symbols-outlined pn-star pn-star--half">star_half</span>
                                )}
                            </div>
                        </div>
                        <p className="prof-review-card-texto">{review.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
