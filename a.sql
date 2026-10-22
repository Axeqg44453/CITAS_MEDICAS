-- Actualiza los contadores automáticos (secuencias) al valor máximo actual
SELECT setval('pacientes_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM pacientes), false);
SELECT setval('usuarios_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM usuarios), false);
SELECT setval('medicos_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM medicos), false);
SELECT setval('citas_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM citas), false);
SELECT * from usuarios;