let videoIndex = 0;
const videos = ['/videos/veg.mp4', '/videos/nonveg.mp4', '/videos/dessert.mp4']; // List of video files

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

document.getElementById('downloadButton').addEventListener('click', () => {
    const currentVideo = videos[videoIndex];
    const link = document.createElement('a');
    link.href = currentVideo;
    link.download = currentVideo.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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