document.addEventListener('DOMContentLoaded', () => {

    // Récupérer l'ID du photographe à partir de l'URL
    const photographerId = parseInt(new URLSearchParams(window.location.search).get('id'));

    fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {

            const photographerMedia = data.media.filter(media => media.photographerId === photographerId);

            const likesData = photographerMedia.map(media => media.likes);

            const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

            const pElement = document.createElement('p');
            pElement.textContent = totalLikes;

            const likeCounterElement = document.querySelector('.like_counter');
            likeCounterElement.insertBefore(pElement, likeCounterElement.firstChild);

            photographerMedia.forEach(media => media.liked = false);

            const likeNumberElements = document.querySelectorAll('.like_number');

            function handleLikeEvent(event) {
                const mediaTitle = event.currentTarget.id;

                const media = photographerMedia.find(media => media.title === mediaTitle);

                if (media) {
                    if (media.liked) {
                        media.likes--;
                        media.liked = false;
                    } else {
                        media.likes++;
                        media.liked = true;
                    }

                    const pElement = event.currentTarget.querySelector('p');

                    pElement.textContent = media.likes;

                    const likesData = photographerMedia.map(media => media.likes);

                    const totalLikes = likesData.reduce((total, likes) => total + likes, 0);

                    const totalLikesElement = document.querySelector('.like_counter p');

                    totalLikesElement.textContent = totalLikes;
                }
            }

            likeNumberElements.forEach(element => {
                element.addEventListener('click', handleLikeEvent);
                element.addEventListener('keydown', event => {
                    if (event.key === 'Enter') {
                        handleLikeEvent(event);
                    }
                });
            });
        });
});