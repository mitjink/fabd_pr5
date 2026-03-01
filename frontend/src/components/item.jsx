import React from 'react';

export default function GoodItem({ good, onEdit, onDelete }) {
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<span key={i} className="star half">★</span>);
            } else {
                stars.push(<span key={i} className="star empty">☆</span>);
            }
        }
        return stars;
    };

    return (
        <div className="good-item">
            <div className="good-image">
                <img 
                    src={good.imageUrl || '/images/default.jpg'} 
                    alt={good.name}
                    onError={(e) => {
                        e.target.src = '/images/default.jpg'; 
                    }}
                />
            </div>
            
            <div className="good-content">
                <div className="good-header">
                    <h3 className="good-name">{good.name}</h3>
                    <span className="good-category">{good.category}</span>
                </div>
                
                <div className="good-rating">
                    <div className="stars">
                        {renderRating(good.rating || 0)}
                    </div>
                    <span className="rating-value">{good.rating?.toFixed(1) || '0.0'}</span>
                </div>
                
                <p className="good-description">{good.description}</p>
                
                <div className="good-details">
                    <div className="good-price">{good.cost.toLocaleString()} ₽</div>
                    <div className={`good-stock ${good.stock < 5 ? 'low-stock' : ''}`}>
                        {good.stock > 0 ? `В наличии: ${good.stock} шт.` : 'Нет в наличии'}
                    </div>
                </div>
            </div>
            
            <div className="good-actions">
                <button className="btn btn--edit" onClick={() => onEdit(good)}>
                    Редактировать
                </button>
                <button className="btn btn--delete" onClick={() => onDelete(good.id)}>
                    Удалить
                </button>
            </div>
        </div>
    );
}