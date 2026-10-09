#  Cine 

## Instalar y ejecutar
1. Instalar Node.js.
2. En la carpeta del proyecto: `npm i`
3. Ejecutar: `npx nodemon ./bin/www` (o `npm start`).
4. Abrir `http://localhost:3000`. Probar la API con Thunder Client.

Los datos viven en variables (`data/datos.js`) y se reinician al apagar el servidor.

## Estructura
- `routes/`: define las rutas y arma la respuesta HTTP.
- `controllers/`: clases con la lógica (no usan req ni res). cada entidad tiene su clase.
- `data/datos.js`: arreglos con los datos iniciales.
- `views/`: 5 vistas EJS (index, peliculas, salas, funciones, reservaciones).

## Endpoints (todos responden `{ data, message }`)
| Método | Ruta | Acción |
 GET | /peliculas/all, /salas/all, /funciones/all, /reservaciones/all, /tickets/all | Listar |
 GET | /{entidad}/:id | Ver por id |
 GET | /peliculas/ultimas | Últimas 5 películas por fecha de estreno |
 GET | /funciones/rango?desde=2026-10-01&hasta=2026-10-31 | Funciones en un rango de fechas |
 GET | /reservaciones/:id/tickets | Tickets de una reservación |
 POST | /{entidad}/create | Crear (datos en el body JSON) |
 PUT | /{entidad}/:id | Editar |
 DELETE | /{entidad}/:id | Eliminar |
 DELETE | /tickets/:id/reservacion | Quitar la relación ticket-reservación |

`{entidad}` = peliculas, salas, funciones, reservaciones o tickets.

## Campos (body JSON)
- Película: `titulo, genero, duracion, fechaEstreno`
- Sala: `nombre, capacidad, tipo`
- Función: `peliculaId, salaId, fecha, hora, precio`
- Reservación: `funcionId, cliente, cantidad`
- Ticket: `reservacionId, asiento, precio`

## Vistas
`/`, `/vistas/peliculas`, `/vistas/salas`, `/vistas/funciones`, `/vistas/reservaciones`
