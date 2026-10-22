const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class AuthService {
  async registrarUsuario(nombre, email, password, rol, especialidadId = null) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const hashedPassword = await bcrypt.hash(password, 10);
      
      // 1. Insertar en la tabla usuarios (PostgreSQL asigna el 'id' automáticamente)
      const userRes = await client.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING id',
        [nombre, email, hashedPassword, rol]
      );
      const usuarioId = userRes.rows[0].id;

      // 2. Insertar según el rol (sin forzar un 'id' manual para evitar colisiones)
      if (rol === 'paciente') {
        await client.query(
          'INSERT INTO pacientes (usuario_id, telefono) VALUES ($1, $2)',
          [usuarioId, '']
        );
      } else if (rol === 'medico') {
        // Aseguramos que especialidadId sea un número o tome un valor por defecto (1)
        const espId = especialidadId ? parseInt(especialidadId, 10) : 1;
        await client.query(
          'INSERT INTO medicos (usuario_id, especialidad_id) VALUES ($1, $2)',
          [usuarioId, espId]
        );
      }

      await client.query('COMMIT');
      return { success: true };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async login(email, password) {
    const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (res.rows.length === 0) return null;

    const usuario = res.rows[0];
    const match = await bcrypt.compare(password, usuario.password);
    
    if (!match) return null;
    return usuario;
  }
}

module.exports = new AuthService();