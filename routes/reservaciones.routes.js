import { Router } from 'express';
import ReservacionController from '../controllers/reservacion.controller.js';

const router = Router();

router.get('/all', (req, res) => {
  const response = ReservacionController.listar();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id/tickets', (req, res) => {
  const response = ReservacionController.ticketsDe(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id', (req, res) => {
  const response = ReservacionController.ver(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.post('/create', (req, res) => {
  const response = ReservacionController.agregar(req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.put('/:id', (req, res) => {
  const response = ReservacionController.editar(req.params.id, req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id', (req, res) => {
  const response = ReservacionController.eliminar(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

export default router;
