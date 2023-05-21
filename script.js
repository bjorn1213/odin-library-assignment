let myLibrary = [];

class Book {
  read;

  constructor(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
  }

  toggleRead = () => {
    this.read = !this.read;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(bookIndex) {
  myLibrary.splice(bookIndex, 1);
}

function generateLibrary() {
  const oldTbody = document.querySelector("#book-table tbody");
  const newTbody = document.createElement("tbody");

  myLibrary.forEach((book, index) => {
    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("data", index);
    removeBtn.textContent = "remove";

    removeBtn.addEventListener("click", (event) => {
      const eventTarget = event.target;
      removeBookFromLibrary(eventTarget.getAttribute("data"));
      generateLibrary();
    });

    const readBtn = document.createElement("button");
    readBtn.setAttribute("data", index);
    readBtn.textContent = "read";

    readBtn.addEventListener("click", (event) => {
      const eventTarget = event.target;
      const idx = eventTarget.getAttribute("data");
      myLibrary[idx].toggleRead();
      generateLibrary();
    });

    const row = newTbody.insertRow();
    row.insertCell().innerHTML = book.title;
    row.insertCell().innerHTML = book.author;
    row.insertCell().innerHTML = book.pageCount;
    row.insertCell().innerHTML = book.read ? "Yes" : "No";
    row.insertCell().appendChild(readBtn);
    row.insertCell().appendChild(removeBtn);
  });

  oldTbody.parentNode.replaceChild(newTbody, oldTbody);
}

function toggleAddBookPrompt() {
  const overlayElement = document.querySelector(".overlay");

  if (overlayElement.style.display === "flex") {
    overlayElement.style.display = "none";
  } else {
    overlayElement.style.display = "flex";
  }
}

for (let i = 0; i < 10; i++) {
  addBookToLibrary(new Book(`dummyTitle ${i}`, "dummyAuthor", 200, true));
}
generateLibrary();

const addButton = document.querySelector(".add-book");

addButton.addEventListener("click", () => {
  toggleAddBookPrompt();
});

function showError() {
  const titleInput = document.querySelector("#bookTitle");
  const authorInput = document.querySelector("#bookAuthor");
  const pagesInput = document.querySelector("#pageCount");

  titleInput.setCustomValidity("");
  authorInput.setCustomValidity("");
  pagesInput.setCustomValidity("");

  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Required field!");
  }
  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Required field!");
  }
  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("Required field!");
  } else if (pagesInput.validity.rangeUnderflow) {
    pagesInput.setCustomValidity("At least 1 page must be present!");
  }
}

const confirmAddBook = document.querySelector("#add-book");
confirmAddBook.addEventListener("click", (event) => {
  const form = document.querySelector("form");
  if (form.checkValidity()) {
    const bookTitle = document.getElementById("bookTitle").value;
    const bookAuthor = document.getElementById("bookAuthor").value;
    const pageCount = document.getElementById("pageCount").value;
    const read = document.getElementById("read").value;

    addBookToLibrary(new Book(bookTitle, bookAuthor, pageCount, read));
    generateLibrary();

    toggleAddBookPrompt();
    document.getElementById("form-add-book").reset();
  } else {
    showError();
  }
  // event.preventDefault();
});
