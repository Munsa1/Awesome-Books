let books = [];
let i = 0;

function BookList(b) {
  return `
    <li>${b.title}</li>
    <li>${b.author}</li>
    <button type='button' id='${b.id}' class='remove-button'>Remove</button>`;
}

const removeBook = (ev) => {
  const buttonId = ev.target.id;
  books = books.filter((y) => y !== books[books.findIndex((x) => x.id === parseInt(buttonId, 10))]);
  localStorage.setItem('bookObject', JSON.stringify(books));
  document.getElementById('Result').innerHTML = `${books.map(BookList).join('')}`;
};
// Add Form data to Unordered List
const addBooks = (ev) => {
  ev.preventDefault();
  i += 1;
  const book = {
    id: i,
    title: document.getElementById('bookTitle').value,
    author: document.getElementById('bookAuthor').value,
  };
  books.push(book);
  localStorage.setItem('bookObject', JSON.stringify(books));
  document.getElementById('Result').innerHTML = `${books.map(BookList).join('')}`;
  document.getElementById('Result').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      removeBook(e);
    }
  });
  document.getElementById('BooksForm').reset();
};

DomContentLoaded = () => {
  const dataGet = localStorage.getItem('bookObject');
  const data = JSON.parse(dataGet);
  if (data) {
    books = data;
  }

  document.getElementById('Result').innerHTML = `${books.map(BookList).join('')}`;
  document.getElementById('Result').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      removeBook(e);
    }
  });
};
document.getElementById('submit').addEventListener('click', addBooks);