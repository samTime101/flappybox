export function initMenu(main) {
    const playBtn = document.querySelector("#playBtn");
    const creditsBtn = document.querySelector("#creditsBtn");
    const backBtn = document.querySelector("#backBtn");
    const menu = document.querySelector("#menu");
    const canvas = document.querySelector("#gameCanvas");
    const creditsDiv = document.querySelector("#credits");

    playBtn.onclick = () => {
        menu.style.display = "none";
        creditsDiv.style.display = "none";
        canvas.style.display = "block";
        main();
    }

    creditsBtn.onclick = () => {
        menu.style.display = "none";
        canvas.style.display = "none";
        creditsDiv.style.display = "block";
    }

    backBtn.onclick = () => {
        creditsDiv.style.display = "none";
        canvas.style.display = "none";
        menu.style.display = "flex";
    }
}
