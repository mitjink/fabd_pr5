import React, { useEffect, useState } from 'react';

export default function GoodModal({ open, mode, initialGood, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        category: '',
        description: '',
        stock: '',
        imageUrl: '',
        rating: ''
    });

    useEffect(() => {
        if (open && initialGood) {
            setFormData({
                name: initialGood.name || '',
                cost: initialGood.cost || '',
                category: initialGood.category || '',
                description: initialGood.description || '',
                stock: initialGood.stock || '',
                imageUrl: initialGood.imageUrl || '',
                rating: initialGood.rating || ''
            });
        } else {
            setFormData({
                name: '',
                cost: '',
                category: '',
                description: '',
                stock: '',
                imageUrl: '',
                rating: ''
            });
        }
    }, [open, initialGood]);

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert('Введите название товара');
            return;
        }
        if (!formData.cost || formData.cost <= 0) {
            alert('Введите корректную цену');
            return;
        }

        onSubmit({
            ...formData,
            cost: Number(formData.cost),
            stock: Number(formData.stock) || 0,
            rating: Number(formData.rating) || 0,
            id: initialGood?.id
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{mode === 'edit' ? 'Редактировать товар' : 'Добавить товар'}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Название товара *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Например, Ноутбук"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Цена (₽) *</label>
                            <input
                                type="number"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                placeholder="1000"
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Количество</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Категория</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Выберите категорию</option>
                                <option value="Электроника">Электроника</option>
                                <option value="Аксессуары">Аксессуары</option>
                                <option value="Аудио">Аудио</option>
                                <option value="Другое">Другое</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Рейтинг (0-5)</label>
                            <input
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                placeholder="4.5"
                                min="0"
                                max="5"
                                step="0.1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>URL изображения</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="/images/laptop.jpg или https://example.com/image.jpg"
                        />
                        <small className="form-hint">
                            Можно указать путь к файлу в папке public/images/ или полный URL
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Описание</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Описание товара..."
                            rows="3"
                        />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn--secondary" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            {mode === 'edit' ? 'Сохранить' : 'Создать'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}