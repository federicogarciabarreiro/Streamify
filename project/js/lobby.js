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

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) window.location.href = 'index.html';

    const db = firebase.firestore();
    const moviesRef = db.collection('movies');

    moviesRef.get().then(snapshot => {
        const moviesData = [];
        snapshot.forEach(doc => {
            const movie = doc.data();
            moviesData.push(movie);
        });

        let currentIndex = 0;
        let filteredMovies = moviesData;
        loadMovies(filteredMovies);
        updateArrowVisibility();


    // Sistema de botones
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
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    applyFilterButton.addEventListener('click', function () {
        const searchTerm = filterInput.value.trim().toLowerCase();
        filteredMovies = filterMovies(moviesData, searchTerm);
        currentIndex = 0;
        loadMovies(filteredMovies);
        closeMovieInfo();
        updateArrowVisibility();
    });

    clearFilterButton.addEventListener('click', function () {
        filterInput.value = "";
        filteredMovies = moviesData;
        currentIndex = 0;
        loadMovies(filteredMovies);
        closeMovieInfo();
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

    function closeMovieInfo() {
        movieInfoContainer.style.display = 'none';
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

    }).catch(error => {
        console.error('Error al obtener datos de la colección:', error);
    });

});