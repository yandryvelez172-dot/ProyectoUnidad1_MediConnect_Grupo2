# MediConnect - Sistema de Gestión de Citas Médicas y Telemedicina

Proyecto de Unidad 1 - Ingeniería de Software - **Grupo 2**
Universidad de las Fuerzas Armadas ESPE
Docente: Dra. Eleana Jerez Villota

## Caso asignado

**MediConnect**: plataforma para clínicas y centros médicos de consulta externa.

- Alcance base: búsqueda de médicos por especialidad, visualización de disponibilidad, agendamiento de citas presenciales o virtuales, confirmación de cita, recordatorios por correo, consulta de próximas citas y ficha médica básica.
- Solicitud de cambio (Actividad 4): reprogramación automática cuando el médico registre una emergencia o indisponibilidad.

## Integrantes

| Integrante | Rol en el proyecto |
|---|---|
| Mateo Nicolás Soto Mejía | Parte conceptual y cierre del informe |
| Vicky [apellidos] | Marco teórico y conclusiones |
| Roberto Carlos Quishpe Quilca | Requisitos y análisis de ingeniería |
| Yandry Velez | Plataforma, infraestructura y control de versiones |
| Sofía [apellidos] | Unificación, trazabilidad y revisión final |

## Enlaces del proyecto

| Artefacto | Enlace |
|---|---|
| Jira (backlog, TEST, bugs y Change Request) | [PEGAR ENLACE] |
| Confluence (SRS) | [PEGAR ENLACE] |
| Figma (prototipo navegable) | [PEGAR ENLACE] |
| draw.io (diagrama de componentes) | [PEGAR ENLACE] |
| Repositorio GitHub | https://github.com/yandryvelez172-dot/ProyectoUnidad1_MediConnect_Grupo2 |

## Estructura del repositorio

```
/frontend            Interfaz de la maqueta (HTML y JavaScript)
/backend             Lógica de negocio y pruebas automáticas
  /src/citas.js      HU-01, HU-02 y HU-03
  /tests             Pruebas con el módulo node:test
/docs                Documentación
  /architecture      Diagrama de componentes (.drawio editable y PNG/PDF)
  /evidence          Evidencias de pruebas y bugs
/.github/workflows   Integración continua (GitHub Actions)
```

## Instrucciones de ejecución

Requisitos: Node.js 18 o superior (solo para las pruebas). La maqueta no necesita instalación.

**Ver la maqueta:** abrir `frontend/index.html` en el navegador (Chrome o Edge).

**Ejecutar las pruebas automáticas:**

```bash
npm test
```

**Validar la sintaxis:**

```bash
npm run check
```

## Historias de Usuario cubiertas por la maqueta

| Historia | Descripción |
|---|---|
| HU-01 | Búsqueda de médicos por especialidad |
| HU-02 | Visualización de disponibilidad |
| HU-03 | Agendamiento de cita presencial o virtual |

## Flujo de trabajo (Git)

- Rama principal: `main`. No se trabaja directamente sobre ella.
- Cada tarea se desarrolla en una rama `feature/<nombre-corto>`; las correcciones de defectos, en `fix/<nombre-corto>`.
- Todo cambio se integra a `main` mediante Pull Request, con la clave de Jira en el título (por ejemplo, `MEDI-7: ...`).
- Cada Pull Request ejecuta el workflow de GitHub Actions (`.github/workflows/ci.yml`), que valida la sintaxis y corre las pruebas.
- Más detalle en [docs/guia-de-contribucion.md](docs/guia-de-contribucion.md).
