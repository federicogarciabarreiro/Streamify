document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carousel-inner');
    const movieInfoContainer = document.getElementById('movie-info-container');
    const gotoUserButton = document.getElementById('goto-user-button');
    const logoutButton = document.getElementById('logout-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const filterInput = document.getElementById('filter-input');
    const applyFilterButton = document.getElementById('apply-filter-button');
    const clearFilterButton = document.getElementById('clear-filter-button');

    const username = localStorage.getItem('username');

    if (!username) {
        window.location.href = 'index.html';
    }

    //Coleccion de peliculas -> Prueba sin backend
    const moviesData = [
    {
        id: 1,
        title: 'Aventuras en el Espacio',
        type: 'Ciencia Ficción',
        description: 'Una emocionante aventura intergaláctica.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid1'
    },
    {
        id: 2,
        title: 'El Misterio del Tiempo',
        type: 'Misterio',
        description: 'Viajes en el tiempo y secretos por descubrir.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid2'
    },
    {
        id: 3,
        title: 'Risas en la Ciudad',
        type: 'Comedia',
        description: 'Divertidas situaciones en la vida urbana.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid3'
    },
    {
        id: 4,
        title: 'El Misterio del Bosque Encantado',
        type: 'Fantasía',
        description: 'Criaturas mágicas y un bosque lleno de secretos.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid4'
    },
    {
        id: 5,
        title: 'Intriga en la Montaña',
        type: 'Suspense',
        description: 'Una historia llena de giros y suspense en la montaña.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid5'
    },
    {
        id: 6,
        title: 'Amor en París',
        type: 'Romance',
        description: 'Una historia romántica ambientada en la hermosa ciudad de París.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid6'
    },
    {
        id: 7,
        title: 'El Último Guerrero',
        type: 'Acción',
        description: 'Épicas batallas y un héroe destinado a cambiar el destino.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid7'
    },
    {
        id: 8,
        title: 'Rumores en el Pueblo',
        type: 'Drama',
        description: 'Secretos y conflictos en un pequeño pueblo.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid8'
    },
    {
        id: 9,
        title: 'Desafío en el Desierto',
        type: 'Aventura',
        description: 'Una travesía llena de desafíos en el vasto desierto.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid9'
    },
    {
        id: 10,
        title: 'La Isla Perdida',
        type: 'Aventura',
        description: 'Exploración y misterios en una isla remota.',
        image: 'https://via.placeholder.com/200x300',
        videoUrl: 'https://www.youtube.com/watch?v=videoid10'
    }];

    let currentIndex = 0;
    var filteredMovies = moviesData;
    loadMovies(filteredMovies);
    updateArrowVisibility();

    //Sistema de botones

    prevButton.addEventListener('click', function () {
        scrollCarousel(-1);
    });

    nextButton.addEventListener('click', function () {
        scrollCarousel(1);
    });

    gotoUserButton.addEventListener('click', function () {
        window.location.href = 'user.html';
    });

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });

    applyFilterButton.addEventListener('click', function () {  
        var searchValue = filterInput.value;
        filteredMovies = filterMovies(moviesData, searchValue);
        currentIndex = 0;
        loadMovies(filteredMovies);
        updateArrowVisibility();
    });
    
    clearFilterButton.addEventListener('click', function () {
        filterInput.value = "";
        var searchValue = filterInput.value;
        filteredMovies = filterMovies(moviesData, searchValue);
        currentIndex = 0;
        loadMovies(filteredMovies);
        updateArrowVisibility();
    });

    //Funciones auxiliares

    function loadMovies(movies) {
        renderMovies(movies);
    }

    function renderMovies(movies) {
        //Limpiar el carrusel
        carouselInner.innerHTML = '';
    
        //Tomar solo las primeras 5 películas
        const moviesToShow = movies.slice(0, 5);
    
        //Renderizar las películas en el carrusel
        moviesToShow.forEach(movie => {
            const card = createMovieCard(movie);
            carouselInner.appendChild(card);
        });
    }
    
    //Sistema de tarjetas
    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.movieId = movie.id;

        const image = document.createElement('img');
        image.src = movie.image;
        image.alt = movie.title;
        card.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = movie.title;
        card.appendChild(title);

        card.addEventListener('click', function () {
            showMovieInfo(movie);
        });

        return card;
    }

    function showMovieInfo(movie) {
        movieInfoContainer.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Tipo:</strong> ${movie.type}</p>
            <p><strong>Descripción:</strong> ${movie.description}</p>
            <button id="play-button" onclick="playMovie('${movie.videoUrl}')">Reproducir</button>
        `;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.classList.remove('active');
        });

        const currentCard = document.querySelector(`.card[data-movie-id="${movie.id}"]`);
        currentCard.classList.add('active');

        movieInfoContainer.style.display = 'block';
    }

    window.playMovie = function (videoUrl) {

        //Redirigir a la página de reproducción con el enlace del video
        window.location.href = `playback.html?videoUrl=${encodeURIComponent(videoUrl)}`;
    }
    

    //Sistema de carrusel
    function scrollCarousel(direction) {
        currentIndex += direction;
    
        if (currentIndex < 0) {
            currentIndex = filteredMovies.length - 1;
        } else if (currentIndex >= filteredMovies.length) {
            currentIndex = 0;
        }
    
        //Mueve las películas para reflejar el índice actual
        filteredMovies = filteredMovies.slice(currentIndex).concat(filteredMovies.slice(0, currentIndex));
        loadMovies(filteredMovies);
        updateArrowVisibility();
    }
    
    //Activar y desactivar flechas del carrusel
    function updateArrowVisibility() {
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = filteredMovies.length <= 5 || currentIndex === filteredMovies.length - 5 ? 'none' : 'block';
    }    
     
    //Retorna coleccion filtrada
    function filterMovies(movies, searchTerm) {
        return movies.filter(movie => {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }
});