const citaService = require('../services/citaService');

// Consultar dashboard y cargar citas + médicos
exports.renderDashboard = async (req, res) => {
  try {
    const usuarioId = req.session.usuario.id;
    const citas = await citaService.obtenerCitasPaciente(usuarioId);
    const medicos = await citaService.obtenerMedicosConEspecialidad();

    res.render('pacienteDashboard', {
      usuario: req.session.usuario,
      citas: citas || [],
      medicos: medicos || []
    });
  } catch (error) {
    console.error('Error al cargar panel de paciente:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Registrar nueva cita
exports.agendarCita = async (req, res) => {
  try {
    const usuarioId = req.session.usuario.id;
    const { medicoId, fechaHora } = req.body;
    await citaService.agendarCita(usuarioId, medicoId, fechaHora);
    res.redirect('/paciente/dashboard');
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).send('Error al agendar cita');
  }
};

// Eliminar cita
exports.eliminarCita = async (req, res) => {
  try {
    const { citaId } = req.params;
    await citaService.eliminarCita(citaId);
    res.redirect('/paciente/dashboard');
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).send('Error al eliminar cita');
  }
};

exports.agendarCita = async (req, res) => {
  try {
    const usuarioId = req.session.usuario.id;
    const { medicoId, fechaHora } = req.body;

    await citaService.agendarCita(usuarioId, medicoId, fechaHora);
    res.redirect('/paciente/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agendar la cita');
  }
};