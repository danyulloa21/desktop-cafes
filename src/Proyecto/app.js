// Importar Express y crear una aplicación
const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');

// Serve static content from the `dist` folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Importar las rutas
const indexRouter = require('./routes/index');
const colaboradoresRouter = require('./routes/colaborador') 
const solicitantesRouter = require('./routes/solicitante')
const solicitudesRouter = require('./routes/solicitud')
const authenticateRouter = require('./routes/authenticate')

// Configurar middleware
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.urlencoded({ extended: false })); // Middleware para parsear los cuerpos de las solicitudes codificados en URL
app.use(express.static('public')); // Middleware para servir archivos estáticos en la carpeta 'public'
app.use(cors())

// Configurar las rutas
app.use('/', indexRouter);
app.use('/api', colaboradoresRouter);
app.use('/api', solicitantesRouter);
app.use('/api', solicitudesRouter);
app.use('/api', authenticateRouter);

// Manejo de errores
app.use((req, res, next) => {
    const error = new Error('Recurso no encontrado');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            message: err.message,
        },
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});