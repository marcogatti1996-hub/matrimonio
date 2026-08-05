const button = document.getElementById("openInvite");
const envelope = document.getElementById("envelope-container");
const invitation = document.getElementById("invitation");

button.addEventListener("click", () => {
    envelope.style.display = "none";
    invitation.classList.remove("hidden");
});
