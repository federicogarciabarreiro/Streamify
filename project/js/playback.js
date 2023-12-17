document.addEventListener('DOMContentLoaded', function () {
    const videoPlayer = document.getElementById('movie-player');
    const backToLobbyButton = document.getElementById('back-to-lobby');

    //Obtener nombre de usuario desde almacenamiento
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'index.html';
    }

    //Obtener el enlace del video de la URL
    const params = new URLSearchParams(window.location.search);
    const videoUrl = params.get('videoUrl');

    if (!videoUrl) {
        //Si no se proporciona un enlace de video, redirige al lobby
        window.location.href = 'lobby.html';
    }

    //Configurar el origen del video
    videoPlayer.src = videoUrl;

    backToLobbyButton.addEventListener('click', function () {
        window.location.href = 'lobby.html';
    });
});
