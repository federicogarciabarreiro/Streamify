const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) window.location.href = 'lobby.html';

const auth = firebase.auth();
const database = firebase.database();

console.log('auth obtenido:', auth);
console.log('database obtenido:', database);

//Login
function login () {

  //Ingreso de datos
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  //Validar
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Correo electronico o contraseña incorrectos.')
    return
  }

  if (auth) {
  //Autenticar usuario

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

    //Guardar el usuario autenticado en el almacenamiento local
    localStorage.setItem('currentUser', JSON.stringify({
      email: email,
      last_login : user_data.last_login
    }));

    alert('Loggin exitoso.')

    window.location.href = 'lobby.html';

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    switch (error_code) {
      case 'auth/user-not-found':
        error_message = 'El correo electrónico proporcionado no está registrado.';
        break;
      case 'auth/wrong-password':
        error_message = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
        break;
      default:
        error_message = 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
    }

    alert(error_message)
  })

  } else {
  console.error('auth no está definido. Asegúrate de inicializar Firebase correctamente.');
}

//Validar correo electronico
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

//Validar contraseña
function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

//Validar campos
function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

}