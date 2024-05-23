class PhotographerPage {
    constructor() {
        this.dropdown = document.querySelector('.dropdown');
        this.options = document.querySelector('.dropdown-menu');
        this.dropdownButton = document.querySelector('.dropdown');
        this.dropdownIcon = document.querySelector('.dropdown-icon');
        this.dropdownOptions = document.querySelectorAll('.dropdown-option');
        this.selectedOption = document.querySelector('#filter-popularite');
        this.photographerId = new URLSearchParams(window.location.search).get('id');
    }

    init() {
    this.fetchPhotographerData();
    this.fetchPhotoData();
    this.initDropdown();
    this.initDropdownOptions();
    this.initPageLoad();
}
   fetchPhotographerData() {
    // Vérifiez si les informations du photographe sont déjà stockées dans le localStorage
    const storedPhotographer = localStorage.getItem('photographer');

    if (storedPhotographer) {
        // Si les informations du photographe sont stockées, parsez-les et utilisez-les
        const photographer = JSON.parse(storedPhotographer);
        this.renderPhotographerData(photographer);
    } else {
        // Si les informations du photographe ne sont pas stockées, faites une requête pour les récupérer
        fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                const photographer = data.photographers.find(p => p.id === parseInt(this.photographerId));
                this.renderPhotographerData(photographer);

                // Stockez les informations du photographe dans le localStorage
                localStorage.setItem('photographer', JSON.stringify(photographer));
            });
    }
}

    renderPhotographerData(photographer) {
        // Créer les éléments HTML pour chaque information
        const nameElement = document.createElement('h1');
        nameElement.textContent = photographer.name;
        nameElement.setAttribute('tabindex', '0');

        const cityCountryElement = document.createElement('p');
        cityCountryElement.textContent = `${photographer.city}, ${photographer.country}`;
        cityCountryElement.classList.add('cityCountry');
        cityCountryElement.setAttribute('tabindex', '0');

        const taglineElement = document.createElement('p');
        taglineElement.textContent = photographer.tagline;
        taglineElement.classList.add('tagLine');
        taglineElement.setAttribute('tabindex', '0');

        // Grouper les informations dans une balise article
        const infoArticle = document.createElement('article');
        infoArticle.className = 'infos_photographers';
        infoArticle.setAttribute('aria-label', 'informations sur le photographe');
        infoArticle.appendChild(nameElement);
        infoArticle.appendChild(cityCountryElement);
        infoArticle.appendChild(taglineElement);
        infoArticle.setAttribute('tabindex', '0');

        const imgArticle = document.createElement('article');
        imgArticle.className = 'img_article-container';

        // Créer une balise div pour l'image
        const imgContainer = document.createElement('div');
        imgContainer.className = 'img_container';
        imgContainer.setAttribute('tabindex', '0');
        imgContainer.setAttribute('aria-label', `Portait du Photographe ${name}`);

        imgArticle.appendChild(imgContainer);

        const imgElement = document.createElement('img');
        imgElement.src = `assets/photographers/${photographer.portrait}`;
        imgElement.alt = `Portrait du photographe ${photographer.name}`;

        // Ajouter l'image à la balise  div
        imgContainer.appendChild(imgElement);

        // Ajouter les éléments à la section photograph-header
        const headerElement = document.querySelector('.photograph-header');
        headerElement.insertBefore(infoArticle, headerElement.firstChild); // place l'article avant le premier enfant (le bouton)
        headerElement.appendChild(imgArticle); // place la balise article contenant l'image après le bouton
    }

    initDropdown() {
        this.options.style.display = 'none';
        this.dropdownButton.addEventListener('click', () => this.toggleDropdown());
        this.dropdownButton.addEventListener('keydown', (event) => this.handleDropdownKeydown(event));
    }

    toggleDropdown() {
        if (this.options.style.display === 'none') {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    openDropdown() {
        this.options.style.display = 'block';
        this.dropdown.classList.add('open');
        document.querySelector('.selected').classList.add('open');
        this.dropdownIcon.classList.remove('close-rotate');
        this.dropdownIcon.classList.add('open-rotate');
    }

    closeDropdown() {
        this.options.style.display = 'none';
        this.dropdown.classList.remove('open');
        document.querySelector('.selected').classList.remove('open');
        this.dropdownIcon.classList.remove('open-rotate');
        this.dropdownIcon.classList.add('close-rotate');
    }

    handleDropdownKeydown(event) {
        switch (event.key) {
            case 'Enter':
                this.toggleDropdown();
                break;
            case 'ArrowUp':
                if (this.selectedOption.previousElementSibling) {
                    this.selectedOption = this.selectedOption.previousElementSibling;
                }
                break;
            case 'ArrowDown':
                if (this.selectedOption.nextElementSibling) {
                    this.selectedOption = this.selectedOption.nextElementSibling;
                }
                break;
        }
    }

    initDropdownOptions() {
        this.dropdownOptions.forEach(option => {
            option.addEventListener('click', () => this.selectOption(option));
            option.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.selectOption(option);
                }
            });
        });
    }

    selectOption(option) {
        const selectedElement = document.querySelector('.dropdown .selected');
        selectedElement.textContent = option.textContent;

        if (this.selectedOption) {
            this.selectedOption.classList.remove('hidden');
        }
        option.classList.add('hidden');
        this.selectedOption = option;
    }

    initPageLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            const selectedElement = document.querySelector('.dropdown .selected');
            const defaultOption = document.querySelector('#filter-popularite');
            selectedElement.textContent = defaultOption.textContent;
            defaultOption.classList.add('hidden');
        });
    }
   fetchPhotoData() {
    // Vérifiez si les médias sont déjà stockés dans le localStorage
    const storedMedia = localStorage.getItem('media');

    if (storedMedia) {
        // Si les médias sont stockés, parsez-les et utilisez-les
        const media = JSON.parse(storedMedia);
        this.renderPhotoData(media, this.photographerName);
    } else {
        // Si les médias ne sont pas stockés, faites une requête pour les récupérer
        fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                const photographer = data.photographers.find(p => p.id === parseInt(this.photographerId));
                const photos = data.media.filter(p => p.photographerId === parseInt(this.photographerId));
                this.renderPhotoData(photos, photographer.name);

                // Stockez les médias dans le localStorage
                localStorage.setItem('media', JSON.stringify(photos));
            });
    }
}

renderPhotoData(photos, photographerName) {
    const photoGrid = document.querySelector('.photo-grid');
    const mediaFactory = new MediaFactory();

    photos.forEach(photoData => {
        const media = mediaFactory.createMedia(photoData);
        const mediaElement = media.createElement();

        // Créer une balise div avec la classe media_card
        const mediaCard = document.createElement('div');
        mediaCard.className = 'media_card';
        mediaCard.tabIndex = 0; // Rendre la media_card focusable
        mediaCard.role = 'group'; // Ajouter un rôle ARIA

        // Ajouter l'élément media à la balise media_card
        mediaCard.appendChild(mediaElement);

        // Créer une balise div avec la classe content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card_content';

        // Créer une balise p pour le nom de la photo ou de la vidéo
        const nameP = document.createElement('p');
        nameP.textContent = media.title;
        contentDiv.appendChild(nameP);

        // Créer une balise div pour le nombre de likes et le solid heart
        const likesDiv = document.createElement('div');
        likesDiv.className = 'like_number';

        // Créer une balise p pour le nombre de likes
        const likesP = document.createElement('p');
        likesP.textContent = `${media.likes} `;
        likesDiv.appendChild(likesP);

        // Créer une balise i pour le solid heart
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fa-solid fa-heart';
        // Ajouter la balise i à la balise div like_numer
        likesDiv.appendChild(heartIcon);

        // Ajouter la balise like_numer à la balise content
        contentDiv.appendChild(likesDiv);

        // Ajouter la balise content à la balise media_card
        mediaCard.appendChild(contentDiv);

        // Ajouter la balise media_card à la grille de photos
        photoGrid.appendChild(mediaCard);
    });
}
}

class MediaFactory {
    createMedia(mediaData) {
        if (mediaData.image) {
            return new Photo(mediaData);
        } else if (mediaData.video) {
            return new Video(mediaData);
        }
    }
}

class Media {
    constructor(mediaData) {
        this.title = mediaData.title;
        this.likes = mediaData.likes;
    }

    createElement() {
        throw new Error("Method 'createElement' must be implemented.");
    }
}

class Photo extends Media {
    constructor(mediaData) {
        super(mediaData);
        this.image = mediaData.image;
    }

    createElement() {
        const imgElement = document.createElement('img');
        imgElement.src = `assets/images/media/${this.image}`;
        imgElement.alt = this.title;
        return imgElement;
    }
}

class Video extends Media {
    constructor(mediaData) {
        super(mediaData);
        this.video = mediaData.video;
    }

    createElement() {
        const vidElement = document.createElement('video');
        vidElement.src = `assets/images/media/${this.video}`;
        vidElement.alt = this.title;
        vidElement.controls = true;
        return vidElement;
    }
}

const photographerPage = new PhotographerPage();
photographerPage.init();