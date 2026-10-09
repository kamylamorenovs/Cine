import { Router } from 'express';
import PeliculaController from '../controllers/pelicula.controller.js';

const router = Router();

router.get('/all', (req, res) => {
  const response = PeliculaController.listar();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/ultimas', (req, res) => {
  const response = PeliculaController.ultimas();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id', (req, res) => {
  const response = PeliculaController.ver(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.post('/create', (req, res) => {
  const response = PeliculaController.agregar(req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.put('/:id', (req, res) => {
  const response = PeliculaController.editar(req.params.id, req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id', (req, res) => {
  const response = PeliculaController.eliminar(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

export default router;
