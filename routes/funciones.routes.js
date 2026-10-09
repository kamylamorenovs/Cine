import { Router } from 'express';
import FuncionController from '../controllers/funcion.controller.js';

const router = Router();

router.get('/all', (req, res) => {
  const response = FuncionController.listar();
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/rango', (req, res) => {
  const response = FuncionController.rango(req.query.desde, req.query.hasta);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id/detalle', (req, res) => {
  const response = FuncionController.detalle(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.get('/:id', (req, res) => {
  const response = FuncionController.ver(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.post('/create', (req, res) => {
  const response = FuncionController.agregar(req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.put('/:id', (req, res) => {
  const response = FuncionController.editar(req.params.id, req.body);
  res.status(response.status).json({ data: response.data, message: response.message });
});

router.delete('/:id', (req, res) => {
  const response = FuncionController.eliminar(req.params.id);
  res.status(response.status).json({ data: response.data, message: response.message });
});

export default router;
