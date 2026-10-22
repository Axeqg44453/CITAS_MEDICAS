const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/dashboard', pacienteController.renderDashboard);
router.post('/agendar', pacienteController.agendarCita);
router.post('/eliminar/:citaId', pacienteController.eliminarCita);

module.exports = router;