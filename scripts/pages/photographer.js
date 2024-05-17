// Récupérer l'ID du photographe à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Récupérer les informations du photographe à partir du fichier JSON
fetch('data/photographers.json')
    .then(response => response.json())
    .then(data => {
        const photographer = data.photographers.find(p => p.id === parseInt(photographerId));

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
    });