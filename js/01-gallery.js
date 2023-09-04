import { galleryItems } from './gallery-items.js';
// Change code below this line
const ulEl = document.querySelector('.gallery');
const markup = cratePicturesGallery(galleryItems);

ulEl.insertAdjacentHTML('beforeend', markup);
ulEl.addEventListener('click', onPictureClick);

function cratePicturesGallery(arr) {
  return arr.map(({ preview, original, description }) =>
    `<li data-preview="${preview} class="gallery_item js-gallery-item">
    <a class="gallery__link" href="${original}" rel="noopener noreferrer nofollow">
    <img src="${preview}" data-source="${original}" alt="${description}" class="gallery__image"/>
    </a>
    </li>`
  ).join("");
}

function onPictureClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return
  }
  
  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}" alt="${event.target.alt}">`,{
      onShow: () => {
        document.addEventListener('keydown', onEscBtnClose);
      },
      onClose: () => {
        document.removeEventListener('keydown', onEscBtnClose);
      },
    }
  );

  function onEscBtnClose(event) {
    if (event.key === "Escape" && instance.visible()) {
      instance.close();
    }
  }

  instance.show();
  
}
