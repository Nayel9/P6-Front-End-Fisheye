//      Variables globales

let lastFocus;
let originalTabIndices = new Map();
const modalbg = document.querySelector(".bground");
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".contact_button");
const closebtn = document.querySelector(".close_btn");
const closeOver = document.querySelector(".closing_button-over");
const body = document.body;

//      Fonctions De gestion des évènements

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector("form");
    form.reset();
});

modalBtn.addEventListener("click", function() {
    launchModal();
    body.setAttribute('aria-hidden', 'true');
});

closebtn.addEventListener("click", function() {
    closeModal();
    removeAllErrorMessages();
    body.removeAttribute('aria-hidden');
});

closeOver.addEventListener("click", function() {
    closeModal();
    removeAllErrorMessages();
    body.removeAttribute('aria-hidden');
    let modalOver = document.querySelector(".bgroung-over");
    modalOver.style.display = "none";
    modalOver.setAttribute('aria-hidden', 'true');
    modal.style.display = "flex";
});

closebtn.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        closeModal();
        removeAllErrorMessages();
        body.removeAttribute('aria-hidden');
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (lightbox.style.display !== 'block') {
            closeModal();
            removeAllErrorMessages();
            body.removeAttribute('aria-hidden');
        }
    }
});

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

//      Fonctions de gestion des erreurs

function removeAllErrorMessages() {
    let errorMessages = document.querySelectorAll("[id^='error_message-']");
    errorMessages.forEach(function(errorMessage) {
        errorMessage.remove();
    });
}

function removeErrorMessage(elementId) {
    let errorMessage = document.getElementById("error_message-" + elementId);
    let errorIcon = document.getElementById("error_icon-" + elementId);
    if (errorMessage) {
        errorMessage.remove();
    }
    if (errorIcon) {
        errorIcon.style.display = "none";
        errorIcon.setAttribute('aria-hidden', 'true');
    }
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
        spanErreurMessage.setAttribute('role', 'alert');
        errorIcon.setAttribute('role', 'alert');
    }

    spanErreurMessage.textContent = message;
    if (errorIcon) {
        errorIcon.style.display = "block";
        errorIcon.setAttribute('aria-hidden', 'false');
    }
}

//      Fonctions de validation

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

//      Fonctions de gestion de la modale

function launchModal() {
    let header = document.querySelector('header .logo, header a');
    header.setAttribute('aria-hidden', 'true');
    header.setAttribute('tabindex', '-1');
    let mainElement = document.querySelector('main');
    applyTabIndex(mainElement);
    lastFocus = document.activeElement;
    document.addEventListener('keydown', trapFocus);
    modalbg.style.display = "block";
    modal.style.display = "flex";
    closebtn.focus();
    document.addEventListener('focus', trapFocus, true);
    body.style.overflow = "hidden";
    document.querySelector('main').setAttribute('aria-hidden', 'true');
    modalbg.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'false');

    const photographerName = document.querySelector('h1').textContent;
    const h3Element = document.createElement('h3');
    h3Element.textContent = photographerName;
    h3Element.classList.add('name_h3')
    h3Element.setAttribute('tabindex', '0');
    h3Element.setAttribute('aria-label', `Nom du photographe : ${photographerName}`);

    const modalHeader = document.querySelector('.modal');
    const formElement = document.querySelector('form');
    modalHeader.insertBefore(h3Element, formElement);
}

function closeModal() {
    let header = document.querySelector('header .logo, header a');
    header.removeAttribute('aria-hidden');
    header.removeAttribute('tabindex');
    let mainElement = document.querySelector('main');
    removeTabIndex(mainElement);
    modalbg.style.display = "none";
    document.removeEventListener('keydown', trapFocus);
    lastFocus.focus();
    document.removeEventListener('focus', trapFocus, true);
    body.style.overflow = "";
    modalbg.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'true');

    const h3Element = document.querySelector('.name_h3');
    h3Element.remove();

    let errorIcons = document.querySelectorAll("[id^='error_icon-']");
    errorIcons.forEach(function(errorIcon) {
        errorIcon.style.display = "none";
        errorIcon.setAttribute('aria-hidden', 'true');
    });

    let inputFields = document.querySelectorAll("input, textarea");
    inputFields.forEach(function(inputField) {
        inputField.classList.remove('input-error');
        if (inputField.id === 'message') {
            inputField.setAttribute('placeholder', 'Votre message ici...');
            inputField.classList.remove('message-error-placeholder');
        }
    });

    modalbg.blur();
}

function submitForm() {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
    let modalOver = document.querySelector(".bgroung-over");
    modalOver.style.display = "flex";
    modalOver.setAttribute('aria-hidden', 'false');
    let form = document.querySelector("form");
    form.reset();
}

//      Fonctions de gestion du focus

function trapFocus(event) {
    if (modalbg.contains(document.activeElement)) {
        return;
    }

    const focusableElements = modalbg.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        event.preventDefault();
    }
}

function applyTabIndex(element) {
    originalTabIndices.set(element, element.getAttribute('tabindex'));
    element.setAttribute('tabindex', '-1');
    for (let i = 0; i < element.children.length; i++) {
        applyTabIndex(element.children[i]);
    }
}

function removeTabIndex(element) {
    let originalTabIndex = originalTabIndices.get(element);
    if (originalTabIndex === null) {
        element.removeAttribute('tabindex');
    } else {
        element.setAttribute('tabindex', originalTabIndex);
    }
    for (let i = 0; i < element.children.length; i++) {
        removeTabIndex(element.children[i]);
    }
}