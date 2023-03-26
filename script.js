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

for (let i = 0; i < 10; i++) {
  addBookToLibrary(new Book("dummyTitle", "dummyAuthor", 200, true));
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

generateLibrary();

const addButton = document.querySelector("button");

addButton.addEventListener("click", () => {
  addBookToLibrary(new Book("dummyTitle", "dummyAuthor", 200, true));
  generateLibrary();
});
