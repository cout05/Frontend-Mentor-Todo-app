//change the image depends on the size(function, eventlistener)
window.addEventListener("DOMContentLoaded", function () {
  function updateImageSource() {
    const backgroundImg = document.getElementById("background-image");
    var screen = window.innerWidth;
    if (screen < 800) {
      backgroundImg.src = "images/bg-mobile-light.jpg";
    } else {
      backgroundImg.src = "images/bg-desktop-light.jpg";
    }
  }
  updateImageSource();
  window.addEventListener("resize", function () {
    updateImageSource();
  });
});

//change the colors of the elements(function)
function changeColor(darkTheme) {
  const body = document.body;
  const elements = [
    document.getElementById("inputs-con"),
    document.getElementById("todo-con"),
    document.getElementById("add-todo"),
  ];

  if (darkTheme == false) {
    body.style.backgroundColor = "white";
    elements.forEach((element) => {
      element.style.backgroundColor = "white";
      element.style.color = "black";
    });
  } else {
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    elements.forEach((element) => {
      element.style.backgroundColor = "hsl(235, 24%, 19%)";
      element.style.color = "hsl(234, 39%, 85%)";
    });
  }
}

//change the image depends on the theme(function)
function imageTheme(darkTheme) {
  const backgroundImg = document.getElementById("background-image");
  const navCon = document.getElementById("nav-con");
  var screen = window.innerWidth;
  if (darkTheme == false) {
    if (screen < 800) {
      backgroundImg.src = "images/bg-mobile-light.jpg";
      navCon.style.backgroundColor = "transparent";
    } else {
      backgroundImg.src = "images/bg-desktop-light.jpg";
    }
  } else {
    if (screen < 800) {
      backgroundImg.src = "images/bg-mobile-dark.jpg";
      navCon.style.backgroundColor = "hsl(235, 24%, 19%)";
    } else {
      backgroundImg.src = "images/bg-desktop-dark.jpg";
    }
  }
}

//global varibles (toggle to switch theme)
const darkButton = document.getElementById("dark-button");
const lightButton = document.getElementById("light-button");
const darkTheme = false;

//darkmode button(function)
darkButton.addEventListener("click", function () {
  imageTheme(true);
  changeColor(true);
  darkButton.style.display = "none";
  lightButton.style.display = "block";
});

//default mode(function)
lightButton.addEventListener("click", function () {
  imageTheme(false);
  changeColor(false);
  darkButton.style.display = "block";
  lightButton.style.display = "none";
});

const number = document.getElementById("numbersLeft");

//updates the number of items
function updateCount() {
  const checkboxes = document.querySelectorAll(".check-icon");
  let count = checkboxes.length;

  checkboxes.forEach(function (checkbox) {
    if (checkbox.classList.contains("checked")) {
      count--;
    }
  });

  number.innerHTML = count;
}

//function when a list is deleted, the number decrease
function decreaseItems() {
  if (number.innerHTML != 0) {
    number.innerHTML = parseInt(number.innerHTML) - 1;
  }
}

//adds checkBox(function, eventlistener)
function checkbox() {
  const checkboxes = document.querySelectorAll(".check-icon");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      checkbox.classList.add("checked");
      const listItem = checkbox.parentNode.querySelector("li"); // Find the associated list item
      listItem.classList.add("checked");
      updateCount();
      clearCompleted();
    });
  });
}

//adds cross/delete(function, eventlistener)
function cross() {
  const cross = document.querySelectorAll(".cross-icon");
  cross.forEach(function (remove) {
    remove.addEventListener("click", function () {
      const div = remove.parentNode; // Get the parent div element
      div.parentNode.removeChild(div); // Remove the div element from its parent
      decreaseItems();
    });
  });
}

//function to clear all the check-icons that have a check class
function clearCompleted() {
  const checkboxes = document.querySelectorAll(".check-icon");
  const reset = document.getElementById("reset");

  reset.addEventListener("click", function () {
    checkboxes.forEach(function (checkbox) {
      if (checkbox.classList.contains("checked")) {
        const check = checkbox.parentNode;
        check.parentNode.removeChild(check);
      }
    });
  });
}

//function to only show the active items/check-icons w/o check class
function activeItems() {
  const checkboxes = document.querySelectorAll(".check-icon");
  checkboxes.forEach(function (checkbox) {
    if (checkbox.classList.contains("checked")) {
      const check = checkbox.parentNode;
      check.style.display = " none";
    }
  });
}

//function to only show completed or check-icons with check class
function completedItems() {
  const checkboxes = document.querySelectorAll(".check-icon");
  checkboxes.forEach(function (checkbox) {
    if (!checkbox.classList.contains("checked")) {
      const check = checkbox.parentNode;
      check.style.display = "none";
    }
    if (checkbox.classList.contains("checked")) {
      const check = checkbox.parentNode;
      check.style.display = " flex";
    }
  });
}

//function to show all the items
function allItems() {
  const checkboxes = document.querySelectorAll(".check-icon");
  checkboxes.forEach(function (checkbox) {
    const check = checkbox.parentNode;
    check.style.display = "flex";
  });
}

//global variables containers and button
const addTodo = document.getElementById("add-todo");
const listCon = document.getElementById("list-con");

//adds the task to the listCon(function)
function addTask() {
  const div = document.createElement("div");
  const list = document.createElement("li");
  const imgCheckbox = document.createElement("img");
  const imgCross = document.createElement("img");

  imgCheckbox.setAttribute("src", "images/icon-check.svg");
  imgCheckbox.setAttribute("class", "check-icon");
  imgCross.setAttribute("src", "images/icon-cross.svg");
  imgCross.setAttribute("class", "cross-icon");

  const task = addTodo.value;
  list.textContent = task;

  div.appendChild(imgCheckbox);
  div.appendChild(list);
  div.appendChild(imgCross);
  listCon.appendChild(div);

  updateCount();
  checkbox();
  cross();

  addTodo.value = "";
}

//event listener to call the function addTask

addTodo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (addTodo.value !== "") {
      addTask();
    }
  }
});

const blue = "hsl(220, 98%, 61%)";
const grey = "hsl(236, 9%, 61%)";
all.style.color = blue;

//toggles the text color in the nav-con
function allToggle() {
  const all = document.getElementById("all");
  const active = document.getElementById("active");
  const completed = document.getElementById("completed");

  if (this.id === "all") {
    allItems();
    all.style.color = blue;
    active.style.color = grey;
    completed.style.color = grey;
  } else if (this.id === "active") {
    activeItems();
    all.style.color = grey;
    active.style.color = blue;
    completed.style.color = grey;
  } else if (this.id === "completed") {
    completedItems();
    all.style.color = grey;
    active.style.color = grey;
    completed.style.color = blue;
  }
}

// Attach the click event listener to the elements
all.addEventListener("click", allToggle);
active.addEventListener("click", allToggle);
completed.addEventListener("click", allToggle);
