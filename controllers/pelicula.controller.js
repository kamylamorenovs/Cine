import { peliculas } from '../data/datos.js';

class PeliculaController {
  listar() {
    return { status: 200, data: peliculas, message: 'Lista de películas' };
  }

  ver(id) {
    for (const item of peliculas) {
      if (item.id === Number(id)) {
        return { status: 200, data: item, message: 'Película encontrada' };
      }
    }
    // El for terminó sin coincidencias: el id no existe
    return { status: 404, data: null, message: `No se encontró la película con id ${id}` };
  }

  agregar(datos = {}) {
    if (!datos.titulo || !datos.genero || !datos.duracion || !datos.fechaEstreno) {
      return { status: 400, data: null, message: 'Faltan datos: titulo, genero, duracion, fechaEstreno' };
    }
    const id = peliculas.length > 0 ? peliculas[peliculas.length - 1].id + 1 : 1;
    const nuevo = { id, ...datos };
    peliculas.push(nuevo);
    return { status: 201, data: nuevo, message: 'Película creada correctamente' };
  }

  editar(id, datos = {}) {
    for (const item of peliculas) {
      if (item.id === Number(id)) {
        delete datos.id;
        Object.assign(item, datos);
        return { status: 200, data: item, message: 'Película actualizada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la película con id ${id}` };
  }

  eliminar(id) {
    for (let i = 0; i < peliculas.length; i++) {
      if (peliculas[i].id === Number(id)) {
        const [borrado] = peliculas.splice(i, 1);
        return { status: 200, data: borrado, message: 'Película eliminada correctamente' };
      }
    }
    return { status: 404, data: null, message: `No se encontró la película con id ${id}` };
  }

  // Últimas 5 películas según la fecha de estreno (la más reciente primero)
  ultimas() {
    const ordenadas = [...peliculas].sort((a, b) => new Date(b.fechaEstreno) - new Date(a.fechaEstreno));
    return { status: 200, data: ordenadas.slice(0, 5), message: 'Últimas 5 películas por fecha de estreno' };
  }
}

export default new PeliculaController();
