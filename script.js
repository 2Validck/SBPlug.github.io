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

// List of songs and their names
const songs = [
    { file: 'song1.mp3', name: '48 - Relly Gunz' },
    { file: 'song2.mp3', name: 'Breakin the Code - KR' },
    { file: 'song3.mp3', name: 'Face of the What - Sha EK' },
    { file: 'song4.mp3', name: 'Notti Bop - 41' },
    { file: 'song5.mp3', name: 'Savior - NottiWorldRecords' },
    { file: 'song6.mp3', name: 'See Red - Tata' },
    { file: 'song7.mp3', name: 'Touch the Ground - Sha Ek' },
    { file: 'song8.mp3', name: 'Many Men - Lee Drilly' }
];

// Function to play a specific song
function playSong(songFile, songName) {
    const player = document.getElementById('audio-player');
    const source = document.getElementById('audio-source');
    const currentSongDisplay = document.getElementById('current-song');

    source.src = songFile;
    player.load();
    player.play().catch((error) => {
        console.error("Playback failed:", error);
    });

    // Update the currently playing song display
    currentSongDisplay.textContent = `Currently Playing: ${songName}`;
}

// Automatically play the first song when the site opens
window.onload = function() {
    playSong(songs[currentSongIndex].file, songs[currentSongIndex].name);

    // Set up event listener for when the current song ends
    document.getElementById('audio-player').addEventListener('ended', function() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0; // Loop back to the first song
        }
        playSong(songs[currentSongIndex].file, songs[currentSongIndex].name); // Play the next song and update the display
    });
};


document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const message = document.getElementById('feedback-message').value;
    const webhookURL = 'https://discord.com/api/webhooks/1297253209995477014/3HQpwrDkh-Q3TSqbBkhvw5Pxbq0kZxp2BTgBIwtWlBUe81mStsFoskbS2LyjKMXwDxt_'; 


    
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
