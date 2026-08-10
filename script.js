document.addEventListener("DOMContentLoaded", () => {
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const introVideo = document.getElementById("introVideo");

  function showInvitation() {
    console.log("Mostro il sito finale");
    videoContainer.classList.add("hidden");
    invitation.classList.remove("hidden");
  }

  startVideoBtn.addEventListener("click", async () => {
    console.log("Click sul bottone");

    introScreen.classList.add("hidden");
    videoContainer.classList.remove("hidden");

    try {
      await introVideo.play();
      console.log("Video partito");
    } catch (error) {
      console.log("Play bloccato o errore:", error);
    }
  });

  introVideo.addEventListener("ended", () => {
    console.log("Video terminato");
    showInvitation();
  });

  introVideo.addEventListener("error", () => {
    console.log("Errore nel video");
    showInvitation();
  });

  introVideo.addEventListener("pause", () => {
    console.log("Video in pausa. currentTime:", introVideo.currentTime);
    console.log("duration:", introVideo.duration);
  });

  // Fallback: se il video arriva praticamente alla fine
  introVideo.addEventListener("timeupdate", () => {
    if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.3) {
      console.log("Fine rilevata con timeupdate");
      showInvitation();
    }
  });
});
