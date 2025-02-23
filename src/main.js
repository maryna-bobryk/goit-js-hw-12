import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImage } from './js/pixabay-api';
import { renderGallery } from './js/render-functions.js';

const iziToastOptions = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

export const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('.form-button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  const userInput = e.target.elements.image.value.trim();

  if (!userInput) {
    iziToast.show({
      ...iziToastOptions,
      message: 'Please enter a search term!',
    });
    return;
  }

  refs.loader.classList.remove('hidden');

  getImage(userInput)
    .then(images => {
      refs.loader.classList.add('hidden');
      if (images.length === 0) {
        iziToast.show({
          ...iziToastOptions,
          message: 'No images found. Try a different search term!',
        });
        return;
      }
      renderGallery(images);
    })
    .catch(err => {
      refs.loader.classList.add('hidden');
      iziToast.show({
        ...iziToastOptions,
        message: 'Oops! Something went wrong. Please try again later.',
      });
      console.log(err);
    });
});
