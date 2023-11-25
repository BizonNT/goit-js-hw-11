import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40836630-710aac82fe531023a7159c672';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';

axios.defaults.baseURL = BASE_URL;

export function searchRequest(q, per_page, page) {
  const options = {
    // method: 'GET',
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
  return axios.get("", options).then(resp => resp.data);
}
