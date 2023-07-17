import '/src/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'Simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.search-input');
const buttonLoadEl = document.querySelector('.load-more');

const KEY = '38295997-c79217038b4f657b51b1fa265';
const URL = 'https://pixabay.com/api/';

let currentPage = 1;
let searchText = '';
const perPage = 40;

let firstLoad = true;
let lightbox = new SimpleLightbox('.gallery a');

Notiflix.Notify.init({
  position: 'top-right',
  timeout: 2500,
  clickToClose: true,
});

document.addEventListener('DOMContentLoaded', () => {
  buttonLoadEl.classList.add('hidden');
});

formEl.addEventListener('submit', addElementList);

function addElementList(event) {
  resetData();
  event.preventDefault();
  searchText = inputEl.value;
  addImagesToPage(searchText);
}

function resetData() {
  buttonLoadEl.classList.add('hidden');
  galleryEl.innerHTML = '';
  currentPage = 1;
}

async function searchImage(searchText, page) {
  try {
    const response = await axios.get(URL, {
      params: {
        key: KEY,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: page,
      },
    });
    const dataResponse = await response.data;
    const totalHits = dataResponse.totalHits;
    const lengthHits = dataResponse.hits.length;

    if (lengthHits === 0 || searchText.trim() === '') {
      throw new Error(
        `Sorry, there are no images matching your search query. Please try again.`
      );
    }
    return { data: dataResponse.hits, totalHits };
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function addImagesToPage(searchText) {
  try {
    const { data, totalHits } = await searchImage(searchText, currentPage);
    if (currentPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    currentPage++;
    addGallery(data);
    lightbox.refresh();
    liteScroll();

    const displayedImages = galleryEl.querySelectorAll('.photo-card');
    const numDisplayedImages = displayedImages.length;

    if (numDisplayedImages >= totalHits) {
      buttonLoadEl.classList.add('hidden');
      Notiflix.Notify.success(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      buttonLoadEl.classList.remove('hidden');
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

function addGallery(data) {
  let cartImage = data
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<div class="photo-card">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>`;
      }
    )
    .join('\n');

  galleryEl.insertAdjacentHTML('beforeend', cartImage);
}

buttonLoadEl.addEventListener('click', () => {
  addImagesToPage(searchText);
});

function liteScroll() {
  if (!firstLoad) {
    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } else {
    firstLoad = false;
  }
}
