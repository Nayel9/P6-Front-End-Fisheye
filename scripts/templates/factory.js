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
        imgElement.tabIndex = 0;
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
        vidElement.tabIndex = 0;
        return vidElement;
    }
}