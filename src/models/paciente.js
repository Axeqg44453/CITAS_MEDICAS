class Paciente {
  constructor(id, usuarioId, nombre, email, telefono) {
    this.id = id;
    this.usuarioId = usuarioId;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
  }
}
module.exports = Paciente;