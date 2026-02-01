let startTime;
let timeoutId;
let isWaiting = false;

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

    if (!isWaiting && box.innerText === "Click to Start" || box.innerText.includes("again")) {
        // RESET AND START
        box.innerText = "Wait for Green...";
        box.style.backgroundColor = "#e74c3c";
        box.classList.remove('ready');
        result.innerText = "Your time: -- ms";
        isWaiting = true;

        const delay = Math.floor(Math.random() * 3000) + 2000;

        timeoutId = setTimeout(() => {
            box.classList.add('ready');
            box.innerText = "CLICK NOW!";
            startTime = Date.now();
            isWaiting = false;
        }, delay);

    } else if (box.classList.contains('ready')) {
        // SUCCESSFUL CLICK
        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        
        const rating = getRating(reactionTime);
        result.innerHTML = `Time: <strong>${reactionTime} ms</strong><br>Rating: ${rating}`;
        
        box.classList.remove('ready');
        box.innerText = "Click to Start";
        
    } else if (isWaiting) {
        // CLICKED TOO EARLY
        clearTimeout(timeoutId);
        box.innerText = "Too early! Try again.";
        isWaiting = false;
    }
}