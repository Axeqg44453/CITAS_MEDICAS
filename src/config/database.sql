-- 1. Tabla de Usuarios (Soporta Pacientes, Médicos y Administradores)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) CHECK (rol IN ('paciente', 'medico', 'administrador')) NOT NULL
);

-- 2. Tabla de Especialidades Médicas
CREATE TABLE especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- 3. Tabla de Médicos
CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    especialidad_id INT REFERENCES especialidades(id)
);

-- 4. Tabla de Pacientes
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    telefono VARCHAR(20)
);

-- 5. Tabla de Citas Médicas
CREATE TABLE citas (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    medico_id INT REFERENCES medicos(id),
    fecha_hora TIMESTAMP NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Completada', 'Reagendada', 'Cancelada'))
);

-- Inserción de especialidades iniciales de prueba
INSERT INTO especialidades (nombre) VALUES 
('Cardiología'), 
('Pediatría'), 
('Medicina General'), 
('Dermatología');