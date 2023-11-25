import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '300px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

import SlimSelect from 'slim-select';

import { searchRequest } from './servises';
import { createMarkup, elementHide, elementShow } from './markup';
import { getPage } from './scroll';

const formSearch = document.querySelector('#search-form');
const imageList = document.querySelector('.js-list');
const loadMore = document.querySelector('.js-load-more');
const selector = document.querySelector('.js-select');
const partner = document.querySelector('.js-partner');

let startPage = 1;
let serchItem = '';
let perPage = '';

formSearch.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', clickLoadMore);

new SlimSelect({
  select: '#pages-count',
  settings: {
    showSearch: false,
  },
});
new SlimSelect({
  select: '#scroll',
  settings: {
    showSearch: false,
  },
});

function onSubmit(event) {
  event.preventDefault();
  elementHide(selector);
  elementHide(partner);
  startPage = 1;
  serchItem = event.currentTarget.elements.searchQuery.value;
  perPage = selector.children.perPage.value;
  searchRequest(serchItem.trim(), perPage, startPage)
    .then(response => {
      if (response.totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again'
        );
      }
      createMarkup(response, startPage);
      startPage = getPage(response, startPage);
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images`);
    })
    .catch(error => onError(error.message));
}

function clickLoadMore(event) {
  event.preventDefault();
  clickNextLoad();
}

export function clickNextLoad() {
  searchRequest(serchItem, perPage, startPage)
    .then(response => {
      if (response.totalHits === 0) {
        throw new Error('Sorry, something went wrong. Please try again');
      }
      if (response.totalHits <= perPage * startPage) {
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of ${response.totalHits} search results.`
        );
      }
      createMarkup(response, startPage);
      elementHide(loadMore);
      startPage = getPage(response, startPage);
    })
    .catch(error => onError(error.message));
}

function onError(message) {
  Notiflix.Notify.failure(message);
  elementHide(loadMore);
  elementShow(selector);
  elementShow(partner);
  imageList.innerHTML = '';
  formSearch.elements.searchQuery.value = '';
}

export { loadMore, imageList, selector, perPage };
