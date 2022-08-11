// récupération du numéro de commande dans l'url de la page
const url = new URL(window.location.href);
const id = url.searchParams.get('id');

// affichage du numéro de commande
const orderId = document.getElementById('orderId');
orderId.textContent = id;