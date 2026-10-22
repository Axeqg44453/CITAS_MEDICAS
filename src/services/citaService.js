const pool = require('../config/database');

class CitaService {
  // 1. CREAR (Registrar una cita)
  async agendarCita(pacienteUsuarioId, medicoId, fechaHora) {
    const pacRes = await pool.query('SELECT id FROM pacientes WHERE usuario_id = \$1', [pacienteUsuarioId]);
    if (pacRes.rows.length === 0) throw new Error('Paciente no encontrado');
    
    const pacienteId = pacRes.rows[0].id;
    const res = await pool.query(
      'INSERT INTO citas (paciente_id, medico_id, fecha_hora, estado) VALUES (\$1, \$2, \$3, \$4) RETURNING *',
      [pacienteId, medicoId, fechaHora, 'Pendiente']
    );
    return res.rows[0];
  }

  // 2. CONSULTAR (Obtener citas del paciente)
  async obtenerCitasPaciente(pacienteUsuarioId) {
    const query = `
      SELECT c.id, u_med.nombre AS medico, COALESCE(e.nombre, 'Medicina General') AS especialidad, c.fecha_hora, c.estado
      FROM citas c
      JOIN pacientes p ON c.paciente_id = p.id
      JOIN medicos m ON c.medico_id = m.id
      JOIN usuarios u_med ON m.usuario_id = u_med.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE p.usuario_id = $1
      ORDER BY c.fecha_hora DESC
    `;
    const res = await pool.query(query, [pacienteUsuarioId]);
    return res.rows;
  }

  // 2. CONSULTAR (Obtener medicos registrados para el selector)
  async obtenerMedicosConEspecialidad() {
    const query = `
      SELECT m.id AS medico_id, u.nombre AS medico_nombre, COALESCE(e.nombre, 'Medicina General') AS especialidad_nombre
      FROM medicos m
      JOIN usuarios u ON m.usuario_id = u.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY u.nombre ASC
    `;
    const res = await pool.query(query);
    return res.rows;
  }

  // 3. ACTUALIZAR (Cambiar estado o fecha de la cita)
  async actualizarEstadoCita(citaId, nuevoEstado, nuevaFecha = null) {
    if (nuevaFecha && nuevaFecha.trim() !== '') {
      await pool.query(
        'UPDATE citas SET estado = \$1, fecha_hora = \$2 WHERE id = \$3',
        [nuevoEstado, nuevaFecha, citaId]
      );
    } else {
      await pool.query(
        'UPDATE citas SET estado = \$1 WHERE id = \$2',
        [nuevoEstado, citaId]
      );
    }
  }

  // 4. ELIMINAR (Cancelar/Borrar una cita de la base de datos)
  async eliminarCita(citaId) {
    await pool.query('DELETE FROM citas WHERE id = \$1', [citaId]);
  }
}

module.exports = new CitaService();