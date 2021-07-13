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
  document.getElementById('bookList').innerHTML = `${books.map(listBooks).join('')}`;
};