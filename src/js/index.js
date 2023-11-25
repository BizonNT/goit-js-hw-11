import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { searchRequest } from './servises';
import { createMarkup, elementHide, elementShow } from './markup';
import { getPage } from './scroll';
import { checkSearchParam, checkTotalHits } from './messages';

Notiflix.Notify.init({
  width: '300px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

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

async function onSubmit(event) {
  try {
    event.preventDefault();
    elementHide(loadMore);
    elementHide(selector);
    elementHide(partner);
    startPage = 1;
    serchItem = event.currentTarget.elements.searchQuery.value.trim();
    checkSearchParam(serchItem);
    perPage = selector.children.perPage.value;
    const apiResponse = await searchRequest(serchItem, perPage, startPage);
    checkTotalHits(apiResponse.totalHits);
    createMarkup(apiResponse.hits, startPage);
    startPage = getPage(apiResponse.totalHits, startPage);
    Notiflix.Notify.success(`Hooray! We found ${apiResponse.totalHits} images`);
  } catch (error) {
    onError(error.message);
  }
}

function clickLoadMore(event) {
  event.preventDefault();
  clickNextLoad();
}

export async function clickNextLoad() {
  try {
    const apiAddResponse = await searchRequest(serchItem, perPage, startPage);
    if (apiAddResponse.totalHits <= perPage * startPage && startPage > 1) {
      Notiflix.Notify.info(
        `We're sorry, but you've reached the end of ${apiAddResponse.totalHits} search results.`
      );
    }
    createMarkup(apiAddResponse.hits, startPage);
    elementHide(loadMore);
    startPage = getPage(apiAddResponse.totalHits, startPage);
  } catch (error) {
    onError(error.message);
  }
}

function onError(message) {
  Notiflix.Notify.failure(message);
  elementHide(loadMore);
  elementShow(selector);
  elementShow(partner);
  imageList.innerHTML = '';
  formSearch.reset();
}

export { loadMore, imageList, selector, perPage };
