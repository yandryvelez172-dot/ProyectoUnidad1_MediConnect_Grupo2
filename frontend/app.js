/* Interfaz de la maqueta MediConnect (HU-01, HU-02, HU-03). */
(function () {
  "use strict";

  const almacen = Citas.crearAlmacen();
  const estado = { medico: null, franja: null };

  const $ = (id) => document.getElementById(id);
  const selEsp = $("especialidad");
  const resBusqueda = $("resultado-busqueda");
  const franjasDiv = $("franjas");
  const medicoTxt = $("medico-elegido");
  const btnAgendar = $("btn-agendar");
  const resAgenda = $("resultado-agenda");

  function mensaje(contenedor, tipo, texto) {
    contenedor.innerHTML = "";
    const div = document.createElement("div");
    div.className = "msg " + tipo;
    div.textContent = texto;
    contenedor.appendChild(div);
  }

  function formatearFranja(f) {
    const d = new Date(f);
    return d.toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" });
  }

  // Especialidades
  Citas.ESPECIALIDADES.forEach((e) => {
    const o = document.createElement("option");
    o.textContent = e;
    selEsp.appendChild(o);
  });

  // HU-01
  $("btn-buscar").addEventListener("click", () => {
    estado.medico = null;
    estado.franja = null;
    franjasDiv.innerHTML = "";
    btnAgendar.disabled = true;
    medicoTxt.textContent = "Elija un médico en el paso 1.";

    const r = Citas.buscarMedicos(selEsp.value);
    resBusqueda.innerHTML = "";

    if (r.medicos.length === 0) {
      let texto = r.mensaje;
      if (r.sugerencias.length) {
        texto += ". Especialidades relacionadas: " + r.sugerencias.join(", ");
      }
      mensaje(resBusqueda, "error", texto);
      return;
    }

    const ul = document.createElement("ul");
    r.medicos.forEach((m) => {
      const li = document.createElement("li");
      li.className = "medico";
      li.innerHTML =
        '<div class="foto"></div><div><strong></strong><br><span class="tag"></span></div>';
      li.querySelector(".foto").textContent = m.foto;
      li.querySelector("strong").textContent = m.nombre;
      li.querySelector(".tag").textContent = m.especialidad;
      const btn = document.createElement("button");
      btn.textContent = "Ver horarios";
      btn.style.marginLeft = "auto";
      btn.addEventListener("click", () => elegirMedico(m));
      li.appendChild(btn);
      ul.appendChild(li);
    });
    resBusqueda.appendChild(ul);
  });

  // HU-02
  function elegirMedico(m) {
    estado.medico = m;
    estado.franja = null;
    btnAgendar.disabled = true;
    resAgenda.innerHTML = "";
    medicoTxt.textContent = "Horarios de " + m.nombre;
    pintarFranjas();
  }

  function pintarFranjas() {
    franjasDiv.innerHTML = "";
    const franjas = Citas.obtenerDisponibilidad(almacen, estado.medico.id);
    if (franjas.length === 0) {
      mensaje(franjasDiv, "info", "Este médico no tiene franjas futuras.");
      return;
    }
    franjas.forEach((f) => {
      const b = document.createElement("button");
      b.textContent = formatearFranja(f.franja);
      b.disabled = !f.disponible; // estado deshabilitado (HU-02, criterio 2)
      if (!f.disponible) b.title = "Franja ocupada";
      if (estado.franja === f.franja) b.classList.add("sel");
      b.addEventListener("click", () => {
        estado.franja = f.franja;
        btnAgendar.disabled = false;
        pintarFranjas();
      });
      franjasDiv.appendChild(b);
    });
  }

  // HU-03
  btnAgendar.addEventListener("click", () => {
    const r = Citas.agendarCita(almacen, {
      medicoId: estado.medico.id,
      franja: estado.franja,
      modalidad: $("modalidad").value,
      paciente: $("paciente").value,
    });

    if (!r.ok) {
      let texto = r.error;
      if (r.alternativas && r.alternativas.length) {
        texto += ". Alternativas: " + r.alternativas.map(formatearFranja).join(" | ");
      }
      mensaje(resAgenda, "error", texto);
      pintarFranjas();
      return;
    }

    const c = r.cita;
    let texto =
      "Cita " + c.estado + " (" + c.codigo + "): " + formatearFranja(c.franja) +
      ", modalidad " + c.modalidad + ".";
    if (c.enlaceVideollamada) texto += " Videollamada: " + c.enlaceVideollamada;
    mensaje(resAgenda, "ok", texto);
    estado.franja = null;
    btnAgendar.disabled = true;
    pintarFranjas();
  });
})();
