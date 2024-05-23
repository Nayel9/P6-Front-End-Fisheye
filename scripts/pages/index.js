 async function getPhotographers() {
    // Vérifiez si les photographes sont déjà stockés dans le localStorage
    const storedPhotographers = localStorage.getItem('photographers');

    if (storedPhotographers) {
        // Si les photographes sont stockés, parsez-les et utilisez-les
        const photographers = JSON.parse(storedPhotographers);
        return { photographers };
    } else {
        // Si les photographes ne sont pas stockés, faites une requête pour les récupérer
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();

            // Stockez les photographes dans le localStorage
            localStorage.setItem('photographers', JSON.stringify(data.photographers));

            return data;
        }
    }
}
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