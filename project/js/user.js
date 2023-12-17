document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-button');
    const gotoLobbyButton = document.getElementById('goto-lobby-button');

    //Obtener nombre de usuario desde almacenamiento
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(currentUser);

    if (currentUser) {
        const username = currentUser.email;
        document.getElementById('usernamePlaceholder').textContent = username;
      } else {
        window.location.href = 'index.html';
      }

    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    gotoLobbyButton.addEventListener('click', function () {
        window.location.href = 'lobby.html';
    });
});
