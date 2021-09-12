// Declaring the DOM elements needed to const variables
const imgContainer = document.querySelector("#img-container");
const loader = document.querySelector("#loading-spinner");

// Function that's used to fetch a photoCount number of photos from Unsplash
const getRandomImagesArray = async (photoCount = 30) => {
  // Declaring the const variables needed to fetch images using Unsplash's API
  const accessKey = "foMCRiZsqZSwpCgQ0otHwbQ3A6-vF3tLCpdaclpfRgQ";
  const UnsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${photoCount}`;

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
const photosToImgContainer = async () => {
  const imagesArray = await getRandomImagesArray();
  console.log(imagesArray);
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
    // Appending the 'img' child into the 'a' container
    item.appendChild(img);
    // Appending the 'a' container with the img into the img-container element
    imgContainer.appendChild(item);
  });
};

photosToImgContainer();
