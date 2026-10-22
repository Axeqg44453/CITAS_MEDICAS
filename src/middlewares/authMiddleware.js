module.exports = {
  verificarAuth: (req, res, next) => {
    if (req.session.usuario) return next();
    res.redirect('/auth/login');
  },
  esPaciente: (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'paciente') return next();
    res.status(403).send('Acceso denegado');
  },
  esMedico: (req, res, next) => {
    if (req.session.usuario && req.session.usuario.rol === 'medico') return next();
    res.status(403).send('Acceso denegado');
  }
};