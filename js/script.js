const books= document.getElementById('books');
const form= document.getElementById('add-form');
const title= document.getElementById('title');
const author= document.getElementById('author');
const addBtn= document.getElementById('addBtn');
const date = document.getElementById('date');

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

const library = new BookCollection();

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bookdata')){
    const books =  JSON.parse(localStorage.getItem('bookdata'));
    library.showBooks(books);
  } 
 
  if (localStorage.getItem('bookdata')=='[]' || !localStorage.getItem('bookdata')){
    books.innerHTML='<li>No books</li>'
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

const menu = document.getElementById("menu");
const links = menu.querySelectorAll('li');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    document.querySelectorAll('section').forEach((section) => {
      if (section.id==event.target.dataset.id){
        section.classList.add('show');
      } else {
        section.classList.remove('show');
      }
    })

    menu.querySelectorAll('li').forEach((li) => {
      if (li.dataset.id==event.target.dataset.id){
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    })
    
  })
});




function getNumberSuffix(num) {
  const th = 'th'
  const rd = 'rd'
  const nd = 'nd'
  const st = 'st'

  if (num === 11 || num === 12 || num === 13) return th

  let lastDigit = num.toString().slice(-1)

  switch (lastDigit) {
    case '1': return st
    case '2': return nd
    case '3': return rd
    default:  return th
  }
}

setInterval(()=>{
  let DateTime = luxon.DateTime;
  let today = DateTime.local();
  let modified=today.toLocaleString({...DateTime.DATETIME_MED_WITH_SECONDS, month:'long',}).split(" ");
  let dateNum=parseInt(modified[1]);
  modified[1]=dateNum+getNumberSuffix(dateNum);
  date.innerHTML=modified.join(" ");
}, 1000)
