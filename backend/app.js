const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let goods = [
    {
        id: 1, 
        name: 'Ноутбук', 
        cost: 75000, 
        category: 'Электроника', 
        description: 'Описание ноутбука', 
        stock: 5, 
        rating: 4.8,
        imageUrl: '/images/laptop.jpg'
    },
    {
        id: 2, 
        name: 'Наушники', 
        cost: 5000, 
        category: 'Аксессуары', 
        description: 'Описание наушников', 
        stock: 15,
        rating: 4.5,
        imageUrl: '/images/headphones.jpg'
    },
    {
        id: 3, 
        name: 'Клавиатура', 
        cost: 3000, 
        category: 'Аксессуары', 
        description: 'Описание клавиатуры', 
        stock: 8,
        rating: 4.6,
        imageUrl: '/images/keyboard.jpg'
    },
    {
        id: 4, 
        name: 'Монитор', 
        cost: 25000, 
        category: 'Электроника', 
        description: 'Описание монитора', 
        stock: 3,
        rating: 4.9,
        imageUrl: '/images/monitor.jpg'
    },
    {
        id: 5, 
        name: 'Мышь', 
        cost: 1500, 
        category: 'Аксессуары', 
        description: 'Описание компьютерной мыши', 
        stock: 12,
        rating: 4.3,
        imageUrl: '/images/mouse.jpg'
    },
    {
        id: 6, 
        name: 'Смартфон', 
        cost: 45000, 
        category: 'Электроника', 
        description: 'Описание смартфона', 
        stock: 4,
        rating: 4.7,
        imageUrl: '/images/smartphone.jpg'
    },
    {
        id: 7, 
        name: 'Планшет', 
        cost: 35000, 
        category: 'Электроника', 
        description: 'Описание планшета', 
        stock: 6,
        rating: 4.4,
        imageUrl: '/images/tablet.jpg'
    },
    {
        id: 8, 
        name: 'Чехол', 
        cost: 1000, 
        category: 'Аксессуары', 
        description: 'Описание чехла для смартфона', 
        stock: 20,
        rating: 4.2,
        imageUrl: '/images/phonecase.jpg'
    },
    {
        id: 9, 
        name: 'Зарядка', 
        cost: 2000, 
        category: 'Аксессуары', 
        description: 'Описание зарядки', 
        stock: 10,
        rating: 4.5,
        imageUrl: '/images/charger.jpg'
    },
    {
        id: 10, 
        name: 'Колонка', 
        cost: 4000, 
        category: 'Аудио', 
        description: 'Описание колонки', 
        stock: 7,
        rating: 4.6,
        imageUrl: '/images/speaker.jpg'
    }
];

app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" })); 

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} [${req.method}] ${req.path}`);
    next();
});

app.get('/', (req, res) => {
    res.send('API интернет-магазина');
});

app.get('/goods', (req, res) => {
    res.json(goods);
});

app.get('/goods/:id', (req, res) => {
    let good = goods.find(g => g.id == req.params.id);
    if (!good) return res.status(404).json({ message: 'Товар не найден.' });
    res.json(good);
});

app.post('/goods', (req, res) => {
    const { name, cost, category, description, stock, imageUrl, rating } = req.body;
    const newGood = {
        id: Date.now(),
        name,
        cost: Number(cost),
        category: category || 'Другое',
        description: description || '',
        stock: Number(stock) || 0,
        rating: Number(rating) || 0,
        imageUrl: imageUrl || '/images/default.jpg'
    };
    
    goods.push(newGood);
    res.status(201).json(newGood);
});

app.patch('/goods/:id', (req, res) => {
    const good = goods.find(g => g.id == req.params.id);
    if (!good) return res.status(404).json({ message: 'Товар не найден' });

    const { name, cost, category, description, stock, imageUrl, rating } = req.body;

    if (name !== undefined) good.name = name;
    if (cost !== undefined) good.cost = Number(cost);
    if (category !== undefined) good.category = category;
    if (description !== undefined) good.description = description;
    if (stock !== undefined) good.stock = Number(stock);
    if (imageUrl !== undefined) good.imageUrl = imageUrl;
    if (rating !== undefined) good.rating = Number(rating);

    res.json(good);
});

app.delete('/goods/:id', (req, res) => {
    const exists = goods.some(g => g.id == req.params.id);
    if (!exists) return res.status(404).json({ message: 'Товар не найден' });
    
    goods = goods.filter(g => g.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});