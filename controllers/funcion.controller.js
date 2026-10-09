import { funciones, peliculas, salas } from '../data/datos.js';

class FuncionController {
  // Revisa que los datos relacionados existan
  revisarRelaciones(datos) {
    if (datos.peliculaId !== undefined && datos.peliculaId !== null && !peliculas.some((x) => x.id === Number(datos.peliculaId))) {
      return 'La película indicada no existe';
    }
    if (datos.salaId !== undefined && datos.salaId !== null && !salas.some((x) => x.id === Number(datos.salaId))) {
      return 'La sala indicada no existe';
    }
    return null;
  }

  listar() {
    return { status: 200, data: funciones, message: 'Lista de funciones' };
  }

  ver(id) {
    for (const item of funciones) {
      if (item.id === Number(id)) {
        return { status: 200, data: item, message: 'Función encontrada' };
      }
    }
    // El for terminó sin coincidencias: el id no existe
    return { status: 404, data: null, message: `No se encontró la función con id ${id}` };
  }

  agregar(datos = {}) {
    if (!datos.peliculaId || !datos.salaId || !datos.fecha || !datos.hora || !datos.precio) {
      return { status: 400, data: null, message: 'Faltan datos: peliculaId, salaId, fecha, hora, precio' };
    }
    const error = this.revisarRelaciones(datos);
    if (error) {
      return { status: 400, data: null, message: error };
    }
    const id = funciones.length > 0 ? funciones[funciones.length - 1].id + 1 : 1;
    const nuevo = { id, ...datos };
    funciones.push(nuevo);
    return { status: 201, data: nuevo, message: 'Función creada correctamente' };
  }

  editar(id, datos = {}) {
    for (const item of funciones) {
      if (item.id === Number(id)) {
        const error = this.revisarRelaciones(datos);
        if (error) {
          return { status: 400, data: null, message: error };
        }
        delete datos.id;
        Object.assign(item, datos);
        return { status: 200, data: item, message: 'Función actualizada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la función con id ${id}` };
  }

  eliminar(id) {
    for (let i = 0; i < funciones.length; i++) {
      if (funciones[i].id === Number(id)) {
        const [borrado] = funciones.splice(i, 1);
        return { status: 200, data: borrado, message: 'Función eliminada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la función con id ${id}` };
  }

  // Función con los datos de su película y su sala
  armar(f) {
    return {
      ...f,
      pelicula: peliculas.find((p) => p.id === Number(f.peliculaId)) || null,
      sala: salas.find((s) => s.id === Number(f.salaId)) || null,
    };
  }

  detalle(id) {
    const response = this.ver(id);
    if (response.status !== 200) return response;
    return { status: 200, data: this.armar(response.data), message: 'Detalle de la función' };
  }

  listarDetalle() {
    return { status: 200, data: funciones.map((f) => this.armar(f)), message: 'Funciones con detalle' };
  }

  // Funciones entre dos fechas (formato AAAA-MM-DD)
  rango(desde, hasta) {
    if (!desde || !hasta) {
      return { status: 400, data: null, message: 'Debe enviar desde y hasta (AAAA-MM-DD)' };
    }
    const resultado = funciones.filter((f) => new Date(f.fecha) >= new Date(desde) && new Date(f.fecha) <= new Date(hasta));
    return { status: 200, data: resultado, message: `Funciones entre ${desde} y ${hasta}` };
  }
}

export default new FuncionController();
