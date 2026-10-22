const citaService = require('../services/citaService');

module.exports = {
  renderDashboard: async (req, res) => {
    const citas = await citaService.obtenerCitasMedico(req.session.usuario.id);
    res.render('medicoDashboard', { usuario: req.session.usuario, citas });
  },

  actualizarEstado: async (req, res) => {
    const { citaId, estado, nuevaFecha } = req.body;
    await citaService.actualizarEstadoCita(citaId, estado, nuevaFecha || null);
    res.redirect('/medico/dashboard');
  }
};