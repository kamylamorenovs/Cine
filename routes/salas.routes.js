import { Router } from 'express';
import SalaController from '../controllers/sala.controller.js';

const router = Router();

router.get('/all', (req, res) => {
  const response = SalaController.listar();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id', (req, res) => {
  const response = SalaController.ver(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.post('/create', (req, res) => {
  const response = SalaController.agregar(req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.put('/:id', (req, res) => {
  const response = SalaController.editar(req.params.id, req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id', (req, res) => {
  const response = SalaController.eliminar(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

export default router;
