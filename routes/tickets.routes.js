import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';

const router = Router();

router.get('/all', (req, res) => {
  const response = TicketController.listar();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id', (req, res) => {
  const response = TicketController.ver(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.post('/create', (req, res) => {
  const response = TicketController.agregar(req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.put('/:id', (req, res) => {
  const response = TicketController.editar(req.params.id, req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id/reservacion', (req, res) => {
  const response = TicketController.quitarReservacion(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id', (req, res) => {
  const response = TicketController.eliminar(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

export default router;
