-- 1. Limpieza de tablas existentes
DROP TABLE IF EXISTS citas CASCADE;
DROP TABLE IF EXISTS medicos CASCADE;
DROP TABLE IF EXISTS pacientes CASCADE;
DROP TABLE IF EXISTS especialidades CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 2. Creación de la estructura de tablas
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('paciente', 'medico', 'administrador')) NOT NULL
);

CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidad_id INT REFERENCES especialidades(id) ON DELETE SET NULL
);

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    telefono VARCHAR(20)
);

CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id) ON DELETE CASCADE,
    medico_id INT REFERENCES medicos(id) ON DELETE CASCADE,
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Completada', 'Reagendada', 'Cancelada'))
);

-- 3. Inserción de catálogo de especialidades
INSERT INTO especialidades (id, nombre) VALUES
(1, 'Cardiología'),
(2, 'Pediatría'),
(3, 'Medicina General'),
(4, 'Dermatología');

-- 4. Inserción de usuarios de prueba (Contraseña para ambos: 123)
INSERT INTO usuarios (id, nombre, email, password, rol) VALUES
(1, 'Juan Paciente', 'paciente@test.com', '$2b$10$3pC3OdrW/4eA1x.zTf2B7u30iV/gM6x.fG0OQ4Y0hG30iV/gM6x.f', 'paciente'),
(2, 'Dr. Roberto', 'doctor@test.com', '$2b$10$3pC3OdrW/4eA1x.zTf2B7u30iV/gM6x.fG0OQ4Y0hG30iV/gM6x.f', 'medico');

-- 5. Perfiles y cita inicial
INSERT INTO pacientes (id, usuario_id, telefono) VALUES (1, 1, '0999999999');
INSERT INTO medicos (id, usuario_id, especialidad_id) VALUES (1, 2, 1);

INSERT INTO citas (paciente_id, medico_id, fecha_hora, estado) VALUES
(1, 1, '2026-10-15 10:00:00', 'Pendiente');

-- 6. Sincronización de secuencias auto-incrementales
SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));
SELECT setval('especialidades_id_seq', (SELECT MAX(id) FROM especialidades));
SELECT setval('pacientes_id_seq', (SELECT MAX(id) FROM pacientes));
SELECT setval('medicos_id_seq', (SELECT MAX(id) FROM medicos));
SELECT setval('citas_id_seq', (SELECT MAX(id) FROM citas));