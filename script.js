document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const videoContainer = document.getElementById("video-container");
  const invitation = document.getElementById("invitation");
  const startVideoBtn = document.getElementById("startVideoBtn");
  const introVideo = document.getElementById("introVideo");

  const storySlider = document.getElementById("storySlider");
  const storyPrev = document.getElementById("storyPrev");
  const storyNext = document.getElementById("storyNext");

  let invitationShown = false;
  let countdownStarted = false;
  let countdownInterval = null;
  let storySliderInitialized = false;
  let revealInitialized = false;
  let videoTimeout = null;

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fadeOutAndHide(element, displayNone = false) {
    if (!element) return;

    element.classList.add("hidden-state");
    element.setAttribute("aria-hidden", "true");

    await wait(700);

    if (displayNone) {
      element.classList.add("hidden-display");
    }
  }

  async function showWithFade(element) {
    if (!element) return;

    element.classList.remove("hidden-display");
    await wait(20);

    element.classList.remove("hidden-state");
    element.setAttribute("aria-hidden", "false");
  }

  function initStorySlider() {
    if (storySliderInitialized) return;
    if (!storySlider || !storyPrev || !storyNext) return;

    storySliderInitialized = true;

    const getScrollAmount = () => {
      const firstCard = storySlider.querySelector(".story-card");
      if (!firstCard) return 340;
      return firstCard.offsetWidth + 20;
    };

    storyPrev.addEventListener("click", () => {
      storySlider.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });
    });

    storyNext.addEventListener("click", () => {
      storySlider.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });
    });
  }

  function initRevealAnimations() {
    if (revealInitialized) return;
    revealInitialized = true;

    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    reveals.forEach((el) => observer.observe(el));
  }

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
      return;
    }

    const weddingDate = new Date(2027, 9, 10, 12, 0, 0);

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
          countdownInterval = null;
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

  async function startVideoFlow() {
    startVideoBtn.disabled = true;

    await fadeOutAndHide(introScreen, true);
    await showWithFade(videoContainer);

    try {
      introVideo.currentTime = 0;
      await introVideo.play();
    } catch (error) {
      await showInvitationOnly();
      return;
    }

    videoTimeout = setTimeout(() => {
      showInvitationOnly();
    }, 12000);
  }

  async function showInvitationOnly() {
    if (invitationShown) return;
    invitationShown = true;

    if (videoTimeout) {
      clearTimeout(videoTimeout);
      videoTimeout = null;
    }

    if (introVideo) {
      introVideo.pause();
    }

    await fadeOutAndHide(videoContainer, true);
    await showWithFade(invitation);

    startCountdown();
    initStorySlider();
    initRevealAnimations();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  if (startVideoBtn && introVideo) {
    startVideoBtn.addEventListener("click", startVideoFlow);

    introVideo.addEventListener("ended", showInvitationOnly);

    introVideo.addEventListener("error", showInvitationOnly);

    introVideo.addEventListener("timeupdate", () => {
      if (introVideo.duration && introVideo.currentTime >= introVideo.duration - 0.15) {
        showInvitationOnly();
      }
    });
  }
});
