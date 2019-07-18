# carousel
very basic and simple implementation of a carousel using vanilla js and css 

**DEMO**
https://boring-mahavira-a9d772.netlify.com/

You can add any number of items inside this class `carousel-slides` or you can append items dynamically using fetch api, i've added an example inside `main.js` file but commented it out and here is the example code:

```
fetch("https://jsonplaceholder.typicode.com/photos")
  .then(response => response.json())
  .then(json => {
    json = json.slice(0, 5);
    let images = "";
    json.forEach((image, index) => {
      images += `<img src="${image.url}" alt="${image.title}"` + (index === 0 ? `class="current"` : ``) + `/>`;
    });
    console.log(images);
    document.querySelector(".carousel-slides").innerHTML = images;
    slides = Array.from(slidesContainer.children);
    createNavs();
  });
```

We can add more features to it like looping (using setTimeout to return to the first slide), placeholder (in case of fetching errors), more styling options (actually it is pretty ugly right now), lazy loading (maybe using observers or by creating onSlide event) and almost every feature we may find in any advanced carousel out there.
