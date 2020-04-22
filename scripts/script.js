const submit = document.querySelector("input[type=submit]");
const bgModal = document.querySelector(".bg-modal");
const bookModal = document.querySelector(".book-modal");

let bookNumber = 0; // Keep track of current book
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const title = document.querySelector("input[name=title]").value;
  const author = document.querySelector("input[name=author]").value;
  const pages = document.querySelector("input[name=pages]").value;
  const read = document.querySelector("input[name=read]").checked;
  myLibrary.push(new Book(title, author, pages, read));
}
// Data book attributes used for deletion and viewing books content
function updateDataBook() {
  const bookDivs = document.querySelectorAll(".bookDiv");
  for (let i = 0; i < myLibrary.length; i++) {
    bookDivs[i].setAttribute("data-book", i);
  }
}

function appendToHTML() {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("bookDiv");
  const coverTitle = document.createElement("p");
  coverTitle.innerText = myLibrary[myLibrary.length - 1].title;
  bookDiv.appendChild(coverTitle);
  document.querySelector("#books-container").append(bookDiv);
}
// Retrieve data from Local storage and display
function appendLocalStorage() {
  if (!JSON.parse(localStorage.getItem("myLibrary"))) return;
  const localData = JSON.parse(localStorage.getItem("myLibrary"));
  for (const data of localData) {
    myLibrary.push(new Book(data.title, data.author, data.pages, data.read));
    appendToHTML();
    updateDataBook();
  }
}

appendLocalStorage();

submit.addEventListener("click", () => {
  addBookToLibrary();
  appendToHTML();
  updateDataBook();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  // Reset and close modal
  document.querySelectorAll("input[name]").forEach((input) => (input.value = ""));
  document.querySelector("input[type=checkbox]").checked = false;
  bgModal.style.display = "none";
});

// Open modal for new book
document.querySelector(".btn-newBook").addEventListener("click", () => {
  bgModal.style.display = "flex";
});
// Close modal for book submission
document.querySelector(".close").addEventListener("click", () => {
  bgModal.style.display = "none";
});

document.querySelector("#books-container").addEventListener("click", (e) => {
  bookNumber = e.target.attributes[1].value; // Get targeted books current Data Number, used for deletion as well

  document.querySelector("#title-lbl").textContent = `Title: ${myLibrary[bookNumber].title}`;
  document.querySelector("#author-lbl").textContent = `Author: ${myLibrary[bookNumber].author}`;
  document.querySelector("#pages-lbl").textContent = `Pages: ${myLibrary[bookNumber].pages}`;
  document.querySelector("#read-lbl").textContent =
    myLibrary[bookNumber].read === true ? "I have read this book" : "I have not read this book";

  bookModal.style.display = "flex";
});

// Exit bookModal View
document.querySelector(".book-modal-content").addEventListener("click", () => {
  bookModal.style.display = "none";
});

document.querySelector(".delete").addEventListener("click", () => {
  myLibrary.splice(bookNumber, 1); // Remove selected book from array by using it's data number
  const removedBook = document.querySelector(`[data-book="${bookNumber}"]`);
  document.querySelector("#books-container").removeChild(removedBook);
  updateDataBook();
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); // Update Local storage
  bookModal.style.display = "none";
});
