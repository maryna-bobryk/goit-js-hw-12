import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImage } from './js/pixabay-api';
import { renderGallery, addRenderGallery } from './js/render-functions.js';

const iziToastOptions = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  color: '#EF4040',
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

const showErrorMessage = message => {
  iziToast.show({
    ...iziToastOptions,
    message,
  });
};

export const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('.form-button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.load-btn'),
};

//============================================================

const params = {
  q: null,
  page: 1,
  total: null,
};

//============================================================

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  showLoader();

  params.q = e.target.elements.image.value.trim();
  params.page = 1;

  if (!params.q) {
    hideLoader();
    showErrorMessage('Please enter a search term!');
    return;
  }
  try {
    const images = await getImage(params.q, params.page);
    if (images.hits.length === 0) {
      hideLoader();
      showErrorMessage('No images found. Try a different search');
      return;
    }
    renderGallery(images.hits);
    params.total = images.totalHits;
    checkPageStatus();
  } catch (err) {
    showErrorMessage('Oops! Something went wrong');
    console.error(err);
  }

  hideLoader();
});

//======================= BUTTON LOAD MORE ===========================

refs.btnLoadMore.addEventListener('click', async () => {
  params.page += 1;
  showLoader();
  try {
    const images = await getImage(params.q, params.page);
    addRenderGallery(images.hits);
    checkPageStatus();
    scrollPage();
  } catch (err) {
    showErrorMessage('Oops! Something went wrong');
    console.error(err);
  }
  hideLoader();
});

//======================= SHOW-HIDE ==========================

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showLoadMoreBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideLoadMoreBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function checkPageStatus() {
  const perPage = 40;
  const maxPage = Math.ceil(params.total / perPage);

  if (params.page >= maxPage) {
    hideLoadMoreBtn();
    showErrorMessage('It seems you have reached the end');
  } else {
    showLoadMoreBtn();
  }
}

function scrollPage() {
  let elem = refs.gallery.firstElementChild;
  let rect = elem.getBoundingClientRect();
  let height = rect.height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

// function getCardHight() {
//   let elem = refs.gallery.firstElementChild;
//   let rect = elem.getBoundingClientRect();
//   return rect.height * 2;
// }

// let elem = document.querySelector('div');
// let rect = elem.getBoundingClientRect();
// for (const key in rect) {
//   if (typeof rect[key] !== 'function') {
//     let para = document.createElement('p');
//     para.textContent = `${key} : ${rect[key]}`;
//     document.body.appendChild(para);
//   }
// }

// window.scrollBy({
//   top: 100,
//   left: 100,
//   behavior: 'smooth',
// });
