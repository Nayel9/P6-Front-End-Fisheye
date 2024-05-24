const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".contact_button");
const body = document.body;

modalBtn.addEventListener("click", function() {
    launchModal();
    body.setAttribute('aria-hidden', 'true');
});

function launchModal() {
    modalbg.style.display = "block";
    modalbg.focus();
    // Ajoutez un écouteur d'événements pour l'événement focus
    document.addEventListener('focus', trapFocus, true);
}

const closebtn = document.querySelector(".close_btn");

closebtn.addEventListener("click", function() {
    closeModal();
    body.removeAttribute('aria-hidden');
});

// Ajoutez cet écouteur d'événements pour l'événement keydown
closebtn.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        closeModal();
        body.removeAttribute('aria-hidden');
    }
});

function closeModal() {
    modalbg.style.display = "none";
    document.removeEventListener('focus', trapFocus, true);
}
// Cette fonction vérifie si l'élément qui reçoit le focus est à l'intérieur de la modale
function trapFocus(event) {
    if (!modalbg.contains(event.target)) {
        event.stopPropagation();
        modalbg.focus();
    }
}