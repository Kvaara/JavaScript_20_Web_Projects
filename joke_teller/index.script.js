// Initializing the button and audio elements from the DOM to JS variables
const newJokeButton = document.querySelector("#joke-btn");
const audioElement = document.querySelector("#joke-audio");

// Helper function that builds the text-to-speech using VoiceRSS SDK by using the joke data
const buildTextToSpeech = ({ setup, delivery }) => {
  VoiceRSS.speech({
    key: "2d6b81808c2d4fa389a545bc2fd84f4a",
    src: `${setup} ... ${delivery}`,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

// Helper function that fetches a response from the jokeapi API
const fetchAJoke = async () => {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart"
    );
    const data = await response.json();
    const { setup, delivery } = data;
    return { setup, delivery };
  } catch (err) {
    alert("An error occurred. Sorry about that...");
    console.log(err);
  }
};

// Click event listener for the "Tell me a joke" button
newJokeButton.addEventListener("click", async () => {
  const jokeData = await fetchAJoke();
  buildTextToSpeech(jokeData);
});
