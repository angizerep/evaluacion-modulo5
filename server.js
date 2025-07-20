const express = require('express');
const usuariosRouter = require('./routes/usuarios');

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware que permite leer JSON desde POST
app.use(express.static('public')); // Servir archivos frontend desde carpeta 'public'

// Ruta tipo GET
app.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Hola desde el backend!!' });
});

// Ruta tipo POST
app.post('/datos', (req, res) => {
    const { nombre } = req.body;
    res.json({
        mensaje: `Hola, ${nombre}. Tus datos fueron recibidos.` });
});

app.use('/users', usuariosRouter);

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});