const tabs = document.querySelectorAll('nav-item');

tabs.forEach((tab) => {
     tab.addEventListener('click', (event) =>{
     tab.preventDefault();
     document.querySelector('select').classList.remove('select')
     tab.classList.add('select');
     const iD = tab.getAttribute('href').slice('1');
     const selectedSection = document.querySelector('selected-tab');
     
     });
});