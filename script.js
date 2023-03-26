let myLibrary = [];

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function generateLibrary() {
  const oldTbody = document.querySelector("#book-table tbody");
  const newTbody = document.createElement("tbody");

  myLibrary.forEach((book) => {
    const row = newTbody.insertRow();
    row.insertCell().innerHTML = book.title;
    row.insertCell().innerHTML = book.author;
    row.insertCell().innerHTML = book.pageCount;
    row.insertCell().innerHTML = book.read ? "Yes" : "No";
  });

  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
}

function toggleAddBookPrompt() {
  const overlayElement = document.querySelector(".overlay");

  if (overlayElement.style.display === "none") {
    overlayElement.style.display = "flex";
  } else {
    overlayElement.style.display = "none";
  }
}

for (let i = 0; i < 1; i++) {
  addBookToLibrary(new Book("dummyTitle", "dummyAuthor", 200, true));
}
generateLibrary();

const addButton = document.querySelector(".add-book");

addButton.addEventListener("click", () => {
  toggleAddBookPrompt();
});

const confirmAddBook = document.querySelector("#add-book");
confirmAddBook.addEventListener("click", (event) => {
  event.preventDefault();

  const bookTitle = document.getElementById("bookTitle").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const pageCount = document.getElementById("pageCount").value;
  const read = document.getElementById("read").value;

  addBookToLibrary(new Book(bookTitle, bookAuthor, pageCount, read));
  generateLibrary();

  toggleAddBookPrompt();
  document.getElementById("form-add-book").reset();
});
