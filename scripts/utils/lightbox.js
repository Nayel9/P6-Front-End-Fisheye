let mediaContainer;
let lightbox;
let lightboxMedia;
let lightboxTitle;
let prevButton;
let nextButton;
let closeButton;
let currentIndex = 0;

function init() {
    mediaContainer = document.querySelector('#photo-grid');
    lightbox = document.querySelector('#lightbox_bground');
    lightboxMedia = document.querySelector('.lightbox_media');
    lightboxTitle = document.querySelector('.lightbox_title');
    prevButton = document.querySelector('.lightbox_left-button');
    nextButton = document.querySelector('.lightbox_right-button');
    closeButton = document.querySelector('.close_btn-lightbox');

    mediaContainer.addEventListener('click', (event) => {
        const mediaItem = event.target.closest('.media');
        if (mediaItem) {
            currentIndex = Array.from(mediaContainer.children).indexOf(mediaItem.parentElement);
            openLightbox();
        }
    });

    mediaContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const mediaItem = event.target.closest('.media');
            if (mediaItem) {
                currentIndex = Array.from(mediaContainer.children).indexOf(mediaItem.parentElement);
                openLightbox();
            }
        }
    });

    prevButton.addEventListener('click', showPrevMedia);
    nextButton.addEventListener('click', showNextMedia);
    closeButton.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', handleKeydown);
}

function trapFocus(event) {
    if (!lightbox.contains(event.target)) {
        event.stopPropagation();
        lightbox.focus();
    }
}

function openLightbox() {
    const mediaItem = mediaContainer.children[currentIndex];
    const media = mediaItem.querySelector('img, video');
    const titleText = mediaItem.querySelector('.text_content p').textContent;
    const photographerName = document.querySelector('.photograph-header article h1').textContent;



    lightboxMedia.innerHTML = '';
    lightboxTitle.innerHTML = '';

    if (media.tagName === 'IMG') {
        const img = document.createElement('img');
        img.src = media.src;
        img.alt = media.alt;
        lightboxMedia.appendChild(img);
    } else if (media.tagName === 'VIDEO') {
        const video = document.createElement('video');
        video.src = media.src;
        video.controls = true;
        lightboxMedia.appendChild(video);
    }


    const title = document.createElement('h3');
    title.textContent = titleText;
    lightboxTitle.appendChild(title);


    lightboxMedia.setAttribute('aria-label', `photo de ${photographerName} ayant pour titre ${titleText}`);

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';

    document.querySelector('main').setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Lightbox dialog');

    lightbox.focus();
    document.addEventListener('focus', trapFocus, true);
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    document.querySelector('main').setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-hidden', 'true');
    document.removeEventListener('focus', trapFocus, true);

}

function showPrevMedia() {
    currentIndex = (currentIndex - 1 + mediaContainer.children.length) % mediaContainer.children.length;
    openLightbox();
}

function showNextMedia() {
    currentIndex = (currentIndex + 1) % mediaContainer.children.length;
    openLightbox();
}

function handleKeydown(event) {
    // If the lightbox is not displayed, do nothing
    if (lightbox.style.display !== 'block') {
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
            showPrevMedia();
            break;
        case 'ArrowRight':
            showNextMedia();
            break;
        case 'Escape':
            closeLightbox();
            break;
        case ' ':
            // If the current media is a video, play or pause it
            const media = lightboxMedia.querySelector('video');
            if (media) {
                if (media.paused) {
                    media.play();
                } else {
                    media.pause();
                }
                event.preventDefault(); // Prevent the default action (scrolling)
            }
            break;
    }
}
document.addEventListener('DOMContentLoaded', init);