/**
 * @class PhotographerPage
 * @description Représente une page pour un photographe spécifique.
 */
class PhotographerPage {

    /**
     * @constructor
     * @description Construit une nouvelle instance de PhotographerPage.
     */
    constructor() {
        this.dropdown = document.querySelector('.dropdown');
        this.options = document.querySelector('.dropdown-menu');
        this.dropdownButton = document.querySelector('.dropdown');
        this.dropdownIcon = document.querySelector('.dropdown-icon');
        this.dropdownOptions = document.querySelectorAll('.dropdown-option');
        this.selectedOption = document.querySelector('#filter-popularite');
        this.photographerId = new URLSearchParams(window.location.search).get('id');
    }

    /**
     * @method init
     * @description Initialise la PhotographerPage.
     */
    init() {
        this.fetchPhotographerData();
        this.fetchPhotoData();
        this.initDropdown();
        this.initDropdownOptions();
        this.initPageLoad();
        this.fetchPricePhotographer();
    }

    /**
     * @method fetchPhotographerData
     * @description Récupère les données du photographe.
     */
    fetchPhotographerData() {
        fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                const photographer = data.photographers.find(p => p.id === parseInt(this.photographerId));
                this.renderPhotographerData(photographer);
                localStorage.setItem('photographerImage', photographer.portrait);
            });
    }

    /**
     * @method renderPhotographerData
     * @description Affiche les données du photographe.
     * @param {Object} photographer - Les données du photographe.
     */
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

    /**
     * @method initDropdown
     * @description Initialise le menu déroulant.
     */
    initDropdown() {
        this.options.style.display = 'none';
        this.dropdownButton.addEventListener('click', () => this.toggleDropdown());
        this.dropdownButton.addEventListener('keydown', (event) => this.handleDropdownKeydown(event));
    }

    /**
     * @method toggleDropdown
     * @description Bascule le menu déroulant.
     */
    toggleDropdown() {
        if (this.options.style.display === 'none') {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }

    /**
     * @method openDropdown
     * @description Ouvre le menu déroulant.
     */
    openDropdown() {
        this.options.style.display = 'block';
        this.dropdown.classList.add('open');
        document.querySelector('.selected').classList.add('open');
        this.dropdownIcon.classList.remove('close-rotate');
        this.dropdownIcon.classList.add('open-rotate');
    }

    /**
     * @method closeDropdown
     * @description Ferme le menu déroulant.
     */
    closeDropdown() {
        this.options.style.display = 'none';
        this.dropdown.classList.remove('open');
        document.querySelector('.selected').classList.remove('open');
        this.dropdownIcon.classList.remove('open-rotate');
        this.dropdownIcon.classList.add('close-rotate');
    }

    /**
     * @method handleDropdownKeydown
     * @description Gère les événements de touche pour le menu déroulant.
     * @param {Object} event - L'événement de touche.
     */
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

    /**
     * @method initDropdownOptions
     * @description Initialise les options du menu déroulant.
     */
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

    /**
     * @method selectOption
     * @description Sélectionne une option du menu déroulant.
     * @param {Object} option - L'option du menu déroulant à sélectionner.
     */
    selectOption(option) {
        const selectedElement = document.querySelector('.dropdown .selected');
        selectedElement.textContent = option.textContent;

        if (this.selectedOption) {
            this.selectedOption.classList.remove('hidden');
        }
        option.classList.add('hidden');
        this.selectedOption = option;
    }

    /**
     * @method initPageLoad
     * @description Initialise l'événement de chargement de la page.
     */
    initPageLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            const selectedElement = document.querySelector('.dropdown .selected');
            const defaultOption = document.querySelector('#filter-popularite');
            selectedElement.textContent = defaultOption.textContent;
            defaultOption.classList.add('hidden');
        });
    }

    /**
     * @method fetchPhotoData
     * @description Récupère les données des photos.
     */
    fetchPhotoData() {
        fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                const photos = data.media.filter(p => p.photographerId === parseInt(this.photographerId));
                this.renderPhotoData(photos, this.photographerName);

                photos.forEach(photo => {
                    if (photo.image) {
                        localStorage.setItem(`photoImage${photo.id}`, photo.image);
                    } else if (photo.video) {
                        localStorage.setItem(`photoVideo${photo.id}`, photo.video);
                    }
                });
            });
    }

    /**
     * @method renderPhotoData
     * @description Affiche les données des photos.
     * @param {Array} photos - Les données des photos.
     * @param {string} photographerName - Le nom du photographe.
     */
    renderPhotoData(photos, photographerName) {
        const photoGrid = document.querySelector('.photo-grid');
        const mediaFactory = new MediaFactory();

        photos.forEach(photoData => {
            const media = mediaFactory.createMedia(photoData);
            const mediaElement = media.createElement();

            const mediaCard = document.createElement('div');
            mediaCard.className = 'media_card';
            mediaCard.tabIndex = 0;
            mediaCard.role = 'group';

            mediaCard.appendChild(mediaElement);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'card_content';

            const nameP = document.createElement('p');
            nameP.textContent = media.title;
            contentDiv.appendChild(nameP);

            const likesDiv = document.createElement('div');
            likesDiv.className = 'like_number';

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

/**
 * @method fetchPricePhotographer
 * @param {Object} photographer - Les données du photographe.
 * @description Récupère le prix du photographe.
*/
    fetchPricePhotographer() {
        fetch('data/photographers.json')
            .then(response => response.json())
            .then(data => {
                const photographer = data.photographers.find(p => p.id === parseInt(this.photographerId));
                this.renderPricePhotographer(photographer);
            });
    }
    renderPricePhotographer(photographer) {
    const priceElement = document.createElement('p');
    priceElement.textContent = `${photographer.price}€/jour`;
    priceElement.setAttribute('tabindex', '0');
    priceElement.setAttribute('aria-label', `${photographer.price} euros par jour`);
    const priceDiv = document.querySelector('.price');
    priceDiv.appendChild(priceElement);
}

}

/**
 * @class MediaFactory
 * @description Usine pour créer des objets Media.
 */
class MediaFactory {

    /**
     * @method createMedia
     * @description Crée un nouvel objet Media.
     * @param {Object} mediaData - Les données pour le média.
     * @returns {Media} L'objet Media créé.
     */
    createMedia(mediaData) {
        if (mediaData.image) {
            return new Photo(mediaData);
        } else if (mediaData.video) {
            return new Video(mediaData);
        }
    }
}

/**
 * @class Media
 * @description Représente un élément multimédia.
 */
class Media {

    /**
     * @constructor
     * @description Construit une nouvelle instance de Media.
     * @param {Object} mediaData - Les données pour le média.
     */
    constructor(mediaData) {
        this.title = mediaData.title;
        this.likes = mediaData.likes;
    }

    /**
     * @method createElement
     * @description Crée un élément HTML pour le média.
     * @throws {Error} Si la méthode n'est pas implémentée.
     */
    createElement() {
        throw new Error("Method 'createElement' must be implemented.");
    }
}

/**
 * @class Photo
 * @description Représente une photo.
 * @extends Media
 */
class Photo extends Media {

    /**
     * @constructor
     * @description Construit une nouvelle instance de Photo.
     * @param {Object} mediaData - Les données pour la photo.
     */
    constructor(mediaData) {
        super(mediaData);
        this.image = mediaData.image;
    }

    /**
     * @method createElement
     * @description Crée un élément HTML pour la photo.
     * @returns {HTMLElement} L'élément HTML créé.
     */
    createElement() {
        const imgElement = document.createElement('img');
        imgElement.src = `assets/images/media/${this.image}`;
        imgElement.alt = this.title;
        return imgElement;
    }
}

/**
 * @class Video
 * @description Représente une vidéo.
 * @extends Media
 */

class Video extends Media {

    /**
     *
     * @constructor
     * @description Construit une nouvelle instance de Video.
     * @param {Object} mediaData - Les données pour la vidéo.
     */
    constructor(mediaData) {
        super(mediaData);
        this.video = mediaData.video;
    }

    /**
     * @method createElement
     * @description Crée un élément HTML pour la vidéo.
     * @returns {HTMLElement} L'élément HTML créé.
     */
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