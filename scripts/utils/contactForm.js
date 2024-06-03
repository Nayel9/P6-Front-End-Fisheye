document.addEventListener('DOMContentLoaded', () => {
    // Sélection du formulaire
    let form = document.querySelector("form");
    // Réinitialisation du formulaire
    form.reset();
});

const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".contact_button");
const body = document.body;

modalBtn.addEventListener("click", function() {
    launchModal();
    body.setAttribute('aria-hidden', 'true');
});

function launchModal() {
    let header = document.querySelector('header .logo, header a');
    header.setAttribute('aria-hidden', 'true');
    header.setAttribute('tabindex', '-1');
    let mainElement = document.querySelector('main');
    applyTabIndex(mainElement);
    modalbg.style.display = "block";
    modalbg.focus();
    // Ajoutez un écouteur d'événements pour l'événement focus
    document.addEventListener('focus', trapFocus, true);
    document.body.style.overflow = "hidden";
    document.querySelector('main').setAttribute('aria-hidden', 'true');


    const photographerName = document.querySelector('h1').textContent;
    const h3Element = document.createElement('h3');

    h3Element.textContent = photographerName;
    h3Element.classList.add('name_h3')

    const modalHeader = document.querySelector('.modal');
    const formElement = document.querySelector('form');

    modalHeader.insertBefore(h3Element, formElement);

}

function removeAllErrorMessages() {
    let errorMessages = document.querySelectorAll("[id^='error_message-']");
    errorMessages.forEach(function(errorMessage) {
        errorMessage.remove();
    });
}

const closebtn = document.querySelector(".close_btn");

closebtn.addEventListener("click", function() {
    closeModal();
    removeAllErrorMessages(); // Supprime tous les messages d'erreur
    body.removeAttribute('aria-hidden');
});

const closeOver = document.querySelector(".closing_button-over");

closeOver.addEventListener("click", function() {
    closeModal();
    removeAllErrorMessages();
    body.removeAttribute('aria-hidden');
    let modalOver = document.querySelector(".bgroung-over");
    modalOver.style.display = "none";
    let modal = document.querySelector(".modal");
    modal.style.display = "flex";


});

// Ajoutez cet écouteur d'événements pour l'événement keydown
closebtn.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        closeModal();
        removeAllErrorMessages(); // Supprime tous les messages d'erreur
        body.removeAttribute('aria-hidden');
    }
});
function closeModal() {
    let header = document.querySelector('header .logo, header a');
    header.removeAttribute('aria-hidden');
    header.removeAttribute('tabindex');
    let mainElement = document.querySelector('main');
    removeTabIndex(mainElement);
    modalbg.style.display = "none";
    document.removeEventListener('focus', trapFocus, true);
    body.style.overflow = "";

    const h3Element = document.querySelector('.name_h3');
    h3Element.remove();

    // Supprimez les icônes d'erreur et réinitialisez les bordures et les placeholders
    let errorIcons = document.querySelectorAll("[id^='error_icon-']");
    errorIcons.forEach(function(errorIcon) {
        errorIcon.style.display = "none"; // Cache l'icône d'erreur
        errorIcon.setAttribute('aria-hidden', 'true');
    });

    let inputFields = document.querySelectorAll("input, textarea");
    inputFields.forEach(function(inputField) {
        inputField.classList.remove('input-error'); // Supprime la bordure d'erreur
        if (inputField.id === 'message') {
            inputField.setAttribute('placeholder', 'Votre message ici...');
            inputField.classList.remove('message-error-placeholder');
        }
    });

}
// Cette fonction vérifie si l'élément qui reçoit le focus est à l'intérieur de la modale
function trapFocus(event) {
    if (!modalbg.contains(event.target)) {
        event.stopPropagation();
        const focusableElements = modalbg.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        firstFocusableElement.focus();
    }
}
function removeErrorMessage(elementId) {
    let errorMessage = document.getElementById("error_message-" + elementId);
    let errorIcon = document.getElementById("error_icon-" + elementId);
    if (errorMessage) {
        errorMessage.remove();
    }
    if (errorIcon) {
        errorIcon.style.display = "none"; // Cache l'icône d'erreur
        errorIcon.setAttribute('aria-hidden', 'true');

    }
}

// Validation du formulaire

function validateFirstName(prenom) {

    if (prenom.length < 2 || prenom === "") {
        throw new Error("Merci de saisir un Prénom valide. ");
    } else {
        removeErrorMessage("first");
    }
}

function validateLastName(nom) {
    if (nom.length < 2 || nom === "") {
        throw new Error("Merci de saisir un Nom valide. ");
    } else {
        removeErrorMessage("last");
    }
}

function validateEmail(email) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
        throw new Error("Merci de saisir une adresse email valide. ");
    } else {
        removeErrorMessage("email");
    }
}

function validateMessage(message) {
    if (message.length < 24 || message ==="") {
        const errorMessage = document.getElementById("message");
        errorMessage.setAttribute('placeHolder', 'Merci de saisir un message de 24 caractères minimum.');
        errorMessage.classList.add('message-error-placeholder');
        throw new Error("Merci de saisir un minimum de 24 caractères")
    } else {
        removeErrorMessage("message")
    }
}

function submitForm() {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
    let modalOver = document.querySelector(".bgroung-over");
    modalOver.style.display = "flex";
    let form = document.querySelector("form");
    form.reset();
}

function tabError(message, elementId) {
    let element = document.getElementById(elementId);
    let formData = element.parentElement;
    let spanErreurMessage = document.getElementById("error_message-" + elementId);
    let errorIcon = document.getElementById("error_icon-" + elementId);
    if (!spanErreurMessage) {
        spanErreurMessage = document.createElement("span");
        spanErreurMessage.id = "error_message-" + elementId;
        formData.append(spanErreurMessage);
        element.classList.add('input-error');
        spanErreurMessage.classList.add('message-error');
    }

    spanErreurMessage.textContent = message;
    if (errorIcon) {
        errorIcon.style.display = "block";
        errorIcon.setAttribute('aria-hidden', 'false');
    }
}

addEventListener("submit", function(event) {
    event.preventDefault();

    let prenom = document.getElementById("first").value;
    let nom = document.getElementById("last").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    console.log(prenom, nom, email, message);

    try {
        validateFirstName(prenom);
    } catch(erreur) {
        tabError(erreur.message, 'first');
    }

    try {
        validateLastName(nom);
    } catch(erreur) {
        tabError(erreur.message, 'last');
    }

    try {
        validateEmail(email);
    } catch(erreur) {
        tabError(erreur.message, 'email');
    }

    try {
        validateMessage(message);
    } catch(erreur) {
        tabError(erreur.message, 'message');
    }

    if (prenom && nom && email && message) {
        submitForm();
    }
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Vérifier si la lightbox est ouverte
        if (lightbox.style.display !== 'block') {
            closeModal();
            removeAllErrorMessages(); // Supprime tous les messages d'erreur
            body.removeAttribute('aria-hidden');
        }
    }
});
let originalTabIndices = new Map();

function applyTabIndex(element) {
    // Stocker la valeur d'origine de tabindex
    originalTabIndices.set(element, element.getAttribute('tabindex'));

    // Appliquer tabindex="-1" à l'élément
    element.setAttribute('tabindex', '-1');

    // Parcourir tous les enfants de l'élément
    for (let i = 0; i < element.children.length; i++) {
        applyTabIndex(element.children[i]);
    }
}

function removeTabIndex(element) {
    // Récupérer la valeur d'origine de tabindex
    let originalTabIndex = originalTabIndices.get(element);

    // Si la valeur d'origine de tabindex est null, supprimer l'attribut tabindex
    if (originalTabIndex === null) {
        element.removeAttribute('tabindex');
    } else {
        // Sinon, rétablir la valeur d'origine de tabindex
        element.setAttribute('tabindex', originalTabIndex);
    }

    // Parcourir tous les enfants de l'élément
    for (let i = 0; i < element.children.length; i++) {
        removeTabIndex(element.children[i]);
    }
}
