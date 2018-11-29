// Initialize
// Initialize Firebase
let config = {
  apiKey: 'AIzaSyDmI0IERvjSq0334ndUnRMb09SyKuE4mMI',
  authDomain: 'taller-firebase-4e2b1.firebaseapp.com',
  databaseURL: 'https://taller-firebase-4e2b1.firebaseio.com',
  projectId: 'taller-firebase-4e2b1',
  storageBucket: 'taller-firebase-4e2b1.appspot.com',
  messagingSenderId: '521580200060'
};
firebase.initializeApp(config);

let database = firebase.database();
let db = firebase.firestore();

document.getElementById('btn-loginaitor').addEventListener('click', event => {
  console.log('diste un click');
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInUser(email, password);
});

window.signInUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(event => {
      // Se utiliza la interfaz Location, implementando la propiedad Location.href que contiene la URL
      location.href = '../views/dashboard.html';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Verifica la contraseña.');
      } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email' || errorCode === 'auth/argument-error') {
        alert('Por favor verifica tu usuario');
      }
    });
};

window.signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(event => {
      location.href = '../views/login.html';
      alert('Saliendo...');
    }).catch(error => {
      alert('Error al cerrar sesión', error);
    });
};
