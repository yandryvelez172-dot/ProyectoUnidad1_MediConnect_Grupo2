/**
 * MediConnect - Lógica base de citas (maqueta funcional)
 * Cubre las historias:
 *   HU-01  Búsqueda de médicos por especialidad
 *   HU-02  Visualización de disponibilidad
 *   HU-03  Agendamiento de cita presencial o virtual
 *
 * El módulo funciona en Node.js (pruebas y CI) y en el navegador (frontend).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Citas = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const ESPECIALIDADES = ["Cardiología", "Pediatría", "Dermatología", "Neurología"];

  const RELACIONADAS = {
    "Cardiología": ["Neurología"],
    "Pediatría": ["Dermatología"],
    "Dermatología": ["Pediatría"],
    "Neurología": ["Cardiología"],
  };

  const MEDICOS = [
    { id: 1, nombre: "Dr. Andrés Pérez", especialidad: "Cardiología", activo: true, foto: "AP" },
    { id: 2, nombre: "Dra. Lucía Mena", especialidad: "Cardiología", activo: true, foto: "LM" },
    { id: 3, nombre: "Dr. Carlos Rivas", especialidad: "Cardiología", activo: false, foto: "CR" },
    { id: 4, nombre: "Dra. Paula Salazar", especialidad: "Pediatría", activo: true, foto: "PS" },
    { id: 5, nombre: "Dr. Mateo Ortiz", especialidad: "Dermatología", activo: true, foto: "MO" },
    { id: 6, nombre: "Dra. Elena Vaca", especialidad: "Neurología", activo: false, foto: "EV" },
  ];

  // Franjas por médico (inicio de la hora, formato AAAA-MM-DDTHH:mm)
  const AGENDAS = {
    1: ["2026-11-12T09:00", "2026-11-12T10:30", "2026-11-12T11:30", "2026-11-13T09:00"],
    2: ["2026-11-12T08:00", "2026-11-12T15:00"],
    4: ["2026-11-14T10:00", "2026-11-14T11:00"],
    5: ["2026-11-15T16:00"],
  };

  /** Estado mutable de reservas: { "medicoId|franja": citaId } */
  function crearAlmacen() {
    return { reservas: {}, citas: [], siguienteId: 1 };
  }

  /** HU-01: busca médicos activos por especialidad. */
  function buscarMedicos(especialidad) {
    const resultados = MEDICOS.filter(
      (m) => m.activo && m.especialidad === especialidad
    ).map(({ nombre, especialidad: esp, foto, id }) => ({ id, nombre, especialidad: esp, foto }));

    if (resultados.length === 0) {
      return {
        medicos: [],
        mensaje: "No hay médicos disponibles para esta especialidad",
        sugerencias: RELACIONADAS[especialidad] || [],
      };
    }
    return { medicos: resultados, mensaje: null, sugerencias: [] };
  }

  /** HU-02: devuelve franjas futuras con su estado (disponible / ocupada). */
  function obtenerDisponibilidad(almacen, medicoId, ahora) {
    const referencia = ahora || new Date("2026-11-01T00:00");
    const franjas = AGENDAS[medicoId] || [];
    return franjas
      .filter((f) => new Date(f) > referencia)
      .map((f) => ({
        franja: f,
        disponible: !almacen.reservas[medicoId + "|" + f],
      }));
  }

  /** HU-03: agenda una cita presencial o virtual. */
  function agendarCita(almacen, { medicoId, franja, modalidad, paciente }) {
    if (!["Presencial", "Virtual"].includes(modalidad)) {
      return { ok: false, error: "Modalidad no válida" };
    }
    if (!paciente || !paciente.trim()) {
      return { ok: false, error: "Debe indicar el nombre del paciente" };
    }
    const disponibles = obtenerDisponibilidad(almacen, medicoId);
    const objetivo = disponibles.find((d) => d.franja === franja);
    if (!objetivo) {
      return { ok: false, error: "La franja no existe para este médico" };
    }
    if (!objetivo.disponible) {
      const alternativas = disponibles.filter((d) => d.disponible).map((d) => d.franja);
      return { ok: false, error: "La franja ya no está disponible", alternativas };
    }

    const id = almacen.siguienteId++;
    const cita = {
      id,
      codigo: "CIT-" + String(id).padStart(4, "0"),
      medicoId,
      franja,
      modalidad,
      paciente: paciente.trim(),
      estado: "Confirmada",
      enlaceVideollamada:
        modalidad === "Virtual" ? "https://meet.mediconnect.example/" + id : null,
    };
    almacen.reservas[medicoId + "|" + franja] = id;
    almacen.citas.push(cita);
    return { ok: true, cita };
  }

  return {
    ESPECIALIDADES,
    MEDICOS,
    crearAlmacen,
    buscarMedicos,
    obtenerDisponibilidad,
    agendarCita,
  };
});
