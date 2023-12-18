const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) window.location.href = 'lobby.html';

const auth = firebase.auth();
const database = firebase.database();

console.log('auth obtenido:', auth);
console.log('database obtenido:', database);

//Funcion de registro
function register () {

  //Ingreso de datos
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value

  // Validacion
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Correo electronico o contraseña incorrectos.')
    return
  }
  if (validate_field(full_name) == false) {
    alert('Uno o mas campos estan incorrectos o incompletos.')
    return
  }
 
  //Crear usuario
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser
    var database_ref = database.ref()

    var user_data = {
      email : email,
      full_name : full_name,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Usuario creado.')

    window.location.href = 'index.html';

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  

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