const submit = document.querySelector("input[type=button]");
const bgModal = document.querySelector(".bg-modal");
const bookModal = document.querySelector(".book-modal");

let currentIndex = 0;
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

function appendToHTML() {
  console.log(myLibrary);
  const bookContainer = document.createElement("div");
  const coverTitle = document.createElement("p");
  document.querySelector("#books-container").append(bookContainer);
  for (const [index, book] of myLibrary.entries()) {
    bookContainer.setAttribute("data-book", index);
    coverTitle.innerText = book.title;
    bookContainer.appendChild(coverTitle);
  }
}

submit.addEventListener("click", () => {
  addBookToLibrary();
  appendToHTML();
  // Reset and close modal
  document.querySelectorAll("input[name]").forEach((input) => (input.value = ""));
  document.querySelector("input[type=checkbox]").checked = false;
  bgModal.style.display = "none";
});

// Open modal for new book
document.querySelector(".btn-newBook").addEventListener("click", () => {
  bgModal.style.display = "flex";
});

document.querySelector(".close").addEventListener("click", () => {
  bgModal.style.display = "none";
});

document.querySelector("#books-container").addEventListener("click", (e) => {
  console.log(e.target);
  const bookNumber = e.target.attributes[0].value;
  console.log(myLibrary[bookNumber]);

  document.querySelector("#title-lbl").textContent = `Title: ${myLibrary[bookNumber].title}`;
  document.querySelector("#author-lbl").textContent = `Author: ${myLibrary[bookNumber].author}`;
  document.querySelector("#pages-lbl").textContent = `Pages: ${myLibrary[bookNumber].pages}`;
  document.querySelector("#read-lbl").textContent =
    myLibrary[bookNumber].read === true ? "I have read this book" : "I have not read this book";

  console.log(bookNumber);
  console.log(e);
  console.log(e.target);

  bookModal.style.display = "flex";
});

// Exit bookModal View
document.querySelector(".book-modal-content").addEventListener("click", () => {
  bookModal.style.display = "none";
});

document.querySelector(".delete").addEventListener("click", (e) => {
  console.log(e);

  const bookNumber = e.target.attributes[0].value;
  myLibrary.splice(bookNumber, 1);
  bookModal.style.display = "none";
});
