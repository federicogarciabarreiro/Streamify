if (typeof window.firebaseConfig === 'undefined') {
  console.error('window.firebaseConfig no está definido. Asegúrate de incluir firebaseConfig.js correctamente.');
} else {
  // Inicializar Firebase
  firebase.initializeApp(window.firebaseConfig);

  const auth = firebase.auth();
  const database = firebase.database();

//Funcion de registro
function register () {

  //Ingreso de datos
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value

  // Validacion
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Correo electronico o contraseña incorrectos.')
    return
  }
  if (validate_field(full_name) == false || validate_field(favourite_song) == false || validate_field(milk_before_cereal) == false) {
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
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    alert('Usuario creado.')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

//Login
function login () {

  //Ingreso de datos
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validar
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Correo electronico o contraseña incorrectos.')
    return
  }

  //Autenticar usuario
  auth.signInWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser

    var database_ref = database.ref()

    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

    alert('Loggin exitoso.')

  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

//Validar correo electronico.
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
    return false
  }
}

//Validar contraseña.
function validate_password(password) {
  if (password < 6) {
    return false
  } else {
    return true
  }
}

//Validar campos.
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