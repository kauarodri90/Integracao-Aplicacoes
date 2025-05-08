// app.js
const express = require('express');
const app = express();
const port = 3000;


const userRoutes = require('./routes/user');
const carsRoutes = require('./routes/cars');


// Middleware para parsear JSON
app.use(express.json());


app.use('/users', userRoutes);
app.use('/cars', carsRoutes);

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});