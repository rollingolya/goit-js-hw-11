import axios from "axios";

export default class PixabayAPIService {
  constructor() {
    this.BASE_URL = 
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&safesearch=true';
    this.key = API_KEY;
    this.query = '';
    this.page = 1;
    this.perPage = 40;
    this.lengthArrayPhotos;
  }

  // async getData(data, page) {
  //   const BASE_URL = 'https://pixabay.com/api/';
  //   const API_KEY = '32696495-07435a1a5289ed6a1ea4b625f';
  
  //   const apiData = await axios.get(
  //       `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  //   );
  //   return apiData;
  // }
  
}

async function getData(data, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32696495-07435a1a5289ed6a1ea4b625f';

  const apiData = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return apiData;
}

export default { getData };