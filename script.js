document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introVideo = document.getElementById("introVideo");

  let invitationShown = false;
  let countdownStarted = false;
  let countdownInterval = null;

  function startCountdown() {
    if (countdownStarted) return;
    countdownStarted = true;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownMessage = document.getElementById("countdown-message");
    const countdown = document.getElementById("countdown");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownMessage || !countdown) {
      console.log("Elementi countdown non trovati");
      return;
    }

    const weddingDate = new Date(2027, 9, 10, 0, 0, 0);

    function updateCountdown() {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        countdown.classList.add("hidden");
        countdownMessage.classList.remove("hidden");

        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  function showVideo() {
    introScreen.classList.add("hidden");
    invitation.classList.add("hidden");
    videoContainer.classList.remove("hidden");
    videoContainer.classList.remove("fade-out");
  }

  function showInvitation() {
    if (invitationShown) return;
    invitationShown = true;

    videoContainer.classList.add("fade-out");

    setTimeout(() => {
      videoContainer.classList.add("hidden");
      introScreen.classList.add("hidden");
      invitation.classList.remove("hidden");
      startCountdown();
    }, 600);
  }

  if (startVideoBtn && introVideo) {
    startVideoBtn.addEventListener("click", async () => {
      showVideo();

      try {
        introVideo.currentTime = 0;
        await introVideo.play();
      } catch (error) {
        console.log("Errore riproduzione video:", error);
        showInvitation();
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
  } else {
    console.log("Bottone o video non trovati nel DOM");
  }
});
