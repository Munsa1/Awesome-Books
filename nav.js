const tabs = document.querySelectorAll('nav-item');

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    tab.preventDefault();
    document.querySelector('select').classList.remove('select');
    tab.classList.add('select');
    const iD = tab.getAttribute('href').slice('1');
    const selectedSection = document.querySelector('selected-tab');

    if (selectedSection) {
      selectedSection.classList.remove('selected-tab');
    }

    const section = document.getElementById(iD);
    if (section) {
      section.classList.add('selected-tab');
    }
  });
});