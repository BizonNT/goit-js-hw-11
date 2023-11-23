import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '300px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

import { searchRequest } from './servises';
import { cardMarkup } from './markup';

const formSearch = document.querySelector('#search-form');
const imageList = document.querySelector('.js-list');
const loadMore = document.querySelector('.js-load-more');

let startPage = 1;
let serchItem = '';
let perPage = '20';

formSearch.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', clickLoadMore);

function onSubmit(event) {
  event.preventDefault();
  startPage = 1;
  console.log(startPage);
  serchItem = event.currentTarget.elements.searchQuery.value;
  searchRequest(serchItem.trim(), startPage, perPage)
    .then(response => {
      if (response.data.totalHits === 0) {
        throw new Error(
          'Sorry, there ara no images matching your search query. Please try again'
        );
      }
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images`
      );
      imageList.innerHTML = cardMarkup(response.data);
      let lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        showCounter: true,
      });
      if (response.data.totalHits > 20) {
        loadMore.classList.remove('hidden-item');
        startPage += 1;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}

function clickLoadMore(event) {
  event.preventDefault();
  loadMore.classList.add('hidden-item');
  console.log(startPage);
  searchRequest(serchItem, startPage, perPage)
    .then(response => {
      console.log(response);
      console.log(response.data.totalHits);

      if (response.data.totalHits === 0) {
        throw new Error('Sorry, something went wrong. Please try again');
      }
      imageList.insertAdjacentHTML('beforeend', cardMarkup(response.data));
      let lightbox = new SimpleLightbox('.gallery a');
      if (response.data.totalHits > perPage * startPage) {
        loadMore.classList.remove('hidden-item');
        startPage += 1;
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}

// c
//   /* options */

// });
