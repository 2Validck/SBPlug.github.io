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
    'song7.mp3',
    'song8.mp3'
];

// Function to play a specific song



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
    playSong('song5.mp3', 'Savior - NottiWorldRecords');
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
