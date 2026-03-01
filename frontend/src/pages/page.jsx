import React, { useState, useEffect } from 'react';
import './page.scss';
import GoodsList from '../components/list';
import GoodModal from '../components/modal'; 
import { api } from '../api';   

export default function GoodsPage() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [editingGood, setEditingGood] = useState(null);

    useEffect(() => {
        loadGoods();
    }, []);

    const loadGoods = async () => {
        try {
            setLoading(true);
            const data = await api.getGoods();
            setGoods(data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Не удалось загрузить товары');
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setModalMode('create');
        setEditingGood(null);
        setModalOpen(true);
    };

    const openEditModal = (good) => {
        setModalMode('edit');
        setEditingGood(good);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingGood(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить товар?')) return;
        
        try {
            await api.deleteGood(id);
            setGoods(prev => prev.filter(g => g.id !== id));
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Не удалось удалить товар');
        }
    };

    const handleSubmit = async (goodData) => {
        try {
            if (modalMode === 'create') {
                const newGood = await api.createGood(goodData);
                setGoods(prev => [...prev, newGood]);
            } else {
                const updatedGood = await api.updateGood(goodData.id, goodData);
                setGoods(prev => prev.map(g => 
                    g.id === goodData.id ? updatedGood : g
                ));
            }
            closeModal();
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            alert('Не удалось сохранить товар');
        }
    };

    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <h1 className="logo">Интернет-магазин</h1>
                        <div className="header__info">
                            Товаров: {goods.length}
                        </div>
                    </div>
                </div>
            </header>

            <main className="main">
                <div className="container">
                    <div className="toolbar">
                        <h2>Каталог товаров</h2>
                        <button className="btn btn--primary" onClick={openCreateModal}>
                            + Добавить товар
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading">Загрузка...</div>
                    ) : (
                        <GoodsList 
                            goods={goods}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </main>

            <footer className="footer">
                <div className="container">
                    <div className="footer__inner">
                        © {new Date().getFullYear()} Интернет-магазин. Все права защищены.
                    </div>
                </div>
            </footer>

            <GoodModal
                open={modalOpen}
                mode={modalMode}
                initialGood={editingGood}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />
        </div>
    );
}