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
    if (!end) {
      if (entry.isIntersecting) {
        clickNextLoad();
      }
    } else {
      observer.unobserve(target);
    }
  });
}

export function getPage(item, page) {
  if (item > perPage * page) {
    page += 1;
    end = item <= perPage * page;
    typeSelector(selector.children.scrollType.value);
  }
  return page;
}

function typeSelector(item) {
  if (item === 'loadMore') {
    elementShow(loadMore);
    observer.unobserve(target);
  } else {
    observer.observe(target);
  }
}
