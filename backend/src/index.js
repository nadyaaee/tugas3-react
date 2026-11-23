const express = require('express');
const cors = require('cors');

const app = express();

const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Menjalankan server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});