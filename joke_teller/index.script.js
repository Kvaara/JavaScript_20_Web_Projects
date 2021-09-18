// Initializing the button and audio elements from the DOM to JS variables
const newJokeButton = document.querySelector("#joke-btn");
const audioElement = document.querySelector("#joke-audio");

const test = () => {
  VoiceRSS.speech({
    key: "2d6b81808c2d4fa389a545bc2fd84f4a",
    src: "Hello, world!",
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};
test();
