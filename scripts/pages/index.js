
    async function getPhotographers() {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            // const data = await response.json();
            // return data;
        }
    }
        // et bien retourner le tableau photographers seulement une fois récupéré
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();

    window.onload = function() {
        document.querySelector('.logo').focus();
    };