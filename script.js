let startTime;
let timeoutId;
let isWaiting = false;

// 1. Load high score from the browser's "notebook" on startup
let highScore = localStorage.getItem('reactionHighScore') || Infinity;
displayHighScore();

function displayHighScore() {
    const highScoreElement = document.getElementById('high-score');
    if (highScore === Infinity) {
        highScoreElement.innerText = "High Score: -- ms";
    } else {
        highScoreElement.innerText = `High Score: ${highScore} ms`;
    }
}

function getRating(ms) {
    if (ms < 150) return "Extraterrestrial! 👽";
    if (ms < 250) return "Lightning Fast! ⚡";
    if (ms < 350) return "Solid Reflexes! 🔥";
    if (ms < 500) return "Average. Keep practicing! 🐢";
    return "Are you awake? 😴";
}

function handleButtonClick() {
    const box = document.getElementById('box');
    const result = document.getElementById('result');

    if (!isWaiting && (box.innerText === "Click to Start" || box.innerText.includes("again") || box.innerText.includes("High Score!"))) {
        box.innerText = "Wait for Green...";
        box.style.backgroundColor = "#e74c3c";
        box.classList.remove('ready');
        isWaiting = true;

        const delay = Math.floor(Math.random() * 3000) + 2000;

        timeoutId = setTimeout(() => {
            box.classList.add('ready');
            box.innerText = "CLICK NOW!";
            startTime = Date.now();
            isWaiting = false;
        }, delay);

    } else if (box.classList.contains('ready')) {
        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        
        // 2. Check for New High Score
        if (reactionTime < highScore) {
            highScore = reactionTime;
            localStorage.setItem('reactionHighScore', highScore); // Save it!
            displayHighScore();
            box.innerText = "New High Score! Click to restart";
        } else {
            box.innerText = "Click to Start";
        }
        
        const rating = getRating(reactionTime);
        result.innerHTML = `Time: <strong>${reactionTime} ms</strong><br>Rating: ${rating}`;
        box.classList.remove('ready');
        
    } else if (isWaiting) {
        clearTimeout(timeoutId);
        box.innerText = "Too early! Try again.";
        isWaiting = false;
    }
}