import axios from "axios";
import Notiflix from "notiflix";
import simpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './js/api';
import { createMarkup } from './js/markup';

const lightbox = new SimpleLightbox('.gallery a', {
    docClose: true,
    captionsData: 'alt',
    captionDelay: 250,
});

const getEl = selector => document.querySelector(selector);
let page = 1;

getEl('.search-form').addEventListener('submit', onSubmit);
getEl('.gallery').addEventListener('click', e => e.preventDefault());

function onSubmit(e) {
    e.preventDefault();
    const value = getEl('.search-form').elements.searchQuery.value;
    getEl('.gallery').innerHTML = '';
    page = 1;
    API.getData(value, page).then(res => {
        if (res.data.hits.length === 0) {
            return Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again'
            );
        } else {
            Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images`);
            createMarkup(res.data.hits, getEl('.gallery'));
            lightbox.refresh();
        }
    });
}

const onEntry = entries => {
    entries.forEach(async entry => {
      if (entry.isIntersecting && getEl('.img-link')) {
        page += 1;
        const value = getEl('.search-form').elements.searchQuery.value.trim();
        await API.getData(value, page).then(res => {
          if (res.data.hits.length === 0) {
            page -= 1;
            Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
            return;
          } else {
            createMarkup(res.data.hits, getEl('.gallery'));
            lightbox.refresh();
          }
        });
      }
    });
  };

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
observer.observe(getEl('footer'));
