document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    const recoverButton = document.getElementById('recover-button');

    let username = localStorage.getItem('username');

    if (username) {
        window.location.href = 'lobby.html';
    }

    //Verificar inicio de sesión
    const params = new URLSearchParams(window.location.search);
    const loginAttempt = params.get('login');

    if (loginAttempt === 'success') {
        window.location.href = 'lobby.html';
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const enteredUsername = event.target.username.value;
        const enteredPassword = event.target.password.value;

        //Verificacion exitosa -> Prueba sin backend
        if (enteredUsername === 'admin' && enteredPassword === 'admin') {

            username = enteredUsername;
            localStorage.setItem('username', username);

            //Redirigir a la página del lobby
            window.location.href = 'index.html?login=success';

        } else {
            loginMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
    });

    recoverButton.addEventListener('click', function () {

        //Muestra las credenciales de recuperación -> Prueba sin backend
        alert('Credenciales de recuperación: admin:admin');
    });
});
