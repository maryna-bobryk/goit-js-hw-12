import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23727869-9ab5af5c09b745cc02503bdaa';

export async function getImage(userInput, page) {
  const params = {
    key: API_KEY,
    q: userInput,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  };
  try {
    const res = await axios.get(BASE_URL, { params });
    return res.data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
