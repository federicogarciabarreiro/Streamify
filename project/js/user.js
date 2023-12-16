document.addEventListener('DOMContentLoaded', function () {
    const usernamePlaceholder = document.getElementById('username-placeholder');
    const logoutButton = document.getElementById('logout-button');
    const gotoLobbyButton = document.getElementById('goto-lobby-button');

    //Obtener nombre de usuario desde almacenamiento (localStorage) -> Prueba sin backend
    const username = localStorage.getItem('username');

    if (username) {
        usernamePlaceholder.textContent = username;
    } else {
        window.location.href = 'login.html';
    }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });

    gotoLobbyButton.addEventListener('click', function () {
        window.location.href = 'lobby.html';
    });
});
