const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const { verificarAuth, esMedico } = require('../middlewares/authMiddleware');

router.use(verificarAuth, esMedico);
router.get('/dashboard', medicoController.renderDashboard);
router.post('/actualizar-cita', medicoController.actualizarEstado);

module.exports = router;