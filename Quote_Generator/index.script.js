// Add the correct elements from the DOM to JavaScript const variables
const container = document.querySelector("#quote-generator-container");
const authorSpan = document.querySelector("#author");
const quoteSpan = document.querySelector("#quote");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetQuoteBtn = document.querySelector("#tweet");
const loadingSpinner = document.querySelector("#loading-spinner");

// Show the loading spinner
const showLoading = () => {
  loadingSpinner.style.display = "flex";
  container.style.display = "none";
};

// Hide the loading spinner
const hideLoading = () => {
  container.style.display = "";
  loadingSpinner.style.display = "none";
};

// First we're getting the quotes form an API
const fetchAQuote = async () => {
  showLoading();
  const apiUrl = "https://quotable.io/random";
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { author, content, length } = data;
    return { author, content, length };
  } catch (e) {
    alert("There was an error fetching the quote. Sorry about that...");
    console.log("An error occurred: ", e);
  }
};

// Update the quote randomly by using the fetchAQuote function
const updateQuote = async () => {
  showLoading();
  const { author, content, length } = await fetchAQuote();
  // Just in case the author is of a null/undefined value
  if (author.length === 0) {
    authorSpan.textContent = `― Unknown`;
  } else {
    authorSpan.textContent = `― ${author}`;
  }

  if (content.length > 130) {
    quoteSpan.classList.add("smaller");
  } else {
    quoteSpan.classList.remove("smaller");
  }
  quoteSpan.textContent = content;
  hideLoading();
};

// Function that handles the tweeting of a quote
const tweetAQuote = () => {
  const url = `https://twitter.com/intent/tweet?text="${quoteSpan.textContent}"%0A${authorSpan.textContent}`;
  window.open(url, "_blank");
};

// Implement the new quote button functionality
newQuoteBtn.addEventListener("click", async () => {
  updateQuote();
});

// Implement the tweet quote button functionality
tweetQuoteBtn.addEventListener("click", () => {
  tweetAQuote();
});

// Generate a brand new quote after the page (DOM) is fully loaded.
window.addEventListener("load", () => {
  updateQuote();
});
