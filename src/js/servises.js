import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const API_KEY = '40836630-710aac82fe531023a7159c672';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';

export async function searchRequest(q, per_page, page) {
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
  return await axios.get(`${BASE_URL}`, options).then(resp => resp.data);
}
