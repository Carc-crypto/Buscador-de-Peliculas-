(function() {
    const infoDispositivo = navigator.userAgent.toLowerCase();
    
    const esMovil = /iphone|ipad|ipod|android|blackberry|mini|windows phone/i.test(infoDispositivo);

   
    if (esMovil) {
        window.location.href = "./movil/index.html";
    }
})();



const API_KEY = '69c6c0176365d47bff7b9db6c3d7d487';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es-MX`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';


const contenedor = document.getElementById('contenedor-peliculas');
const formulario = document.getElementById('formulario');
const busqueda = document.getElementById('busqueda');


const modal = document.getElementById('modal-pelicula');
const cerrarModal = document.querySelector('.cerrar-modal');
const modalPoster = document.getElementById('modal-poster');
const modalTitulo = document.getElementById('modal-titulo');
const modalFecha = document.getElementById('modal-fecha').querySelector('span');
const modalNota = document.getElementById('modal-nota').querySelector('span');
const modalSinopsis = document.getElementById('modal-sinopsis');


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

        
        tarjetaPelicula.addEventListener('click', () => {
            modalPoster.src = urlImagenCompleta;
            modalTitulo.innerText = title;
            modalFecha.innerText = pelicula.release_date ? pelicula.release_date : 'No disponible';
            modalNota.innerText = vote_average.toFixed(1);
            modalSinopsis.innerText = overview ? overview : 'No hay sinopsis disponible.';
            
           
            document.getElementById('modal-pelicula').style.display = 'block';
        });

        
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
cerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});




