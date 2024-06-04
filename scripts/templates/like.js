document.addEventListener('DOMContentLoaded', () => {

// Récupérer l'ID du photographe à partir de l'URL
const photographerId = parseInt(new URLSearchParams(window.location.search).get('id'));

// Lire les données JSON
fetch('data/photographers.json')
    .then(response => response.json())
    .then(data => {
        // Filtrer les médias qui correspondent à l'ID du photographe sélectionné
        const photographerMedia = data.media.filter(media => media.photographerId === photographerId);

        // Récupérer les données "like" pour ces médias
        const likesData = photographerMedia.map(media => media.likes);

        // Additionner les "likes"
        const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

        // Créer dynamiquement un élément p
        const pElement = document.createElement('p');
        pElement.textContent = totalLikes;

        // Placer l'élément p en première position dans l'élément div avec la classe like_counter
        const likeCounterElement = document.querySelector('.like_counter');
        likeCounterElement.insertBefore(pElement, likeCounterElement.firstChild);


            // Ajouter une propriété "liked" à chaque media pour suivre si le media a été aimé par l'utilisateur
        photographerMedia.forEach(media => media.liked = false);

        // Récupérer tous les éléments avec la classe like_number
        const likeNumberElements = document.querySelectorAll('.like_number');

              likeNumberElements.forEach(element => {
            element.addEventListener('click', event => {
                // Récupérer le titre du media à partir de l'ID de l'élément
                const mediaTitle = event.currentTarget.id;

                // Trouver le media correspondant dans les données JSON
                const media = photographerMedia.find(media => media.title === mediaTitle);

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

                    // Trouver la balise p enfant de l'élément like_number
                    const pElement = element.querySelector('p');

                    // Mettre à jour le contenu textuel de la balise p avec la nouvelle valeur de "likes"
                    pElement.textContent = media.likes;

                    // Récupérer les données "like" pour ces médias
                    const likesData = photographerMedia.map(media => media.likes);

                    // Additionner les "likes"
                    const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

                    // Trouver la balise p enfant de l'élément like_counter
                    const totalLikesElement = document.querySelector('.like_counter p');

                    // Mettre à jour le contenu textuel de la balise p avec la nouvelle somme totale de "likes"
                    totalLikesElement.textContent = totalLikes;
                }
            });
        });

            likeNumberElements.forEach(element => {
            element.addEventListener('keydown', event => {
                // Vérifier si la touche "Entrée" a été pressée
                if (event.key === 'Enter') {
                    // Récupérer le titre du media à partir de l'ID de l'élément
                    const mediaTitle = event.currentTarget.id;

                    // Trouver le media correspondant dans les données JSON
                    const media = photographerMedia.find(media => media.title === mediaTitle);

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

                        // Trouver la balise p enfant de l'élément like_number
                        const pElement = element.querySelector('p');

                        // Mettre à jour le contenu textuel de la balise p avec la nouvelle valeur de "likes"
                        pElement.textContent = media.likes;

                        // Récupérer les données "like" pour ces médias
                        const likesData = photographerMedia.map(media => media.likes);

                        // Additionner les "likes"
                        const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

                        // Trouver la balise p enfant de l'élément like_counter
                        const totalLikesElement = document.querySelector('.like_counter p');

                        // Mettre à jour le contenu textuel de la balise p avec la nouvelle somme totale de "likes"
                        totalLikesElement.textContent = totalLikes;
                    }
                }
            });
        });

    });
});