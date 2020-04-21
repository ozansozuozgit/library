//Have a maximum of 40 books

const submit = document.querySelector("input[type=button]");
const btnNewBook = document.querySelector(".btn-newBook");
const bgModal = document.querySelector(".bg-modal");
const exitModal = document.querySelector(".close");

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
  console.log(myLibrary.entries());
  document.querySelector("#books-container").append(bookContainer);
  for (const [index, book] of myLibrary.entries()) {
    bookContainer.setAttribute("data-book", index);
    console.log(index + "" + book.author);
  }
}

submit.addEventListener("click", () => {
  addBookToLibrary();
  appendToHTML();
  document
    .querySelectorAll("input[name]")
    .forEach((input) => (input.value = ""));
  document.querySelector("input[type=checkbox]").checked = false;
  bgModal.style.display = "none";
});

btnNewBook.addEventListener("click", () => {
  bgModal.style.display = "flex";
});

exitModal.addEventListener("click", () => {
  bgModal.style.display = "none";
});
