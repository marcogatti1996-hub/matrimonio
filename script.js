document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introVideo = document.getElementById("introVideo");

  let invitationShown = false;

  function showVideo() {
    introScreen.classList.add("hidden");
    invitation.classList.add("hidden");
    videoContainer.classList.remove("hidden");
  }

  function showInvitation() {
    if (invitationShown) return;
    invitationShown = true;

    videoContainer.classList.add("hidden");
    introScreen.classList.add("hidden");
    invitation.classList.remove("hidden");
  }

  startVideoBtn.addEventListener("click", async () => {
    showVideo();

    try {
      introVideo.currentTime = 0;
      await introVideo.play();
    } catch (error) {
      console.log("Errore riproduzione video:", error);
    }
  });

  introVideo.addEventListener("ended", showInvitation);

  introVideo.addEventListener("timeupdate", () => {
    if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.2) {
      showInvitation();
    }
  });

  introVideo.addEventListener("error", () => {
    console.log("Errore nel caricamento del video");
    showInvitation();
  });
});
