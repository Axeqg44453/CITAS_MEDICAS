class Medico {
  constructor(id, usuarioId, nombre, email, especialidad) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.nombre = nombre;
    this.email = email;
    this.especialidad = especialidad;
  }
}
module.exports = Medico;