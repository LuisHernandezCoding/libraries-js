document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        const { target } = el.dataset;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

function validateForm() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  let validated = true;
  if (title.length < 3 || title.length > 30) {
    document.getElementById('title-error').classList.remove('is-hidden');
    document.getElementById('title').classList.add('is-danger');
    validated = false;
  } else {
    document.getElementById('title-error').classList.add('is-hidden');
    document.getElementById('title').classList.remove('is-danger');
  }

  if (author.length < 3 || author.length > 30) {
    document.getElementById('author-error').classList.remove('is-hidden');
    document.getElementById('author').classList.add('is-danger');
    validated = false;
  } else {
    document.getElementById('author-error').classList.add('is-hidden');
    document.getElementById('author').classList.remove('is-danger');
  }

  if (pages < 1 || pages > 1000) {
    document.getElementById('pages-error').classList.remove('is-hidden');
    document.getElementById('pages').classList.add('is-danger');
    validated = false;
  } else {
    document.getElementById('pages-error').classList.add('is-hidden');
    document.getElementById('pages').classList.remove('is-danger');
  }

  return validated;
}

// Library array
const myLibrary = [];

// Render function
function render() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const row = document.createElement('tr');
    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    row.appendChild(titleCell);
    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    row.appendChild(authorCell);
    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);
    const readCell = document.createElement('td');
    readCell.textContent = book.read;
    row.appendChild(readCell);
    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('button', 'is-danger', 'is-small');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      render();
    });
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);
    bookList.appendChild(row);
  });
}

// Clear form section
const form = document.getElementById('book-form');
const clear = document.getElementById('clear');
clear.addEventListener('click', (e) => {
  e.preventDefault();
  form.reset();
});

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add book to library function
function addBookToLibrary(book) {
  myLibrary.push(book);
  render();
}

// Submit form section
const submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').value;
  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  form.reset();
});

// Create a new book object
const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Yes');
const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, 'No');
const book3 = new Book('The Two Towers', 'J.R.R. Tolkien', 352, 'Yes');
const book4 = new Book('The Return of the King', 'J.R.R. Tolkien', 416, 'No');
const book5 = new Book('The Silmarillion', 'J.R.R. Tolkien', 432, 'Yes');
const book6 = new Book('The Children of Hurin', 'J.R.R. Tolkien', 352, 'No');
const book7 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1216, 'Yes');

// Add the books to the library
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);
addBookToLibrary(book7);

// Render the library
render();