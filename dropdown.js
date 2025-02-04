class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.mainItem = this.dropdown.querySelector(".mainItem");
    this.itemsBox = this.dropdown.querySelector(".itemsBox");
    this.icon = this.dropdown.querySelector(".icon");
    this.items = this.dropdown.querySelectorAll(".item");
    this.inputHandler();
  }

  inputHandler() {
    this.dropdown.addEventListener("click", () => {
      if (this.itemsBox.classList.contains("itemsBoxOpen")) {
        this.itemsBox.classList.remove("itemsBoxOpen");
        this.icon.classList.remove("iconDropdownOpen");
      } else {
        this.itemsBox.classList.add("itemsBoxOpen");
        this.icon.classList.add("iconDropdownOpen");
      }
    });

    window.addEventListener("click", (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.itemsBox.classList.remove("itemsBoxOpen");
        this.icon.classList.remove("iconDropdownOpen");
      }
    });

    this.items.forEach((i) =>{
        i.addEventListener("click", () =>{
            this.mainItem.textContent = i.textContent;
        })
    })
  }
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((d) => {
    new Dropdown(d);
  });
}

initDropdowns();
