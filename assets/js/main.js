window.addEventListener("DOMContentLoaded", event => {
  const navigation = document.querySelector(".carousel-navigation");
  var navButtons = Array.from(navigation.children);
  const slidesContainer = document.querySelector(".carousel-slides");
  var slides = Array.from(slidesContainer.children);
  // using api
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then(response => response.json())
  //     .then(json => {
  //       json = json.slice(0, 5);
  //       let images = "";
  //       json.forEach((image, index) => {
  //         images += `<img src="${image.url}" alt="${image.title}"` + (index === 0 ? `class="current"` : ``) + `/>`;
  //       });
  //       console.log(images);
  //       document.querySelector(".carousel-slides").innerHTML = images;
  //       slides = Array.from(slidesContainer.children);
  //       createNavs();
  //     });

  const nextButton = document.querySelector(".carousel-button.right");
  const prevButton = document.querySelector(".carousel-button.left");

  const imageVariableSize = slides[0].getBoundingClientRect();
  const imageVariableWidth = imageVariableSize.width;

  const createNavs = () => {
    let temp = "";
    for (let navs = 0; navs < slides.length; navs++) {
      temp += `<button class="carousel-navigation-button` + (navs === 0 ? ` current` : ``) + `"></button>`;
    }
    navigation.innerHTML = temp;
  };
  createNavs();

  const imagePosition = (image, index) => {
    slides[index].style.left = imageVariableWidth * index + "px";
  };

  slides.forEach(imagePosition);

  const moveSlide = (slides, current, target) => {
    slides.style.transform = "translateX(-" + target.style.left + ")";
    current.classList.remove("current");
    target.classList.add("current");
    stopAllPlayers();
  };

  nextButton.addEventListener("click", event => {
    let currentSlide = slidesContainer.querySelector(".current");
    let nextSlide = currentSlide.nextElementSibling;
    moveSlide(slidesContainer, currentSlide, nextSlide);
    let currentNav = navigation.querySelector(".carousel-navigation-button.current");
    let nextNav = currentNav.nextElementSibling;
    navigate(currentNav, nextNav);
    let targetIndex = slides.findIndex(image => image === nextSlide);
    toggleButtons(slides, prevButton, nextButton, targetIndex);
  });

  prevButton.addEventListener("click", event => {
    let currentSlide = slidesContainer.querySelector(".current");
    let prevSlide = currentSlide.previousElementSibling;
    moveSlide(slidesContainer, currentSlide, prevSlide);
    let currentNav = navigation.querySelector(".carousel-navigation-button.current");
    let prevNav = currentNav.previousElementSibling;
    navigate(currentNav, prevNav);
    let targetIndex = slides.findIndex(image => image === prevSlide);
    toggleButtons(slides, prevButton, nextButton, targetIndex);
  });

  const navigate = (current, target) => {
    current.classList.remove("current");
    target.classList.add("current");
  };

  const toggleButtons = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
      prevButton.classList.add("hide");
      nextButton.classList.remove("hide");
    } else if (targetIndex === slides.length - 1) {
      prevButton.classList.remove("hide");
      nextButton.classList.add("hide");
    } else {
      prevButton.classList.remove("hide");
      nextButton.classList.remove("hide");
    }
  };

  navigation.addEventListener("click", event => {
    let targetNav = event.target.closest("button");
    if (!targetNav) return;
    let currentSlide = slidesContainer.querySelector(".current");
    let currentNav = navigation.querySelector(".carousel-navigation-button.current");
    let targetIndex = navButtons.findIndex(nav => nav === targetNav);
    let targetSlide = slides[targetIndex];
    console.log(slides);
    moveSlide(slidesContainer, currentSlide, targetSlide);
    navigate(currentNav, targetNav);
    toggleButtons(slides, prevButton, nextButton, targetIndex);
  });

  const stopAllPlayers = () => {
    var videos = document.getElementsByTagName("video");
    for (i = 0; i < videos.length; i++) videos[i].pause();
  };
});
