document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href'); // Get the href attribute
        const targetSection = document.querySelector(targetId); // Find the target section

        // Scroll smoothly to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Update the URL without the hash
        history.pushState(null, null, 'https://2validck.github.io/SBPlug.github.io/'); // Change this to your actual file name if different
    });
});


// Keep track of the current song index
let currentSongIndex = 0;

// List of songs in the playlist (updated to include only 7 songs)
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

    
    currentSongDisplay.textContent = `Currently Playing: ${songName}`;
}

// Automatically play the first song when the site opens
window.onload = function() {
    playSong('song1.mp3', '48 - Relly Gunz');
};


document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const message = document.getElementById('feedback-message').value;
    const webhookURL = ${{ secrets.DISCORD_WEBHOOK_URL }};

    
    const payload = {
        embeds: [{
            title: "New Feedback Received",
            color: 15158332, 
            fields: [
                {
                    name: "Discord User",
                    value: name,
                    inline: true
                },
                {
                    name: "Message",
                    value: message,
                    inline: false
                }
            ],
            footer: {
                text: "South Bronx's Plugs",
            },
            timestamp: new Date()
        }]
    };

    
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('feedback-status').textContent = 'Thank you for your feedback!';
            document.getElementById('feedback-form').reset(); 
        } else {
            document.getElementById('feedback-status').textContent = 'Failed to send feedback. Try again later.';
        }
    })
    .catch(error => {
        document.getElementById('feedback-status').textContent = 'Error: ' + error.message;
    });
});
