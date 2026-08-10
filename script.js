document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introVideo = document.getElementById("introVideo");

  let invitationShown = false;

  function showVideoScreen() {
    introScreen.classList.add("hidden");
    videoContainer.classList.remove("hidden");
    invitation.classList.add("hidden");
  }

  function showInvitationScreen() {
    if (invitationShown) return;
    invitationShown = true;

    introScreen.classList.add("hidden");
    videoContainer.classList.add("hidden");
    invitation.classList.remove("hidden");
  }

  startVideoBtn.addEventListener("click", async () => {
    showVideoScreen();

    try {
      await introVideo.play();
    } catch (error) {
      console.log("Errore durante la riproduzione del video:", error);
    }
  });

  introVideo.addEventListener("ended", () => {
    showInvitationScreen();
  });

  introVideo.addEventListener("error", () => {
    console.log("Errore nel caricamento del video");
    showInvitationScreen();
  });

  introVideo.addEventListener("timeupdate", () => {
    if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.2) {
      showInvitationScreen();
    }
  });
});
