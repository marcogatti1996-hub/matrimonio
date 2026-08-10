document.addEventListener("DOMContentLoaded", () => {
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const introVideo = document.getElementById("introVideo");

  startVideoBtn.addEventListener("click", async () => {
    introScreen.classList.add("hidden");
    videoContainer.classList.remove("hidden");

    try {
      await introVideo.play();
    } catch (error) {
      console.log("Autoplay bloccato dal browser:", error);
    }
  });

  introVideo.addEventListener("ended", () => {
    videoContainer.classList.add("hidden");
    invitation.classList.remove("hidden");
  });
});
