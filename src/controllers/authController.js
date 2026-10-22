const authService = require('../services/authService');

module.exports = {
  renderLogin: (req, res) => res.render('login'),
  renderRegistro: (req, res) => res.render('registro'),

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) return res.render('login', { error: 'Credenciales inválidas' });

    req.session.usuario = user;
    if (user.rol === 'paciente') res.redirect('/paciente/dashboard');
    else if (user.rol === 'medico') res.redirect('/medico/dashboard');
  },

  registro: async (req, res) => {
    const { nombre, email, password, rol, especialidadId } = req.body;
    await authService.registrarUsuario(nombre, email, password, rol, especialidadId);
    res.redirect('/auth/login');
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
  }
};