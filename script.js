document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 


        targetSection.scrollIntoView({ behavior: 'smooth' });


        history.pushState(null, null, 'https://2validck.github.io/SBPlug.github.io/'); 
    });
});

// Keep track of the current song index

let currentSongIndex = 0;

// List of songs in the playlist 
const songs = [
    'song1.mp3',
    'song2.mp3',
    'song3.mp3',
    'song4.mp3',
    'song5.mp3',
    'song6.mp3',
    'song7.mp3'
];

// Function to play a specific song
function playSong(song) {
    const player = document.getElementById('audio-player');
    const source = document.getElementById('audio-source');
    
    source.src = song;
    player.load();
    player.play();
    
    // Update the current song index
    currentSongIndex = songs.indexOf(song);
}

// Event listener to play the next song when the current one ends
document.getElementById('audio-player').addEventListener('ended', function() {
    currentSongIndex++; // Move to the next song

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; // Loop back to the first song
    }

    playSong(songs[currentSongIndex]); // Play the next song
});

// Initialize the player to play the first song when the page loads
window.onload = function() {
    playSong(songs[currentSongIndex]); // Start with the first song
};


function playSong(song, songName) {
    const player = document.getElementById('audio-player');
    const source = document.getElementById('audio-source');
    const currentSongDisplay = document.getElementById('current-song'); // Get the current song element
    source.src = song;
    player.load();
    player.play();

    // Update the currently playing song display
    currentSongDisplay.textContent = `Currently Playing: ${songName}`;
}

// Automatically play the first song when the site opens
window.onload = function() {
    playSong('song1.mp3', '48 - Relly Gunz');
};
