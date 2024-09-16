const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(express.json());
app.use(cors({
    origin: '*', 
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mdtai_transporte_1'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos.');
});

// Obtener todos los propietarios
app.get('/api/propietarios', (req, res) => {
    const query = `
        SELECT id, nombre, apellido, dni, telefono, domicilio
        FROM Propietario
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener propietarios:', err);
            return res.status(500).json({ error: 'Error al obtener propietarios' });
        }
        res.json(results);
    });
});

// Agregar un nuevo propietario
app.post('/api/propietarios', (req, res) => {
    const { nombre, apellido, dni, telefono, domicilio } = req.body;

    if (!nombre || !apellido || !dni || !telefono || !domicilio) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = `
        INSERT INTO Propietario (nombre, apellido, dni, telefono, domicilio)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, apellido, dni, telefono, domicilio], (err, result) => {
        if (err) {
            console.error('Error al agregar el propietario:', err);
            return res.status(500).json({ error: 'Error al agregar el propietario' });
        }
        res.status(201).json({ message: 'Propietario agregado exitosamente', propietarioId: result.insertId });
    });
});

// Actualizar un propietario
app.put('/api/propietarios/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, dni, telefono, domicilio } = req.body;

    if (!nombre || !apellido || !dni || !telefono || !domicilio) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const query = `
        UPDATE Propietario
        SET nombre = ?, apellido = ?, dni = ?, telefono = ?, domicilio = ?
        WHERE id = ?
    `;

    db.query(query, [nombre, apellido, dni, telefono, domicilio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el propietario:', err);
            return res.status(500).json({ error: 'Error al actualizar propietario' });
        }
        res.json({ message: 'Propietario actualizado exitosamente' });
    });
});

// Eliminar un propietario
app.delete('/api/propietarios/:id', (req, res) => {
    const id = req.params.id;

    const query = 'DELETE FROM Propietario WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el propietario:', err);
            return res.status(500).json({ error: 'Error al eliminar propietario' });
        }
        res.json({ message: 'Propietario eliminado exitosamente' });
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
