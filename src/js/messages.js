export function checkSearchParam(item) {
  if (!item) {
    throw new Error(
      'Sorry, there are no parameter into your search query. Please try again'
    );
  }
}

export function checkTotalHits(item) {
  if (item === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}

