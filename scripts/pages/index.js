async function getPhotographers() {

    const storedPhotographers = localStorage.getItem('photographers');

    if (storedPhotographers) {

        const photographers = JSON.parse(storedPhotographers);
        return { photographers };
    } else {

        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();


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

        const { photographers } = await getPhotographers();
        await displayData(photographers);
    }
    
init().then(() => {
    console.log('Initialization complete');
}).catch((error) => {
    console.error('Error during initialization', error);
});

window.onload = function() {
    document.querySelector('.logo').focus();
};