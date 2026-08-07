const startVideoBtn = document.getElementById("startVideoBtn");
const introScreen = document.getElementById("intro-screen");
const videoContainer = document.getElementById("video-container");
const introVideo = document.getElementById("introVideo");
const invitation = document.getElementById("invitation");

if (startVideoBtn && introScreen && videoContainer && introVideo && invitation) {
    startVideoBtn.addEventListener("click", () => {
        introScreen.classList.add("hidden");
        videoContainer.classList.remove("hidden");

        introVideo.play().catch((error) => {
            console.log("Errore nella riproduzione del video:", error);
            videoContainer.classList.add("hidden");
            invitation.classList.remove("hidden");
        });
    });

    introVideo.addEventListener("ended", () => {
        console.log("Video terminato");
        videoContainer.classList.add("hidden");
        invitation.classList.remove("hidden");
    });
}
