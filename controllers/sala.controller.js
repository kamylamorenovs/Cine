import { salas } from '../data/datos.js';

class SalaController {
  listar() {
    return { status: 200, data: salas, message: 'Lista de salas' };
  }

  ver(id) {
    for (const item of salas) {
      if (item.id === Number(id)) {
        return { status: 200, data: item, message: 'Sala encontrada' };
      }
    }
    // El for terminó sin coincidencias: el id no existe
    return { status: 404, data: null, message: `No se encontró la sala con id ${id}` };
  }

  agregar(datos = {}) {
    if (!datos.nombre || !datos.capacidad || !datos.tipo) {
      return { status: 400, data: null, message: 'Faltan datos: nombre, capacidad, tipo' };
    }
    const id = salas.length > 0 ? salas[salas.length - 1].id + 1 : 1;
    const nuevo = { id, ...datos };
    salas.push(nuevo);
    return { status: 201, data: nuevo, message: 'Sala creada correctamente' };
  }

  editar(id, datos = {}) {
    for (const item of salas) {
      if (item.id === Number(id)) {
        delete datos.id;
        Object.assign(item, datos);
        return { status: 200, data: item, message: 'Sala actualizada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la sala con id ${id}` };
  }

  eliminar(id) {
    for (let i = 0; i < salas.length; i++) {
      if (salas[i].id === Number(id)) {
        const [borrado] = salas.splice(i, 1);
        return { status: 200, data: borrado, message: 'Sala eliminada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la sala con id ${id}` };
  }
}

export default new SalaController();
