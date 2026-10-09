// Datos guardados en variables (arreglos). Se reinician al apagar el servidor.
export const peliculas = [
  { id: 1, titulo: 'Interestelar', genero: 'Ciencia ficción', duracion: 169, fechaEstreno: '2014-11-07' },
  { id: 2, titulo: 'Coco', genero: 'Animación', duracion: 105, fechaEstreno: '2017-11-22' },
  { id: 3, titulo: 'Oppenheimer', genero: 'Drama', duracion: 180, fechaEstreno: '2023-07-21' },
  { id: 4, titulo: 'Spider-Man: Un nuevo universo', genero: 'Animación', duracion: 117, fechaEstreno: '2018-12-14' },
  { id: 5, titulo: 'Mad Max: Furia en el camino', genero: 'Acción', duracion: 120, fechaEstreno: '2015-05-15' },
  { id: 6, titulo: 'Parásitos', genero: 'Suspenso', duracion: 132, fechaEstreno: '2019-05-30' },
  { id: 7, titulo: 'Dune: Parte dos', genero: 'Ciencia ficción', duracion: 166, fechaEstreno: '2024-03-01' },
  { id: 8, titulo: 'Intensamente 2', genero: 'Animación', duracion: 96, fechaEstreno: '2024-06-14' },
];

export const salas = [
  { id: 1, nombre: 'Sala 1', capacidad: 80, tipo: '2D' },
  { id: 2, nombre: 'Sala VIP', capacidad: 30, tipo: '3D' },
];

export const funciones = [
  { id: 1, peliculaId: 1, salaId: 1, fecha: '2026-10-20', hora: '18:00', precio: 8 },
  { id: 2, peliculaId: 2, salaId: 2, fecha: '2026-10-22', hora: '15:30', precio: 10 },
];

export const reservaciones = [
  { id: 1, funcionId: 1, cliente: 'Ana Pérez', cantidad: 2 },
];

export const tickets = [
  { id: 1, reservacionId: 1, asiento: 'A1', precio: 8 },
  { id: 2, reservacionId: 1, asiento: 'A2', precio: 8 },
];

// Revisa si existe un elemento con ese id en una lista (sirve para relacionar entidades)
export function existe(lista, id) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      return true;
    }
  }
  return false;
}
