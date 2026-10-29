const test = require("node:test");
const assert = require("node:assert");
const Citas = require("../src/citas.js");

// HU-01 - criterio 1
test("HU-01: la búsqueda por Cardiología devuelve solo médicos activos", () => {
  const r = Citas.buscarMedicos("Cardiología");
  assert.strictEqual(r.medicos.length, 2);
  assert.ok(r.medicos.every((m) => m.especialidad === "Cardiología"));
  assert.ok(r.medicos.every((m) => m.nombre && m.foto));
});

// HU-01 - criterio 2
test("HU-01: especialidad sin médicos activos muestra mensaje y sugerencias", () => {
  const r = Citas.buscarMedicos("Neurología");
  assert.strictEqual(r.medicos.length, 0);
  assert.strictEqual(
    r.mensaje,
    "No hay médicos disponibles para esta especialidad"
  );
  assert.ok(r.sugerencias.length > 0);
});

// HU-02 - criterio 1
test("HU-02: solo se muestran franjas futuras", () => {
  const almacen = Citas.crearAlmacen();
  const ahora = new Date("2026-11-12T10:00");
  const franjas = Citas.obtenerDisponibilidad(almacen, 1, ahora);
  assert.ok(franjas.every((f) => new Date(f.franja) > ahora));
  assert.ok(!franjas.some((f) => f.franja === "2026-11-12T09:00"));
});

// HU-02 - criterio 2
test("HU-02: una franja reservada aparece como no disponible", () => {
  const almacen = Citas.crearAlmacen();
  Citas.agendarCita(almacen, {
    medicoId: 1,
    franja: "2026-11-12T09:00",
    modalidad: "Presencial",
    paciente: "Ana",
  });
  const franjas = Citas.obtenerDisponibilidad(almacen, 1);
  const ocupada = franjas.find((f) => f.franja === "2026-11-12T09:00");
  assert.strictEqual(ocupada.disponible, false);
});

// HU-03 - criterio 1
test("HU-03: reserva virtual exitosa queda Confirmada con enlace", () => {
  const almacen = Citas.crearAlmacen();
  const r = Citas.agendarCita(almacen, {
    medicoId: 1,
    franja: "2026-11-12T10:30",
    modalidad: "Virtual",
    paciente: "Ana Torres",
  });
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.cita.estado, "Confirmada");
  assert.ok(r.cita.enlaceVideollamada);
  assert.ok(/^CIT-\d{4}$/.test(r.cita.codigo));
});

// HU-03 - criterio 2
test("HU-03: el segundo paciente no puede reservar la misma franja", () => {
  const almacen = Citas.crearAlmacen();
  const datos = {
    medicoId: 1,
    franja: "2026-11-12T11:30",
    modalidad: "Presencial",
  };
  const a = Citas.agendarCita(almacen, { ...datos, paciente: "Paciente A" });
  const b = Citas.agendarCita(almacen, { ...datos, paciente: "Paciente B" });
  assert.strictEqual(a.ok, true);
  assert.strictEqual(b.ok, false);
  assert.strictEqual(b.error, "La franja ya no está disponible");
  assert.ok(Array.isArray(b.alternativas));
  assert.strictEqual(almacen.citas.length, 1);
});

test("HU-03: se rechaza una modalidad inválida", () => {
  const almacen = Citas.crearAlmacen();
  const r = Citas.agendarCita(almacen, {
    medicoId: 1,
    franja: "2026-11-13T09:00",
    modalidad: "Telepática",
    paciente: "Ana",
  });
  assert.strictEqual(r.ok, false);
});
