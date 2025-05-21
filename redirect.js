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
window.addEventListener('DOMContentLoaded', function() {
    const journalEntry = document.getElementById('myJournalentry');
    const wordCountDiv = document.getElementById('word-count');
    const saveBtn = document.getElementById('save-journal');
    const MAX_WORDS = 500;

    function updateWordCount() {
        const words = journalEntry.value.trim().split(/\s+/).filter(Boolean);
        wordCountDiv.textContent = `${words.length} / ${MAX_WORDS} words`;
        if (words.length > MAX_WORDS) {
            wordCountDiv.style.color = 'red';
            saveBtn.disabled = true;
        } else {
            wordCountDiv.style.color = '#888';
            saveBtn.disabled = false;
        }
    }

    journalEntry.addEventListener('input', function() {
        const words = journalEntry.value.trim().split(/\s+/).filter(Boolean);
        if (words.length > MAX_WORDS) {
            
            journalEntry.value = words.slice(0, MAX_WORDS).join(' ');
        }
        updateWordCount();
    });

    updateWordCount();


    const historyList = document.getElementById('history-list');
    const journalDisplay = document.getElementById('journal-display');

    let selectedLi = null;

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('journalHistory') || '[]');
        historyList.innerHTML = '';
        history.slice().reverse().forEach((entry, idx) => {
            const li = document.createElement('li');
            li.style.marginBottom = '10px';
            li.style.cursor = 'pointer';
            li.innerHTML = `<strong>${entry.date}</strong>`;
            li.addEventListener('click', function() {
                journalDisplay.style.display = 'block';
                journalDisplay.innerHTML = `<strong>${entry.date}</strong><br>${entry.text}`;
                
                if (selectedLi) selectedLi.classList.remove('selected-history');
                li.classList.add('selected-history');
                selectedLi = li;
            });
            historyList.appendChild(li);
        });
        journalDisplay.style.display = 'none';
        journalDisplay.innerHTML = '';
        selectedLi = null;
    }

    saveBtn.addEventListener('click', function() {
        const text = journalEntry.value.trim();
        if (!text) return;
        const history = JSON.parse(localStorage.getItem('journalHistory') || '[]');
        const now = new Date();
       
        const dateStr = now.toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        history.push({
            date: dateStr,
            text
        });
        localStorage.setItem('journalHistory', JSON.stringify(history));
        journalEntry.value = '';
        loadHistory();
    });

    loadHistory();

});