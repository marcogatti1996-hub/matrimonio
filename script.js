document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introVideo = document.getElementById("introVideo");

  const giftToggle = document.getElementById("giftToggle");
  const giftContent = document.getElementById("giftContent");
  const giftToggleIcon = document.getElementById("giftToggleIcon");
  const copyIbanBtn = document.getElementById("copyIbanBtn");
  const giftIban = document.getElementById("giftIban");
  const copyFeedback = document.getElementById("copyFeedback");

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
    if (introScreen) introScreen.classList.add("hidden");
    if (invitation) invitation.classList.add("hidden");
    if (videoContainer) {
      videoContainer.classList.remove("hidden");
      videoContainer.classList.remove("fade-out");
    }
  }

  function showInvitation() {
    if (invitationShown) return;
    invitationShown = true;

    if (introVideo) {
      try {
        introVideo.pause();
      } catch (error) {
        console.log("Errore pausa video:", error);
      }
    }

    if (videoContainer) {
      videoContainer.classList.add("fade-out");
    }

    setTimeout(() => {
      if (videoContainer) videoContainer.classList.add("hidden");
      if (introScreen) introScreen.classList.add("hidden");
      if (invitation) invitation.classList.remove("hidden");
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

  if (giftToggle && giftContent && giftToggleIcon) {
    giftToggle.addEventListener("click", () => {
      const isHidden = giftContent.classList.contains("hidden");

      if (isHidden) {
        giftContent.classList.remove("hidden");
        giftToggle.classList.add("active");
        giftToggle.setAttribute("aria-expanded", "true");
        giftToggleIcon.textContent = "−";
      } else {
        giftContent.classList.add("hidden");
        giftToggle.classList.remove("active");
        giftToggle.setAttribute("aria-expanded", "false");
        giftToggleIcon.textContent = "+";
      }
    });
  }

  if (copyIbanBtn && giftIban && copyFeedback) {
    copyIbanBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(giftIban.textContent.trim());
        copyFeedback.classList.remove("hidden");
        copyIbanBtn.textContent = "Copiato";

        setTimeout(() => {
          copyFeedback.classList.add("hidden");
          copyIbanBtn.textContent = "Copia IBAN";
        }, 2200);
      } catch (error) {
        console.log("Errore copia IBAN:", error);
      }
    });
  }
});
