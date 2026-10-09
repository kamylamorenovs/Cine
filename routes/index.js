import { Router } from 'express';
import { peliculas, salas, funciones, reservaciones, tickets } from '../data/datos.js';

const router = Router();

// Vistas (EJS)
router.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Cine',
    totales: {
      peliculas: peliculas.length,
      salas: salas.length,
      funciones: funciones.length,
      reservaciones: reservaciones.length,
      tickets: tickets.length,
    },
  });
});

router.get('/vistas/peliculas', (req, res) => {
  res.render('peliculas', { titulo: 'Películas', peliculas: peliculas });
});

router.get('/vistas/salas', (req, res) => {
  res.render('salas', { titulo: 'Salas', salas: salas });
});

router.get('/vistas/funciones', (req, res) => {
  res.render('funciones', { titulo: 'Funciones', funciones: funciones });
});

router.get('/vistas/reservaciones', (req, res) => {
  res.render('reservaciones', { titulo: 'Reservaciones', reservaciones: reservaciones });
});

export default router;
