import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './js/api';
import { createMarkup } from './js/markup';
// import PixabayAPIService from "./js/api";

// const pixabayAPIService = new PixabayAPIService();

const lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  captionsData: 'alt',
  captionDelay: 250,
});

const getEl = selector => document.querySelector(selector);
let page = 1;
const perPage = 40;

getEl('.search-form').addEventListener('submit', onSubmit);
getEl('.gallery').addEventListener('click', e => e.preventDefault());

// функція після натискання на кнопку форми
async function onSubmit(e) {
  e.preventDefault();
  const value = getEl('.search-form').elements.searchQuery.value;
  getEl('.gallery').innerHTML = '';
  page = 1;

  const formData = new FormData(e.target);
  const searchQuery = formData.get('searchQuery').trim();

  if (!searchQuery || searchQuery.length < 3) {
    Notiflix.Notify.warning(
      'Warning! Search must not be empty and includes more then 2 letters'
    );
    return;
  }

  const res = await API.getData(value, page)
      if (res.data.hits.length === 0) {
          return Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again'
          );
      } else {
          Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images`);
          createMarkup(res.data.hits, getEl('.gallery'));
          lightbox.refresh();
      };
}

// const responseData = API.getData(data, page);
// const imageData = responseData.data.hits;
// (imageData.length < per_page || (page * per_page) >= responseData.data.totalHits)
// для сповіщення, що завершились картинки на cats (500 зображень)

const onEntry = entries => {
  entries.forEach(async entry => {
    if (entry.isIntersecting && getEl('.img-link')) {
      page += 1;
      const value = getEl('.search-form').elements.searchQuery.value.trim();
      const res = await API.getData(value, page)
        if (res.data.hits.length === 0 
          // && pixabayAPIService.lengthArrayPhotos < pixabayAPIService.perPage
          ) {
          page -= 1;
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        } else {
          createMarkup(res.data.hits, getEl('.gallery'));
          lightbox.refresh();
        };
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
rootMargin: '100px',
});
observer.observe(getEl('footer'));