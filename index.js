const books= document.getElementById('result-set');
const form= document.getElementById('books-form');
const title= document.getElementById('booktitle');
const author= document.getElementById('bookauthor');
const addBtn= document.getElementById('Submitbtn');

let formData={
  title:'',
  author: '',
}

class BookCollection {
  constructor () {
    this.collection = []
  }

  addBook(){
    if (localStorage.getItem('bookdata')){
      this.collection =  JSON.parse(localStorage.getItem('bookdata'));
      this.collection.unshift(formData);
      localStorage.setItem('bookdata', JSON.stringify(this.collection));
      this.showBooks(this.collection);
    } else {
      localStorage.setItem('bookdata', JSON.stringify([formData]))
      showBooks( JSON.parse(localStorage.getItem('bookdata')));
    }
    author.value='';
    title.value='';
  }

  showBooks(arr) {
  const htmlCode = arr.map((book) => `
    <li>
      <span>"${book.title}" by &nbsp;</span>
      <span class="author">${book.author}</span>
      <button type="button" data-id="${book.id}">Remove</button>
    </li>
  `).join('');
  books.innerHTML = htmlCode;

    const removeButtons = books.querySelectorAll('button');
    removeButtons.forEach((book) => {
      book.addEventListener('click', (event) => {
        this.removeBook(event.target.dataset.id);
      })
   });
  }

  removeBook(bookId) {
    this.collection = JSON.parse(localStorage.getItem('bookdata')).filter((item) =>item.id!=bookId);
    localStorage.setItem('bookdata', JSON.stringify(this.collection));
    this.showBooks(this.collection);
  }
}

const library = new BookCollection();

window.addEventListener('load', () => {
  if (localStorage.getItem('bookdata')){
    const books =  JSON.parse(localStorage.getItem('bookdata'));
    library.showBooks(books);
  } 
})


const formInputs = form.querySelectorAll('input[type="text"]');
formInputs.forEach((input) => {
  input.addEventListener('input', (event) => {
   formData={...formData, [event.target.id] : event.target.value, id:Date.now()}
  })
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  library.addBook();
})
