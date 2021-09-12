// Declare the DOM elements to JavaScript variables at the start
const videoElement = document.querySelector("#video");
const startBtn = document.querySelector("#start-btn");

const mediaStreamSelector = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => videoElement.play;
  } catch (error) {
    console.log("An unexpected error occurred:", error);
  }
};

// Eventlistener for the START button
startBtn.addEventListener("click", async () => {
  startBtn.disabled = true;

  // Start picture-in-picture
  await videoElement.requestPictureInPicture();

  startBtn.disabled = false;
});

// Call the function after the whole DOM has been loaded
window.addEventListener("load", () => {
  mediaStreamSelector();
});
