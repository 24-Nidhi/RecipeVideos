let videoIndex = 0;
const videos = ['veg.mp4', 'nonveg.mp4', 'cakeDessert.mp4']; // List of video files

const videoPlayer = document.getElementById('videoPlayer');
const searchBar = document.getElementById('searchBar');

document.getElementById('prevButton').addEventListener('click', () => {
    videoIndex = (videoIndex > 0) ? videoIndex - 1 : videos.length - 1;
    loadVideo();
});

document.getElementById('nextButton').addEventListener('click', () => {
    videoIndex = (videoIndex < videos.length - 1) ? videoIndex + 1 : 0;
    loadVideo();
});

document.getElementById('randomButton').addEventListener('click', () => {
    videoIndex = Math.floor(Math.random() * videos.length);
    loadVideo();
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const currentVideo = videos[videoIndex];
    const link = document.createElement('a');
    link.href = currentVideo;
    link.download = currentVideo.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('shareButton').addEventListener('click', () => {
    const currentVideo = videos[videoIndex];
    const shareUrl = `${window.location.href.split('?')[0]}?video=${currentVideo}`;

    if (navigator.share) {
        navigator.share({
            title: 'Recipe Video',
            text: 'Check out this recipe video!',
            url: shareUrl
        }).catch((error) => console.error('Error sharing', error));
    } else {
        alert(`Web Share API not supported on this browser. Share this link: ${shareUrl}`);
    }
});

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredVideos = videos.filter(video => video.toLowerCase().includes(query));
    if (filteredVideos.length > 0) {
        videoIndex = videos.indexOf(filteredVideos[0]);
        loadVideo();
    }
});

function loadVideo() {
    videoPlayer.src = videos[videoIndex];
}

loadVideo(); // Initial load
