// Initializing the button and audio elements from the DOM to JS variables
const newJokeButton = document.querySelector("#joke-btn");
const audioElement = document.querySelector("#joke-audio");

// Helper function, which starts the text-to-speech using VoiceRSS SDK by using the joke
const startTextToSpeech = (joke) => {
  VoiceRSS.speech({
    key: "2d6b81808c2d4fa389a545bc2fd84f4a",
    src: joke,
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
    const { setup, delivery, error } = data;

    // Catch the JokeAPI's possible server-side error
    if (error) {
      throw new Error(
        "An error occurred by the JokeAPI's side. Check that the fetch URL parameter is in correct form. If it is, then the JokeAPI might be temporarily down..."
      );
    }

    const joke = `${setup} ... ${delivery}`;
    return joke;
  } catch (err) {
    alert("An error occurred. Sorry about that...");
    console.log(err);
    // Enable the "Tell me a joke" button because there was an error
    newJokeButton.disabled = false;
  }
};

// When the joke ends, enable the "Tell me a joke" button
audioElement.addEventListener("ended", () => {
  newJokeButton.disabled = false;
});

// Click event listener for the "Tell me a joke" button
newJokeButton.addEventListener("click", async () => {
  // Disable the joke button for the duration of the joke
  newJokeButton.disabled = true;
  // Fetch a joke using the fetchAJoke function
  const joke = await fetchAJoke();
  // Start the text-to-speech using the joke, which was constructed in the fetchAJoke function
  startTextToSpeech(joke);
});
