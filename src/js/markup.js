import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: true,
  close: true,
});

import { loadMore, imageList, perPage } from './index';

function cardMarkup(array) {
  return array.hits
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
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  lightbox.refresh();
  if (array.totalHits > perPage * page) {
    loadMore.classList.remove('hidden-item');
    page += 1;
  }
  return page;
}
