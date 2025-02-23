import { refs } from '../main.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

function imageTemplate(image) {
  return ` <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img
            class="card-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
          />
          <div class="card-descr">
            <div class="card-descr-elem">
              <p class="elem-titel">Likes</p>
              <p class="elem-value">${image.likes}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Views</p>
              <p class="elem-value">${image.views}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Comments</p>
              <p class="elem-value">${image.comments}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Downloads</p>
              <p class="elem-value">${image.downloads}</p>
            </div>
          </div>
        </a>
      </li>`;
}

export function renderGallery(images) {
  const markup = images.map(imageTemplate).join('');
  refs.gallery.innerHTML = markup;
  lightbox.refresh();
}
