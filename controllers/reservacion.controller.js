import { reservaciones, funciones, tickets } from '../data/datos.js';

class ReservacionController {
  // Revisa que los datos relacionados existan
  revisarRelaciones(datos) {
    if (datos.funcionId !== undefined && datos.funcionId !== null && !funciones.some((x) => x.id === Number(datos.funcionId))) {
      return 'La función indicada no existe';
    }
    return null;
  }

  listar() {
    return { status: 200, data: reservaciones, message: 'Lista de reservaciones' };
  }

  ver(id) {
    for (const item of reservaciones) {
      if (item.id === Number(id)) {
        return { status: 200, data: item, message: 'Reservación encontrada' };
      }
    }
    // El for terminó sin coincidencias: el id no existe
    return { status: 404, data: null, message: `No se encontró la reservación con id ${id}` };
  }

  agregar(datos = {}) {
    if (!datos.funcionId || !datos.cliente || !datos.cantidad) {
      return { status: 400, data: null, message: 'Faltan datos: funcionId, cliente, cantidad' };
    }
    const error = this.revisarRelaciones(datos);
    if (error) {
      return { status: 400, data: null, message: error };
    }
    const id = reservaciones.length > 0 ? reservaciones[reservaciones.length - 1].id + 1 : 1;
    const nuevo = { id, ...datos };
    reservaciones.push(nuevo);
    return { status: 201, data: nuevo, message: 'Reservación creada correctamente' };
  }

  editar(id, datos = {}) {
    for (const item of reservaciones) {
      if (item.id === Number(id)) {
        const error = this.revisarRelaciones(datos);
        if (error) {
          return { status: 400, data: null, message: error };
        }
        delete datos.id;
        Object.assign(item, datos);
        return { status: 200, data: item, message: 'Reservación actualizada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la reservación con id ${id}` };
  }

  eliminar(id) {
    for (let i = 0; i < reservaciones.length; i++) {
      if (reservaciones[i].id === Number(id)) {
        const [borrado] = reservaciones.splice(i, 1);
        return { status: 200, data: borrado, message: 'Reservación eliminada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la reservación con id ${id}` };
  }

  // Reservaciones junto con sus tickets
  listarDetalle() {
    const resultado = reservaciones.map((r) => ({ ...r, tickets: tickets.filter((t) => t.reservacionId === r.id) }));
    return { status: 200, data: resultado, message: 'Reservaciones con sus tickets' };
  }

  ticketsDe(id) {
    const response = this.ver(id);
    if (response.status !== 200) return response;
    const resultado = tickets.filter((t) => t.reservacionId === response.data.id);
    return { status: 200, data: resultado, message: `Tickets de la reservación ${id}` };
  }
}

export default new ReservacionController();
