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
});