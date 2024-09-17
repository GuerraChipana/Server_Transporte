const express = require('express');
const cors = require('cors'); // Asegúrate de que esto esté importado
const app = express();
const port = 3002;

// Importar rutas
const propietariosRouter = require('./routes/propietarios');
const segurosRouter = require('./routes/SeguroVehicular');
const testRouter = require('./routes/test');
const loginRouter = require('./routes/Login')

// Configurar middleware
app.use(express.json());
app.use(cors({
    origin: '*',
}));

// Usar rutas
app.use('/api/propietarios', propietariosRouter);
app.use('/api/seguros', segurosRouter);
app.use('/test', testRouter);
app.use('/api/login', loginRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
