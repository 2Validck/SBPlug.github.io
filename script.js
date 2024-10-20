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


document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const robloxUser = document.getElementById('robloxUser').value;
    const discordUser = document.getElementById('discordUser').value;
    const offer = document.getElementById('offer').value;

    // Construct the embed message to be sent via webhook
    const embed = {
        embeds: [
            {
                title: "New Order Received",
                color: 15158332,
                fields: [
                    {
                        name: "Roblox Username",
                        value: robloxUser,
                        inline: true
                    },
                    {
                        name: "Discord Username",
                        value: discordUser,
                        inline: true
                    },
                    {
                        name: "What they want:",
                        value: offer,
                        inline: false
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "South Bronx's Plug"
                }
            }
        ]
    };

    
    const webhookURL = 'https://discord.com/api/webhooks/1297482321980821584/tBQpy3f5ibWLkeqbhdMTJnMiFVKBuKHCHyczz4RI3hwNQbwy0FmQCG5JqthF4Xv0mtTj';

    // Send the data using the webhook
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(embed),
    }).then(response => {
        if (response.ok) {
            document.getElementById('orderMessage').textContent = 'Order placed successfully!';
        } else {
            document.getElementById('orderMessage').textContent = 'Failed to place the order. Please try again.';
            document.getElementById('orderMessage').style.color = 'red';
        }
    }).catch(error => {
        document.getElementById('orderMessage').textContent = 'Error placing order: ' + error;
        document.getElementById('orderMessage').style.color = 'red';
    });
});

let visitorCount = localStorage.getItem('visitCount');
if (!visitorCount) {
    
    visitorCount = 1;
    localStorage.setItem('visitCount', visitorCount);
    sendToDiscord(visitorCount); 
} else {
    
    visitorCount++;
    localStorage.setItem('visitCount', visitorCount);
}

document.getElementById('visitorCount').innerText = `Total Website Visits: ${visitorCount}`;

function sendToDiscord(count) {
    const webhookURL = "https://discord.com/api/webhooks/1297523319352070156/OmtOVqtd8YQI8kIyRHDhsnA1YdnTTJjHo4I-Q_orHujYVyQaFTMiIIu3Jn9wFEoequif"; 
    const embedMessage = {
        username: "Visitor Bot",  
        embeds: [
            {
                title: "New Visitor!",
                description: `This is visitor number: **${count}**`,
                color: 15158332,  
                footer: {
                    text: "Visitor Tracker",
                },
                timestamp: new Date().toISOString(),  
            }
        ]
    };
    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(embedMessage)
    }).then(response => {
        if (response.ok) {
            console.log("Visitor count sent to Discord.");
        } else {
            console.error("Error sending visitor count to Discord.");
        }
    });
}
