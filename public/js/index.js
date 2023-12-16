import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

//Inicializa Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const loginMessage = document.getElementById('login-message');
  const recoverButton = document.getElementById('recover-button');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const enteredUsername = event.target.username.value;
    const enteredPassword = event.target.password.value;

    //Autenticar con Firebase
    firebase.auth().signInWithEmailAndPassword(enteredUsername, enteredPassword)
      .then((userCredential) => {
        //Autenticación exitosa, el usuario está autenticado
        const user = userCredential.user;
        console.log('Usuario autenticado:', user);

        //Redirigir a la página del lobby
        window.location.href = 'lobby.html?login=success';
      })
      .catch((error) => {
        //Error de autenticación
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error de autenticación:', errorCode, errorMessage);
        loginMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
      });
  });

  recoverButton.addEventListener('click', function () {
    //Abre el formulario de recuperación de contraseña de Firebase
    const email = prompt('Ingresa tu correo electrónico para recuperar la contraseña:');

    if (email) {
      //Envía el correo de recuperación de contraseña
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          alert('Se ha enviado un correo de recuperación de contraseña. Revisa tu bandeja de entrada.');
        })
        .catch((error) => {
          console.error('Error al enviar el correo de recuperación de contraseña:', error);
          alert('Hubo un error al enviar el correo de recuperación de contraseña. Inténtalo de nuevo.');
        });
    }
  });
});
