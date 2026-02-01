let startTime;
let timeoutId;
let isWaiting = false;

function handleButtonClick() {
    const box = document.getElementById('box');
    const result = document.getElementById('result');

    if (!isWaiting && box.innerText === "Click to Start") {
        // STEP 1: Start the waiting game
        box.innerText = "Wait for Green...";
        box.style.backgroundColor = "#e74c3c"; // Red
        isWaiting = true;

        // Random delay between 2 and 5 seconds
        const delay = Math.floor(Math.random() * 3000) + 2000;

        timeoutId = setTimeout(() => {
            box.classList.add('ready');
            box.innerText = "CLICK NOW!";
            startTime = Date.now(); // Record start time
            isWaiting = false;
        }, delay);

    } else if (box.classList.contains('ready')) {
        // STEP 2: User clicked on Green!
        const endTime = Date.now();
        const reactionTime = endTime - startTime;
        
        result.innerText = `Your time: ${reactionTime} ms`;
        box.classList.remove('ready');
        box.innerText = "Click to Start";
        
    } else if (isWaiting) {
        // STEP 3: User clicked too early!
        clearTimeout(timeoutId);
        box.innerText = "Too early! Try again.";
        isWaiting = false;
    }
}