document.addEventListener("DOMContentLoaded", () => {
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const introVideo = document.getElementById("introVideo");

  let invitationShown = false;

  function showInvitation() {
    if (invitationShown) return;
    invitationShown = true;

    videoContainer.classList.add("hidden");
    invitation.classList.remove("hidden");
  }

  startVideoBtn.addEventListener("click", async () => {
    introScreen.classList.add("hidden");
    videoContainer.classList.remove("hidden");

    try {
      await introVideo.play();
    } catch (error) {
      console.log("Errore play:", error);
    }
  });

  introVideo.addEventListener("ended", showInvitation);
  introVideo.addEventListener("error", showInvitation);

  introVideo.addEventListener("timeupdate", () => {
    if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.2) {
      showInvitation();
    }
  });
});
