const startVideoBtn = document.getElementById("startVideoBtn");
const introScreen = document.getElementById("intro-screen");
const videoContainer = document.getElementById("video-container");
const introVideo = document.getElementById("introVideo");
const invitation = document.getElementById("invitation");

function showInvitation() {
    videoContainer.classList.add("hidden");
    invitation.classList.remove("hidden");
}

if (startVideoBtn && introScreen && videoContainer && introVideo && invitation) {
    startVideoBtn.addEventListener("click", async () => {
        introScreen.classList.add("hidden");
        videoContainer.classList.remove("hidden");

        try {
            introVideo.currentTime = 0;
            await introVideo.play();
        } catch (error) {
            console.log("Errore nella riproduzione del video:", error);
            showInvitation();
        }
    });

    introVideo.addEventListener("ended", showInvitation);
}
