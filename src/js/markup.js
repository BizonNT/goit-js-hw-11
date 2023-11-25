import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { softAdd } from './scroll';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: true,
  close: true,
});

import { imageList, selector } from './index';

function cardMarkup(array) {
  return array
    .map(
      ({
        downloads,
        comments,
        views,
        likes,
        tags,
        largeImageURL,
        webformatURL,
      }) =>
        `<div class="photo-card">
          <a class="image-link" href="${largeImageURL}">
            <img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
            <b>Comments</b>
            ${comments}
            </p>
            <p class="info-item">
            <b>Downloads</b>
            ${downloads}
            </p>
          </div>
        </div>
    `
    )
    .join('');
}

export function createMarkup(array, page) {
  if (page === 1) {
    imageList.innerHTML = cardMarkup(array);
  } else {
    imageList.insertAdjacentHTML('beforeend', cardMarkup(array));
    if (selector.children.scrollType.value === 'loadMore') {
      softAdd();
    }
  }
  lightbox.refresh();
}

export function elementHide(item) {
  item.classList.add('hidden-item');
}
export function elementShow(item) {
  item.classList.remove('hidden-item');
}
