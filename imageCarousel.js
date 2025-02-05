class Carousel {
  constructor(carousel) {
    this.carousel = carousel;

    this.box = this.carousel.querySelector(".box");
    this.itemsAmount = Number(this.box.children.length);

    const getItemWidth = getComputedStyle(document.querySelector(".carousel"))
      .getPropertyValue("--width")
      .split("");
    getItemWidth.splice(-2, 2);

    this.itemWidth = Number(getItemWidth.join(""));

    this.centerToFirst =
      (this.itemsAmount / 2) * this.itemWidth - this.itemWidth / 2;

    this.btnLeft = this.carousel.querySelector(".btnLeft");
    this.btnRight = this.carousel.querySelector(".btnRight");

    this.currentPos = this.centerToFirst;

    this.updateCarousel();
    this.inputHandler();
  }

  updateCarousel() {
    this.box.setAttribute(
      "style",
      `transform: translateX(${this.currentPos}px)`
    );
  }

  inputHandler() {
    this.btnLeft.addEventListener("click", () => {
      if (this.currentPos < this.centerToFirst) {
        this.currentPos += this.itemWidth;
        this.updateCarousel();
      }
    });
    this.btnRight.addEventListener("click", () => {
      if (this.currentPos > -this.centerToFirst) {
        this.currentPos -= this.itemWidth;
        this.updateCarousel();
      }
    });
  }
}

(function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");
  carousels.forEach((c) => {
    new Carousel(c);
  });
})();
