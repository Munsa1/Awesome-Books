const books= document.getElementById('books');
const form= document.getElementById('add-form');
const title= document.getElementById('title');
const author= document.getElementById('author');
const addBtn= document.getElementById('addBtn');
const date = document.getElementId('date');

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
        
        if (!this.collection.some(a=>a.author==formData.author && a.title==formData.title)) {
          this.collection.unshift(formData);
        }      
        localStorage.setItem('bookdata', JSON.stringify(this.collection));
        this.showBooks(this.collection);
      } else {
        localStorage.setItem('bookdata', JSON.stringify([formData]))
        this.showBooks( JSON.parse(localStorage.getItem('bookdata')));
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
      if (this.collection.length===0){
        books.innerHTML='<li>No books</li>'
      }
    }
  }