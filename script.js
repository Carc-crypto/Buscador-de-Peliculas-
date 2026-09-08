const API_KEY = '69c6c0176365d47bff7b9db6c3d7d487';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-MX`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


const contenedor = document.getElementById('contenedor-peliculas');
const formulario = document.getElementById('formulario');
const busqueda = document.getElementById('busqueda');

async function obtenerPeliculas(url) {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        if(datos.success === false) {
            console.error("Error de TMDB:", datos.status_message);
            return;
        }

        mostrarPeliculas(datos.results);
    } catch (error) {
        console.error("Hubo un error al traer las películas:", error);
    }
}


function mostrarPeliculas(peliculas) {
    contenedor.innerHTML = '';

    peliculas.forEach((pelicula) => {
        const { title, poster_path, vote_average, overview } = pelicula;

        
        if (!poster_path) return;

        
        const urlImagenCompleta = IMG_PATH + poster_path;

        const tarjetaPelicula = document.createElement('div');
        tarjetaPelicula.classList.add('pelicula-tarjeta');

        tarjetaPelicula.innerHTML = `
            <img src="${urlImagenCompleta}" alt="${title}">
            <div class="pelicula-info">
                <h3>${title}</h3>
                <span class="nota">${vote_average.toFixed(1)}</span>
            </div>
            <div class="resumen">
                <h3>Sinopsis</h3>
                <p>${overview ? overview : 'No hay sinopsis disponible.'}</p>
            </div>
        `;

        contenedor.appendChild(tarjetaPelicula);
    });
}


obtenerPeliculas(API_URL);
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const terminoBusqueda = busqueda.value; 
    
    if (terminoBusqueda && terminoBusqueda !== '') {
       
        obtenerPeliculas(SEARCH_API + terminoBusqueda);
        busqueda.value = ''; 
    } else {
       
        window.location.reload();
    }
});

