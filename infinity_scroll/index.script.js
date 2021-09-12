// Declaring the DOM elements needed to const variables
const imgContainer = document.querySelector("#img-container");
const loadingSpinner = document.querySelector("#loading-spinner");

// Variables for the infinite/endless scroll functionality
let allImagesAreLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;

// Function that runs after an img in the DOM is loaded
const imageHasLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    allImagesAreLoaded = true;
    loadingSpinner.hidden = true;
  }
};

// Function that's used to fetch a photoCount number of photos from Unsplash
const getRandomImagesArray = async (imageCount) => {
  // Declaring the const variables needed to fetch images using Unsplash's API
  const accessKey = "foMCRiZsqZSwpCgQ0otHwbQ3A6-vF3tLCpdaclpfRgQ";
  const UnsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${imageCount}`;

  try {
    const result = await fetch(UnsplashAPI, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("An unexpected error happened:", e);
  }
};

// Generate the image elements to the DOM using the getRandomPhotosArray function
// In addition, implement the infinite/endless scroller
const photosToImgContainer = async (imageCount) => {
  const imagesArray = await getRandomImagesArray(imageCount);
  totalImages += imagesArray.length;

  // Construct the images into the DOM
  imagesArray.forEach((image) => {
    // Creating an 'a' tag to be the container of the image
    const item = document.createElement("a");
    item.href = image.links.html;
    item.target = "_blank";
    // Creating an 'img' tag inside the 'a' tag.
    const img = document.createElement("img");
    img.src = image.urls.regular;
    img.alt = image.alt_description;
    img.title = image.alt_description;
    // Eventlistener that triggers after the corresponding img is loaded
    img.addEventListener("load", imageHasLoaded);
    // Appending the 'img' child into the 'a' container
    item.appendChild(img);
    // Appending the 'a' container with the img into the img-container element
    imgContainer.appendChild(item);
  });
};

// The infinite/endless scroll functionality itself
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    allImagesAreLoaded
  ) {
    allImagesAreLoaded = false;
    photosToImgContainer(5);
  }
});

// Eventlistener that triggers after the whole DOM has been loaded
window.addEventListener("load", () => {
  photosToImgContainer(10);
});
