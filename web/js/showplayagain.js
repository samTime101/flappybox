function showPlayAgain(canvas,SCORE) {
    canvas.style.display = "none";
    const playAgainBtn = document.createElement("button");
    const scoreText = document.createElement("h2");
    scoreText.textContent = "GAME OVER! YOUR SCORE: " + SCORE;
    document.body.appendChild(scoreText);
    playAgainBtn.textContent = "PLAY AGAIN";
    playAgainBtn.className = "menu-btn";
    document.body.appendChild(playAgainBtn);

    playAgainBtn.onclick = () => {
        playAgainBtn.remove();
        scoreText.remove();
        canvas.style.display = "block";
        main(); 
    }
}

export { showPlayAgain };