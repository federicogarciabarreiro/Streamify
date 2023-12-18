const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) window.location.href = 'index.html'

let videoId = '';

const params = new URLSearchParams(window.location.search);

videoId = params.get('videoId');

console.log(videoId);

const storage = firebase.storage();

console.log(storage);

//Obtengo una referencia al archivo de video en Firebase Storage
const videoRef = storage.ref('/movies/sample_' + videoId + '.mp4');

//Obtengo la URL del archivo de video
videoRef.getDownloadURL()
    .then((url) => {

        //Actualizo la fuente del reproductor de video con la URL del video en Firebase Storage
        const videoPlayer = document.getElementById('videoPlayer');
        console.log(url);
        console.log(videoPlayer);
        videoPlayer.src = url;
        videoPlayer.style.width = '100%';
    })
    .catch((error) => {
        console.error('Error al obtener la URL del video:', error);
    });

document.getElementById('goto-lobby-button').addEventListener('click', function () {
        window.location.href = 'lobby.html';
});