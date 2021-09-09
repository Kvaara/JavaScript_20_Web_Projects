// First we're getting the quotes form an API
const fetchAQuote = async () => {
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
const newQuoteBtn = document.querySelector("#new-quote");
const authorSpan = document.querySelector("#author");
const quoteSpan = document.querySelector("#quote");
const updateQuote = async () => {
  const { author, content, length } = await fetchAQuote();
  // Just in case the author is of a null/undefined value
  if (author.length === 0) {
    authorSpan.textContent = `― Unknown`;
  } else {
    authorSpan.textContent = `― ${author}`;
  }

  if (content.length > 130) {
  }
  quoteSpan.textContent = content;
};

// Implement the new quote button functionality
newQuoteBtn.addEventListener("click", async () => {
  updateQuote();
});

window.addEventListener("load", () => {
  updateQuote();
});
