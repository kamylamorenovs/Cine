import { tickets, reservaciones } from '../data/datos.js';

class TicketController {
  // Revisa que los datos relacionados existan
  revisarRelaciones(datos) {
    if (datos.reservacionId !== undefined && datos.reservacionId !== null && !reservaciones.some((x) => x.id === Number(datos.reservacionId))) {
      return 'La reservación indicada no existe';
    }
    return null;
  }

  listar() {
    return { status: 200, data: tickets, message: 'Lista de tickets' };
  }

  ver(id) {
    for (const item of tickets) {
      if (item.id === Number(id)) {
        return { status: 200, data: item, message: 'Ticket encontrado' };
      }
    }
    // El for terminó sin coincidencias: el id no existe
    return { status: 404, data: null, message: `No se encontró el ticket con id ${id}` };
  }

  agregar(datos = {}) {
    if (!datos.reservacionId || !datos.asiento || !datos.precio) {
      return { status: 400, data: null, message: 'Faltan datos: reservacionId, asiento, precio' };
    }
    const error = this.revisarRelaciones(datos);
    if (error) {
      return { status: 400, data: null, message: error };
    }
    const id = tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1;
    const nuevo = { id, ...datos };
    tickets.push(nuevo);
    return { status: 201, data: nuevo, message: 'Ticket creado correctamente' };
  }

  editar(id, datos = {}) {
    for (const item of tickets) {
      if (item.id === Number(id)) {
        const error = this.revisarRelaciones(datos);
        if (error) {
          return { status: 400, data: null, message: error };
        }
        delete datos.id;
        Object.assign(item, datos);
        return { status: 200, data: item, message: 'Ticket actualizado correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró el ticket con id ${id}` };
  }

  eliminar(id) {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id === Number(id)) {
        const [borrado] = tickets.splice(i, 1);
        return { status: 200, data: borrado, message: 'Ticket eliminado correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró el ticket con id ${id}` };
  }

  // Elimina la relación ticket-reservación sin borrar el ticket
  quitarReservacion(id) {
    for (const ticket of tickets) {
      if (ticket.id === Number(id)) {
        ticket.reservacionId = null;
        return { status: 200, data: ticket, message: 'Relación con la reservación eliminada' };
      }
    }
    return { status: 404, data: null, message: `No se encontró el ticket con id ${id}` };
  }
}

export default new TicketController();
