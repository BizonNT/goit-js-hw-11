import { loadMore, perPage, selector, clickNextLoad } from './index';
import { elementShow } from './markup';

export function softAdd() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

const target = document.querySelector('.js-guard');

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let end = false;

let observer = new IntersectionObserver(onAdd, options);

function onAdd(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (end) {
        observer.unobserve(target);
      }
      clickNextLoad();
    }
  });
}

export function getPage(array, page) {
  if (array.totalHits > perPage * page) {
    page += 1;
    end = array.totalHits <= perPage * page;
    typeSelector(selector.children.scrollType.value);
  }
  return page;
}

function typeSelector(item) {
  if (item === 'loadMore') {
    elementShow(loadMore);
  } else {
    observer.observe(target);
  }
}
