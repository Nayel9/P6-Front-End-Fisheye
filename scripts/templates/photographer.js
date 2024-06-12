//      Création de la section de présentation des photographes

function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('aria-label', `Photographe ${name}`);

        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`; // lien vers la page du photographe
        link.setAttribute('aria-label', `Lien vers la page du photographe ${name}`);

        const imgContainer = document.createElement('div'); // create a new div
        imgContainer.className = 'img_container'; // assign the class to the div

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait du photographe ${name}`);
        img.setAttribute('tabindex', '0');

        imgContainer.appendChild(img); // append the image to the div

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('tabindex', '0');

        link.appendChild(imgContainer); // append the div to the link instead of the image
        link.appendChild(h2);
        article.appendChild(link); // ajoute le lien à l'article

        const pCityCountry = document.createElement('p');
        pCityCountry.textContent = `${city}, ${country}`;
        pCityCountry.classList.add('cityCountry');
        pCityCountry.setAttribute('tabindex', '0');

        const pTagline = document.createElement('p');
        pTagline.textContent = tagline;
        pTagline.classList.add('tagLine');
        pTagline.setAttribute('tabindex', '0');

        const pPrice = document.createElement('p');
        pPrice.textContent = `${price}€/jour`;
        pPrice.style.fontSize = '12px';
        pPrice.style.color = '#757575';
        pPrice.setAttribute('tabindex', '0');

        article.appendChild(pCityCountry);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, getUserCardDOM }
}