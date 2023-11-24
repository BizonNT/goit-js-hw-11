import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '300px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

import { searchRequest } from './servises';
import { createMarkup } from './markup';

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
  serchItem = event.currentTarget.elements.searchQuery.value;
  searchRequest(serchItem.trim(), startPage, perPage)
    .then(response => {
      if (response.totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
      startPage = createMarkup(response, startPage);
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images`);
    })
    .catch(error => onError(error.message));
}

function clickLoadMore(event) {
  event.preventDefault();
  loadMore.classList.add('hidden-item');
  searchRequest(serchItem, startPage, perPage)
    .then(response => {
      if (response.totalHits === 0) {
        throw new Error('Sorry, something went wrong. Please try again');
      }
      startPage = createMarkup(response, startPage);
    })
    .catch(error => onError(error.message));
}

function onError(message) {
  Notiflix.Notify.failure(message);
  imageList.innerHTML = '';
  loadMore.classList.add('hidden-item');
  formSearch.elements.searchQuery.value = '';
}

export { loadMore, imageList, perPage };
