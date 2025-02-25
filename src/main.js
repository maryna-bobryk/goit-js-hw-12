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
      showErrorMessage();
      return;
    }
    renderGallery(images.hits);
    params.total = images.totalHits;
    checkPageStatus();
  } catch (err) {
    hideLoader();
    showErrorMessage('Oops! Something went wrong. Please try again later.');
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
  } catch (err) {
    hideLoader();
    showErrorMessage('Oops! Something went wrong. Please try again later.');
    console.error(err);
  }
  hideLoader();
});

//======================= BUTTONS SHOW-HIDE ==========================

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
