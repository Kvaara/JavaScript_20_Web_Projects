// Declare the DOM elements to JavaScript variables at the start
const videoElement = document.querySelector("#video");
const startBtn = document.querySelector("#start-btn");

const mediaStreamSelector = async (callback) => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();

      // Eventlistener that closes the PiP window after user clicks the 'Stop sharing' button
      mediaStream.getVideoTracks()[0].onended = () => {
        document.exitPictureInPicture();
      };

      // Eventlistener for when the user clicks the close button (x) in the PiP window
      videoElement.addEventListener("leavepictureinpicture", () => {
        videoElement.srcObject.getTracks()[0].stop();
      });

      return callback(); // Return the callback and run the anonymous function
    };
  } catch (error) {
    console.log("An unexpected error occurred:", error);
  }
};

// Eventlistener for the START button
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;

  mediaStreamSelector(async () => {
    // Start picture-in-picture
    await videoElement.requestPictureInPicture();
    startBtn.disabled = false;
  });
});
