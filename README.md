# MediConnect - Sistema de Gestión de Citas Médicas y Telemedicina

Proyecto Unidad 1 - Grupo 2\
Universidad de las Fuerzas Armadas ESPE\
Asignatura: Modelos de Procesos de Desarrollo de SOFTWARE \
Docente: Dra. Eleana Jerez Villota

## Caso asignado

**MediConnect**: plataforma para clínicas y centros médicos de consulta externa.

- Alcance base: búsqueda de médicos por especialidad, visualización de disponibilidad, agendamiento de citas presenciales o virtuales, confirmación de cita, recordatorios por correo, consulta de próximas citas y ficha médica básica.
- Solicitud de cambio (Actividad 4): reprogramación automática cuando el médico registre una emergencia o indisponibilidad.

## Integrantes

| Integrante | Rol en el proyecto |
|---|---|
| Mateo Soto | Parte conceptual y cierre del informe |
| Victoria Farinango | Marco teórico y conclusiones |
| Roberto Quishpe | Requisitos y Product Backlog |
| Yandry Velez | Plataforma, infraestructura y control de versiones |
| Sofía | Unificación, trazabilidad y revisión final |

## Enlaces del proyecto

- Jira: https://espe-team-qf10cei6.atlassian.net/jira/software/projects/MEDI/boards/35/backlog
- Confluence (SRS): https://espe-team-qf10cei6.atlassian.net/wiki/x/sgB7AQ
- Figma (prototipo navegable): https://www.figma.com/design/v9KhRjs2lcXZOKU7s3jv4c/Sin-t%C3%ADtulo?node-id=0-1&t=D39hFdfEPzyb8LEz-1
- Draw.io (Diagrama de Componentes UML): https://drive.google.com/file/d/10N8OpPBqvSVYA1h2CJ7cJ3HfU3dHaki3/view?usp=sharing
  <br>**Nota:** Se debe "Abrir con" draw.io
- Repositorio GitHub: https://github.com/yandryvelez172-dot/ProyectoUnidad1_MediConnect_Grupo2

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
