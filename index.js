let myBooks = []
let k = 0;

function bookList (book){
  return `
  <li>${book.title}</li>
  <li>${book.author}</li>
  <button type='button' id='${book.id}' class='remove-button'>Remove</button>`;
}

const removeBook = (ev) => {
  const buttonId = ev.target.id;
  books = books.filter((y) => y !== books[books.findIndex((x) => x.id === parseInt(buttonId, 10))]);
  localStorage.setItem('bookObject', JSON.stringify(books));
  document.getElementById('result-set').innerHTML = `${books.map(listBooks).join('')}`;
};

const addBooks = (ev) => {
  ev.preventDefault();
  k = k + 1;
  const book = {
    id: k,
    title: document.getElementById('book-title').value,
    author: document.getElementById('book-author').value,
  };
  books.push(book);
  localStorage.setItem('bookObject', JSON.stringify(books));
  document.getElementById('bookList').innerHTML = `${books.map(listBooks).join('')}`;
  document.getElementById('bookList').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      removeBook(e);
    }
  });
  document.getElementById('addBooks').reset();
};
