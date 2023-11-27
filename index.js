const previous = document.querySelector('#previous');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const cast = document.querySelector('#cast');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const image = document.querySelector('#image');
const time = document.querySelector('#time');
const progressBar = document.querySelector('#progress-bar');
const progressStart = document.querySelector('.mid-progress-start');
const progressEnd = document.querySelector('.mid-progress-end');

const track = document.createElement('audio');

let index = 0;
let isPlay = false;

let songs = [
    {
        title: 'ただ声一つ',
        author: 'ロクデナシ',
        path: './songs/ただ声一つ.mp3',
        image: './images/ただ声一つ.jpg'
    },
    {
        title: 'INTO THE NIGHT',
        author: 'YOASOBI',
        path: './songs/into-the-night.mp3',
        image: './images/into-the-night.jpg'
    },
    {
        title: 'NIGHT DANCER',
        author: 'imase',
        path: './songs/night-dancer.mp3',
        image: './images/night-dancer.jpg'
    },
    {
        title: 'Lemon',
        author: 'Kenshi Yonezu',
        path: './songs/lemon.mp3',
        image: './images/lemon.jpg'
    }
];

function loadTrack(index) {
    track.src = songs[index].path;
    title.innerHTML = songs[index].title;
    author.innerHTML = songs[index].author;
    image.src = songs[index].image;
    track.load();
}

loadTrack(index);

function playSong() {
    track.play();
    isPlay = true;
    play.innerHTML = '<i class="fa-solid fa-circle-pause fa-2x"></i>';
}

function pauseSong() {
    track.pause();
    isPlay = false;
    play.innerHTML = '<i class="fa-solid fa-circle-play fa-2x"></i>';
}

function nextSong() {
    if (index < songs.length - 1) {
        index++;
    } else {
        index = 0;
    }
    loadTrack(index);
    if (isPlay) {
        playSong();
    }
}

function previousSong() {
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1;
    }
    loadTrack(index);
    if (isPlay) {
        playSong();
    }
}

function justPlay() {
    if (isPlay == false) {
        playSong();
    } else {
        pauseSong();
    }
}

function cast0() {
    index = 0;
    loadTrack(index);
    playSong();
}

function cast1() {
    index = 1;
    loadTrack(index);
    playSong();
}

function cast2() {
    index = 2;
    loadTrack(index);
    playSong();
}

function cast3() {
    index = 3;
    loadTrack(index);
    playSong();
}

function updateProgressBar() {
    const currentTime = track.currentTime;
    const duration = track.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;

    progressStart.textContent = formatTime(track.currentTime);
    progressEnd.textContent = formatTime(track.duration);

    if (currentTime == track.duration) {
        nextSong();
    }
}

track.addEventListener('timeupdate', updateProgressBar);

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * track.duration;
    track.currentTime = seekTime;
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
}

updateProgressBar();

const volumeBar = document.querySelector('#volume-bar');

volumeBar.addEventListener('input', () => {
    const volume = volumeBar.value / 100;
    track.volume = volume;

    if (volumeBar.value == 0) {
        document.getElementById('volume-icon').innerHTML = '<i class="fa-solid fa-volume-xmark" style="color: #ffffff;"></i>';
    } else if (volumeBar.value < 33) {
        document.getElementById('volume-icon').innerHTML = '<i class="fa-solid fa-volume-off" style="color: #ffffff;"></i>';
    } else if (volumeBar.value < 66) {
        document.getElementById('volume-icon').innerHTML = '<i class="fa-solid fa-volume-low" style="color: #ffffff;"></i>';
    } else {
        document.getElementById('volume-icon').innerHTML = '<i class="fa-solid fa-volume-high" style="color: #ffffff;"></i>';
    }
});
