class BookList {
  constructor() {
    this.list = [];
  }

  addBook(book) {
    this.list.push(book);
    localStorage.setItem('books', JSON.stringify(this.list));
    this.displayBooks();
  }

  removeBook(id) {
    this.list = this.list.filter((book) => book.id !== id);
    localStorage.setItem('books', JSON.stringify(this.list));
    this.displayBooks();
  }

  displayBooks() {
    const result = document.getElementById('Result');
    result.innerHTML = '';
    this.list.forEach((book) => {
      result.appendChild(this.bookElement(book));
    });
  }
}

bookElement(book) {
  const li = document.createElement('li');
  const title = document.createElement('h5');
  const author = document.createElement('h5');
  const removeBtn = document.createElement('button');
  removeBtn.addEventListener('click', () => this.removeBook(book.id));
  title.innerText = book.title;
  author.innerText = book.author;
  removeBtn.innerText = 'remove';
  title.classList.add('title');
  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(removeBtn);
  return li;
}
}
const library = new BookList();

window.addEventListener('load', () => {
  const form = document.getElementById('booksForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('bookTitle');
    const author = document.getElementById('bookAuthor');
    const book = {
      title: title.value,
      author: author.value,
      id: Date.now(),

    };
    library.addBook(book);
  });
  const books = localStorage.getItem('books');
  if (books) {
    library.list = JSON.parse(books);
  }
  library.displayBooks();
});
