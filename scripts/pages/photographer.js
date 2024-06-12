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
            this.media = [];
        }

        //    Fonctions Fetch

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
                    localStorage.setItem('photographerImage', photographer.photographers);
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
                    this.media = data.media.filter(p => p.photographerId === parseInt(this.photographerId));

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
         * @method fetchPricePhotographer
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

        //      Fonctions de rendu

        /**
         * @method renderPhotographerData
         * @description Affiche les données du photographe.
         * @param {Object} photographer - Les données du photographe.
         */
        renderPhotographerData(photographer) {
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

            const infoArticle = document.createElement('article');
            infoArticle.className = 'infos_photographers';
            infoArticle.setAttribute('aria-label', 'informations sur le photographe');
            infoArticle.appendChild(nameElement);
            infoArticle.appendChild(cityCountryElement);
            infoArticle.appendChild(taglineElement);
            infoArticle.setAttribute('tabindex', '0');

            const imgArticle = document.createElement('article');
            imgArticle.className = 'img_article-container';

            const imgContainer = document.createElement('div');
            imgContainer.className = 'img_container';
            imgContainer.setAttribute('tabindex', '0');
            imgContainer.setAttribute('aria-label', `Portait du Photographe ${photographer.name}`);

            imgArticle.appendChild(imgContainer);

            const imgElement = document.createElement('img');
            imgElement.src = `assets/photographers/${photographer.portrait}`;
            imgElement.alt = `Portrait du photographe ${photographer.name}`;

            imgContainer.appendChild(imgElement);

            const headerElement = document.querySelector('.photograph-header');
            headerElement.insertBefore(infoArticle, headerElement.firstChild);
            headerElement.appendChild(imgArticle);
        }

        /**
         * @method renderPhotoData
         * @description Affiche les données des photos.
         * @param {Array} photos - Les données des photos.
         */
        renderPhotoData(photos) {
            const photoGrid = document.querySelector('.photo-grid');

            while (photoGrid.firstChild) {
                photoGrid.removeChild(photoGrid.firstChild);
            }

            const mediaFactory = new MediaFactory();

            photos.forEach(photoData => {
                const media = mediaFactory.createMedia(photoData);
                const mediaElement = media.createElement();


                const mediaDiv = document.createElement('div');
                mediaDiv.className = 'media';
                mediaDiv.appendChild(mediaElement)

                const mediaCard = document.createElement('div');
                mediaCard.className = 'media_card';
                mediaCard.role = 'group';
                mediaCard.appendChild(mediaDiv);

                const contentDiv = document.createElement('div');
                contentDiv.className = 'card_content';

                const textDiv = document.createElement('div');
                textDiv.className = 'text_content';
                contentDiv.appendChild(textDiv);

                const nameP = document.createElement('p');
                nameP.textContent = media.title;
                textDiv.appendChild(nameP);

                const likesDiv = document.createElement('div');
                likesDiv.className = 'like_number';
                likesDiv.setAttribute('id', `${media.title}`);
                likesDiv.setAttribute('aria-label', `Nombre de likes pour le media ${media.title} : ${media.likes}`);
                likesDiv.setAttribute('tabindex', '0');
                textDiv.appendChild(likesDiv);

                const likesP = document.createElement('p');
                likesP.textContent = `${media.likes} `;
                likesDiv.appendChild(likesP);


                const heartIcon = document.createElement('em');
                heartIcon.className = 'fa-solid fa-heart';
                likesDiv.appendChild(heartIcon);

                contentDiv.appendChild(likesDiv);

                mediaCard.appendChild(contentDiv);

                photoGrid.appendChild(mediaCard);

            });

            this.attachLikeEventHandlers();
        }

        /**
         * @method renderPricePhotographer
         * @description Affiche le prix du photographe.
         * @param {Object} photographer - Les données du photographe.
         */
        renderPricePhotographer(photographer) {
            const priceElement = document.createElement('p');
            priceElement.textContent = `${photographer.price}€/jour`;
            priceElement.setAttribute('tabindex', '0');
            priceElement.setAttribute('aria-label', `${photographer.price} euros par jour`);
            const priceDiv = document.querySelector('.price');
            priceDiv.appendChild(priceElement);
        }

        //      Fonctions d'initialisation

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

        init() {
            this.fetchPhotographerData();
            this.initDropdown();
            this.initDropdownOptions();
            this.fetchPhotoData();
            this.fetchPricePhotographer();
        }

        //      Fonctions Handle

        /**
         * @method handleDropdownKeydown
         * @description Gère les événements de touche pour le menu déroulant.
         * @param {Object} event - L'événement de touche.
         */
        handleDropdownKeydown(event) {
            if (event.key === 'Enter') {
                this.toggleDropdown();
            }
        }

        /**
         * @method toggleDropdown
         * @description Bascule le menu déroulant.
         */
        handleLikeClick(event) {
            // Récupérer le titre du media à partir de l'ID de l'élément
            const mediaTitle = event.currentTarget.id;

            // Trouver le media correspondant dans les données JSON
            const media = this.media.find(media => media.title === mediaTitle);

            // Vérifier que le media a été trouvé
            if (media) {
                // Si le media a été aimé, décrémenter sa valeur "likes" et mettre à jour sa propriété "liked" à false
                // Si le media n'a pas été aimé, incrémenter sa valeur "likes" et mettre à jour sa propriété "liked" à true
                if (media.liked) {
                    media.likes--;
                    media.liked = false;
                } else {
                    media.likes++;
                    media.liked = true;
                }

                // Mettre à jour le contenu textuel de la balise p avec la nouvelle valeur de "likes"
                event.currentTarget.querySelector('p').textContent = media.likes;

                // Mettre à jour le total des likes
                this.updateTotalLikes();
            }
        }

        /**
         * @method handleLikeKeydown
         * @description Gère les événements de touche pour le menu déroulant.
         * @param {Object} event - L'événement de touche.
         */
        handleLikeKeydown(event) {
            // Vérifier si la touche "Entrée" a été pressée
            if (event.key === 'Enter') {
                this.handleLikeClick(event);
            }
        }

        //    Autres Fonctions

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
         * @method selectOption
         * @description Sélectionne une option du menu déroulant.
         * @param {Object} option - L'option du menu déroulant à sélectionner.
         */
        selectOption(option) {
            const selectedElement = document.querySelector('.dropdown .selected');
            selectedElement.textContent = option.textContent;
            selectedElement.setAttribute('aria-label', `Option sélectionnée : ${option.textContent}`);

            if (this.selectedOption) {
                this.selectedOption.classList.remove('hidden');
            }
            option.classList.add('hidden');
            this.selectedOption = option;

            switch (option.textContent) {
                case 'Popularité':
                    this.media.sort((a, b) => b.likes - a.likes);
                    break;
                case 'Date':
                    this.media.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'Titre':
                    this.media.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
            console.log('Médias triés:', this.media)


            this.renderPhotoData(this.media);

        }

        /**
         * @method fetchPhotographerData
         * @description Récupère les données du photographe.
         */
        attachLikeEventHandlers() {
    const likeNumberElements = document.querySelectorAll('.like_number');

    likeNumberElements.forEach(element => {
        element.addEventListener('click', this.handleLikeClick.bind(this));
        element.addEventListener('keydown', this.handleLikeKeydown.bind(this));
    });
}

        /**
         * @method updateTotalLikes
         * @description Met à jour le total des "likes" pour les médias.
         */
        updateTotalLikes() {
    // Récupérer les données "like" pour ces médias
    const likesData = this.media.map(media => media.likes);

    // Additionner les "likes"
    const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

    // Trouver la balise p enfant de l'élément like_counter
    const totalLikesElement = document.querySelector('.like_counter p');

    // Mettre à jour le contenu textuel de la balise p avec la nouvelle somme totale de "likes"
    totalLikesElement.textContent = totalLikes;
    }

}
const photographerPage = new PhotographerPage();

photographerPage.init();
