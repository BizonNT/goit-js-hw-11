import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '40836630-710aac82fe531023a7159c672';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';

const IMAGE_ID = '';

export function searchRequest(q, page, per_page) {
  const axios = require('axios').default;
  const options = {
    method: 'GET',
    params: {
      key: API_KEY,
      q,
      image_type: IMAGE_TYPE,
      orientation: ORIENTATION,
      safesearch: SAFESEARCH,
      page,
      per_page,
    },
  };
  return axios.get(`${BASE_URL}`, options).then(resp => resp);

  // return fetch(`${BASE_URL}`, options).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
}
