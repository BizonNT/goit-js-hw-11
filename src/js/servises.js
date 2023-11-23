import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '40836630-710aac82fe531023a7159c672';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';

const IMAGE_ID = '';

const axios = require('axios').default;

export async function searchRequest(q, page, per_page) {
  const options = {
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
  return await axios.get(`${BASE_URL}`, options);
}
