// routes/usuarios.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_PATH = path.join(__dirname, '..', 'data', 'registros.json');

// Lee y parsea el JSON (devuelve [] si no existe)
function leerRegistros() {
    try {
        return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

// Serializa y guarda los registros
function escribirRegistros(registros) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(registros, null, 2), 'utf8');
}

// POST /users/create
router.post('/create', (req, res) => {
    const { name, age, city } = req.body;

    // Validaciones de servidor
    if (!name || !age || !city) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ error: 'La edad debe ser un número entero positivo.' });
    }

    // Persistencia en JSON
    const registros = leerRegistros();
    registros.push({ name, age, city, createDate: new Date().toISOString() });
    escribirRegistros(registros);

    // Mensaje de respuesta
    const estatus = age < 18 ? 'menor de edad' : 'mayor de edad';
    const message = `Hola ${name} de ${city}, tienes ${age} años. Eres ${estatus}.`;

    res.json({ message });
});

// GET /users/getAll
router.get('/getAll', (req, res) => {
    res.json(leerRegistros());
});

module.exports = router;
