window.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-audio');
    const btn = document.getElementById('audio-toggle');
    if (audio) {
        audio.volume = 0.05; 
    }
    if (audio && btn) {
        btn.onclick = function() {
            audio.muted = !audio.muted;
            btn.textContent = audio.muted ? "Tunes" : "Mute";
        };
        btn.textContent = audio.muted ? 'Tunes' : 'Mute';
    }

  
    const timerSpan = document.getElementById('timer');
    const continueBtn = document.getElementById('continue-btn');
    let timeLeft = 5 * 60; 

    function updateTimer() {
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        timerSpan.textContent = `${minutes}:${seconds}`;
    }

    updateTimer();

    const countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            clearInterval(countdown);
            continueBtn.disabled = false;
            continueBtn.style.background = "#4CAF50";
            continueBtn.style.cursor = "pointer";
        }
    }, 1000);

    continueBtn.addEventListener('click', function() {
        if (!continueBtn.disabled) {
           
            chrome.storage.local.get('originalUrl', function(data) {
                if (data.originalUrl) {
                    window.location.href = data.originalUrl;
                }
            });
        }
    });
});