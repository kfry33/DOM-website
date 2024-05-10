const theme = 'theme';
const dataTheme = 'data-theme';
const themeTab = '.theme-tab';
const switcherBtn = '.switcher-btn';
const dark = 'dark';
const light = 'light';
const open = 'open';
const active = 'active';

const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const dataFilter = '[data-filter]';
const portfolioData = '[data-item]'


const root = document.documentElement;

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector('#search');

/* Portfolio- Gallery */
// const gallery = document.querySelector('portfolio-grid');
// const images = gallery.querySelectorAll(img);
const folioGallery = [
  {
    dataItem: 'web',
    img: './assets/images/portfolio-1.jpg',
    divHead: 'Web Devlopment',
    h3Sub: 'Travel Website'
  },
  {
    dataItem: 'web',
    img: './assets/images/portfolio-2.jpg',
    divHead: 'Web Devlopment',
    h3Sub: 'Skate Website'
  }, 
  {
    dataItem: 'web',
    img: './assets/images/portfolio-3.jpg',
    divHead: 'Web Devlopment',
    h3Sub: 'Eating Website'
  }, 
  {
    dataItem: "ui",
    img: './assets/images/portfolio-4.jpg',
    divHead: 'UI Design',
    h3Sub: 'Cool Design'
  }, 
  {
    dataItem: 'app',
    img: './assets/images/portfolio-5.jpg',
    divHead: 'App Devlopment',
    h3Sub: 'Game App'
  }, 
  {
    dataItem: 'app',
    img: './assets/images/portfolio-6.jpg',
    divHead: 'App Devlopment',
    h3Sub: 'Gambling App'
  }, 
  {
    dataItem: 'app',
    img: './assets/images/portfolio-7.jpg',
    divHead: 'App Devlopment',
    h3Sub: 'Travel App'
  }, 
  {
    dataItem: "ui",
    img: './assets/images/portfolio-8.jpg',
    divHead: 'UI Design',
    h3Sub: 'Fantastic Design'
  } 
];

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

const setActive = (elm, selector) => {
  if(document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  } 
  elm.classList.add(active);
}

const setTheme = (val) => {
  if(val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
}

if(currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if(currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener('click', function() {
  const tab = this.parentElement.parentElement;
  if(!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
})

for (const elm of switcher) {
  elm.addEventListener('click', function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  })
}

searchBox.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  
  portfolioItems.forEach((card) => {
    if(card.dataset.item.includes(searchInput)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  })
})

for(const link of filterLink) {
  link.addEventListener('click', function() {
    setActive(link, '.filter-link');
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if(filter === 'all') {
        card.style.display = 'block';
      } else if (card.dataset.item === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    })
  })
}

// Full Site Modal 'open buttons'
for (const elm of openModal) {
  elm.addEventListener('click', function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  })
}

// Full Site Modal 'close buttons'
for (const elm of closeModal) {
  elm.addEventListener('click', function() {
    this.parentElement.parentElement.classList.remove(isVisible);
  })
}

const imgGallery = document.querySelector(".portfolio-grid");
// const images = imgGallery.querySelectorAll('imgCard');

folioGallery.forEach((card) => {
  const imgCard = document.createElement('div');
  imgCard.classList.add('portfolio-card');
  imgCard.setAttribute('data-item', card.dataItem);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  imgCard.appendChild(cardBody);

  const cardImg = document.createElement('img');
  cardImg.setAttribute('src', card.img);
  cardImg.setAttribute('alt', 'portfolio icon');
  cardBody.appendChild(cardImg);

  const cardModal = document.createElement('a');
  cardModal.classList.add('card-popup-box');
  cardModal.setAttribute('href', '#');
  cardBody.appendChild(cardModal);

  const cardHeader = document.createElement('div');
  const divHeader = document.createTextNode(card.divHead)
  cardHeader.appendChild(divHeader);
  cardModal.appendChild(cardHeader);

  const cardSub = document.createElement('h3');
  const subText = document.createTextNode(card.h3Sub)
  cardSub.appendChild(subText);
  cardModal.appendChild(cardSub);

  imgGallery.appendChild(imgCard);
});
