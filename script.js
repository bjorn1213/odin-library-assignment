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

const table = document.querySelector("#book-table");

myLibrary.forEach((book) => {
  const row = table.insertRow();
  row.insertCell().innerHTML = book.title;
  row.insertCell().innerHTML = book.author;
  row.insertCell().innerHTML = book.pageCount;
  row.insertCell().innerHTML = book.read ? "Yes" : "No";
});
