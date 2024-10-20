document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 

        
        targetSection.scrollIntoView({ behavior: 'smooth' });

        
        history.pushState(null, null, 'https://2validck.github.io/SBPlug.github.io/'); 
    });
});



let currentSongIndex = 0;

// List of songs and their names
const songs = [
    { file: 'Audios/song9.mp3', name: '4100 One Mic Cypher - KR, Jenn Carter, Jah Woo' },
    { file: 'Audios/song1.mp3', name: '48 - Relly Gunz' },
    { file: 'Audios/song2.mp3', name: 'Breakin the Code - KR' },
    { file: 'Audios/song3.mp3', name: 'Face of the What - Sha EK' },
    { file: 'Audios/song4.mp3', name: 'Notti Bop - 41' },
    { file: 'Audios/song5.mp3', name: 'Savior - NottiWorldRecords' },
    { file: 'Audios/song6.mp3', name: 'See Red - Tata' },
    { file: 'Audios/song7.mp3', name: 'Touch the Ground - Sha Ek' },
    { file: 'Audios/song8.mp3', name: 'Many Men - Lee Drilly' },
    

];


function playSong(songFile, songName) {
    const player = document.getElementById('audio-player');
    const source = document.getElementById('audio-source');
    const currentSongDisplay = document.getElementById('current-song');

    source.src = songFile;
    player.load();
    player.play().catch((error) => {
        console.error("Playback failed:", error);
    });


    currentSongDisplay.textContent = `Currently Playing: ${songName}`;
}


window.onload = function() {
    playSong(songs[currentSongIndex].file, songs[currentSongIndex].name);


    document.getElementById('audio-player').addEventListener('ended', function() {
        currentSongIndex++;
        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0; 
        }
        playSong(songs[currentSongIndex].file, songs[currentSongIndex].name); 
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

    // Send the request using fetch
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
            document.getElementById('feedback-form').reset(); // Reset the form fields
        } else {
            document.getElementById('feedback-status').textContent = 'Failed to send feedback. Try again later.';
        }
    })
    .catch(error => {
        document.getElementById('feedback-status').textContent = 'Error: ' + error.message;
    });
});
