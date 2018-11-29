// Obtenemos todos los elementos que necesitaremos
let video = document.querySelector('#camera-stream');
let image = document.querySelector('#snap');
let startCamera = document.querySelector('#start-camera');
let controls = document.querySelector('.controls');
let takePhoto = document.querySelector('#take-photo');
let deletePhoto = document.querySelector('#delete-photo');
let dowloadPhoto = document.querySelector('#download-photo');
let errorMessage = document.querySelector('#error-message');


// Utilizamos la funcion getUserMedia para obtener la salida de la webcam
navigator.getMedia = (navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia);


if (!navigator.getMedia) {
  displayErrorMessage('Tu navegador no soporta la funcion getMedia');
} else {
  // Solicitamos la camara
  navigator.getMedia(
    {
      video: true
    },
    function (stream) {
      // A nuestro componente video le establecemos el src al stream de la webcam
      video.src = window.URL.createObjectURL(stream);
      // Reproducimos
      video.play();
      video.onplay = function () {
        showVideo();
      };
    },
    function (err) {
      displayErrorMessage('Ocurrio un error al obtener el stream de la webcam: ' + err.name, err);
    }
  );
};

// En los moviles no se puede reproducir el video automaticamente, programamos funcionamiento del boton inicar camara
startCamera.addEventListener('click', function (event) {
  event.preventDefault();
  // Reproducimos manualmente
  video.play();
  showVideo();
});


takePhoto.addEventListener('click', function (event) {
  event.preventDefault();
  let snap = takeSnapshot();

  // Mostramos la imagen
  image.setAttribute('src', snap);
  image.classList.add('visible');

  // Activamos los botones de eliminar foto y descargar foto
  deletePhoto.classList.remove('disabled');
  dowloadPhoto.classList.remove('disabled');
  // Establecemos el atributo href para el boton de descargar imagen
  dowloadPhoto.href = snap;
  // Pausamos el stream de video de la webcam
  video.pause();
});


deletePhoto.addEventListener('click', function (event) {
  event.preventDefault();
  // Ocultamos la imagen
  image.setAttribute('src', '');
  image.classList.remove('visible');
  // Deshabilitamos botones de descargar y eliminar foto
  deletePhoto.classList.add('disabled');
  dowloadPhoto.classList.add('disabled');
  // Reanudamos la reproduccion de la webcam
  video.play();
});

function showVideo() {
  // Mostramos el stream de la webcam y los controles
  hideUI();
  video.classList.add('visible');
  controls.classList.add('visible');
};

function takeSnapshot() {
  let hiddenCanvas = document.querySelector('canvas'),
    context = hiddenCanvas.getContext('2d');

  let width = video.videoWidth,
    height = video.videoHeight;

  if (width && height) {
    // Configuramos el canvas con las mismas dimensiones que el video
    hiddenCanvas.width = width;
    hiddenCanvas.height = height;
    // Hacemos una copia
    context.drawImage(video, 0, 0, width, height);
    // Convertimos la imagen del canvas en datarurl
    return hiddenCanvas.toDataURL('image/png');
  }
};

function displayErrorMessage(errorMsg, error) {
  error = error || '';
  if (error) {
    console.log(error);
  }
  errorMessage.innerText = errorMsg;
  hideUI();
  errorMessage.classList.add('visible');
};

function hideUI() {
  // Limpiamos
  controls.classList.remove('visible');
  startCamera.classList.remove('visible');
  video.classList.remove('visible');
  snap.classList.remove('visible');
  errorMessage.classList.remove('visible');
};
