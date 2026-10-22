const Medico = require('./medico');

// Subclase que extienda funcionalidades de especialidad avanzada
class Especialista extends Medico {
  constructor(id, usuarioId, nombre, email, especialidad, codigoLicencia) {
    super(id, usuarioId, nombre, email, especialidad);
    this.codigoLicencia = codigoLicencia;
  }
}
module.exports = Especialista;