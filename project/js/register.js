document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');
  
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const email = event.target.email.value;
      const password = event.target.password.value;
  
      //Crear un nuevo usuario con Firebase
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {

          //Registro exitoso, el usuario está autenticado
          const user = userCredential.user;
          console.log('Nuevo usuario registrado:', user);
  
          //Redirige a la página del lobby
          window.location.href = 'lobby.html?login=success';
        })
        .catch((error) => {
          //Error en el registro
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error en el registro:', errorCode, errorMessage);
          registerMessage.textContent = 'Error en el registro. Inténtalo de nuevo.';
        });
    });
  });
  