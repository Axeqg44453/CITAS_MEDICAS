const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const medicoRoutes = require('./routes/medicoRoutes');

const app = express();
const host = '127.0.0.1';
const port = process.env.PORT || 3000;

// Lectura de datos JSON y formularios URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesiones para autenticación de usuarios
app.use(session({
  secret: process.env.SESSION_SECRET || 'secreto_super_seguro',
  resave: false,
  saveUninitialized: false
}));

// Configuración de vistas con EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Enrutamiento principal
// Middleware para servir archivos estáticos (CSS, imágenes, JS cliente)
app.use(express.static('public'));
app.use('/auth', authRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/medico', medicoRoutes);

// Redirección inicial
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// Inicio del servidor HTTP con Express
app.listen(port, host, () => {
  console.log(`Servidor funcionando en http://${host}:${port}`);
});