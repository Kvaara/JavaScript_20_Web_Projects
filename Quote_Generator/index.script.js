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

// Implement the new quote button functionality
const newQuoteBtn = document.querySelector("#new-quote");
const authorSpan = document.querySelector("#author");
const quoteSpan = document.querySelector("#quote");
newQuoteBtn.addEventListener("click", async () => {
  const { author, content, length } = await fetchAQuote();
  authorSpan.textContent = `― ${author}`;
  quoteSpan.textContent = content;
});
