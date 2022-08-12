// Vérification si le localstorage n'est pas vide
let cart;
function verifLocalStorage(){
    if (localStorage.getItem("Cart")){
        cart = JSON.parse(localStorage.getItem("Cart"));
    }
    else{
        cart = [];
    }
}
verifLocalStorage();
let cartItems = document.getElementById('cart__items');

//affichage des produits dans le panier
for(let i = 0; i < cart.length; i++){
    let article = document.createElement('article');
    article.classList.add("cart__item");

        let cartItemImage = document.createElement('div');
            cartItemImage.classList.add("cart__item__img");
            article.appendChild(cartItemImage);


            let imageProduct = document.createElement("img");
                imageProduct.src = cart[i].urlImg;
                imageProduct.alt = cart[i].name;
                cartItemImage.appendChild(imageProduct);

        let cartItemContent = document.createElement('div');
            cartItemContent.classList.add('cart__item__content');
            article.appendChild(cartItemContent);


            let cartItemContentDescription = document.createElement('div');
                cartItemContentDescription.classList.add('cart__item__content__description');
                cartItemContent.appendChild(cartItemContentDescription);

                let nameProduct = document.createElement('h2');
                    nameProduct.innerText = cart[i].name;
                    cartItemContentDescription.appendChild(nameProduct);

                let colorProduct = document.createElement('p');
                    colorProduct.innerText = cart[i].color;
                    cartItemContentDescription.appendChild(colorProduct);

                let priceProduct = document.createElement('p');
                    priceProduct.innerText = cart[i].price + " €";
                    cartItemContentDescription.appendChild(priceProduct);
            

            let cartItemContentSettings = document.createElement('div');
                 cartItemContentSettings.classList.add('cart__item__content__settings');
                 cartItemContent.appendChild(cartItemContentSettings);
                 
                 let cartItemContentSettingsQuantity = document.createElement('div');
                     cartItemContentSettingsQuantity.classList.add('cart__item__content__settings__quantity');
                     cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

                     let productQuantity = document.createElement('p');
                         productQuantity.innerText = "Qté :";
                         cartItemContentSettingsQuantity.appendChild(productQuantity);

                     let productQuantityValue = document.createElement('input');
                         productQuantityValue.type = "number";
                         productQuantityValue.classList.add('itemQuantity');
                         // ajout d'un id pour gerer la modification de la quantité dans le panier.
                         productQuantityValue.id = "itemQuantityId" + i; 
                         productQuantityValue.name = "itemQuantity";
                         productQuantityValue.min = "1";
                         productQuantityValue.max = "100";
                         productQuantityValue.value = cart[i].quantity;
                         cartItemContentSettingsQuantity.appendChild(productQuantityValue);

                 let cartItemContentSettingsDelete = document.createElement('div');
                     cartItemContentSettingsDelete.classList.add('cart__item__content__settings__delete');
                     cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

                     let deleteItem = document.createElement('p');
                         deleteItem.classList.add('deleteItem');
                         deleteItem.id = "deleteItem" + i;
                         deleteItem.innerText = "Supprimer"
                         cartItemContentSettingsDelete.appendChild(deleteItem);

    cartItems.appendChild(article);
}


// calcul du totale de la quantité et du prix
let totalQuantity = 0;
let totalPrice = 0;
for(let i = 0; i < cart.length; i++){
    totalQuantity = totalQuantity + parseInt(cart[i].quantity);
    totalPrice = totalPrice + cart[i].total;
    document.getElementById('totalQuantity').innerText = totalQuantity;
    document.getElementById('totalPrice').innerText = totalPrice;
}



// gestion de la modification de la quantité dans le panier
if (localStorage.getItem("Cart")){
    for(let i = 0; i < cart.length; i++){
        let quantityId = "itemQuantityId" + i;
            document.getElementById(quantityId).addEventListener('change', function(event){
                let newQuantity = document.getElementById(quantityId).value;
                document.getElementById(quantityId).value = newQuantity;
                cart[i].quantity = document.getElementById(quantityId).value;
                cart[i].total = cart[i].quantity*cart[i].price;


                let totalQuantity = 0;
                let totalPrice = 0;
                for(let i = 0; i < cart.length; i++){
                    totalQuantity = totalQuantity + parseInt(cart[i].quantity);
                    totalPrice = totalPrice + cart[i].total;
                    document.getElementById('totalQuantity').innerText = totalQuantity;
                    document.getElementById('totalPrice').innerText = totalPrice;
                }
                localStorage.setItem("Cart", JSON.stringify(cart));
                event.stopPropagation();        
            })
    }
}





// gestion de la suppression d'un produit dans le panier
for (let i = 0; i < cart.length; i++){
    let deleteButton = document.getElementById("deleteItem" + i);
    deleteButton.addEventListener('click', function(event){
        if(cart.length === 1){
            localStorage.removeItem("Cart");
            document.location.reload();
        }
        else{
            cart[i] = null;
            let newCart = [];
            for( let j = 0; j < cart.length; j++){
                if(cart[j] != null){
                    newCart.push(cart[j]);
                }
            }
            cart = newCart; 
            localStorage.setItem("Cart", JSON.stringify(cart));
        }
        event.stopPropagation();
        document.location.reload();
    })
}


///////////////////////// Validation du formulaire de contact ////////////////////

// Expréssions régulières pour contrôler le formulaire
const regExpText = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,30}$/;
const regExpAddress = /^[0-9A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{5,30}$/;
const regExpEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i;


// input formulaire et message d'erreur à afficher 
let firstName = document.getElementById('firstName');
let firstNameErrorMsgPlace = document.getElementById('firstNameErrorMsg');
let firstNameErrorMsg = "veuillez saisir un nom correct";

let lastName = document.getElementById('lastName');
let lastNameErrorMsgPlace = document.getElementById('lastNameErrorMsg');
let lastNameErrorMsg = "veuillez saisir un prenom correct";

let address = document.getElementById('address');
let addressErrorMsgPlace = document.getElementById('addressErrorMsg');
let addressErrorMsg = "veuillez saisir une adresse correcte";

let city = document.getElementById('city');
let cityErrorMsgPlace = document.getElementById('cityErrorMsg');
let cityErrorMsg = "veuillez saisir un nom de ville correct";

let email = document.getElementById('email');
let emailErrorMsgPlace = document.getElementById('emailErrorMsg');
let emailErrorMsg = "veuillez saisir une adresse mail correcte";


// ecoute et affichage d'un message d'erreur si le format entrée dans l'input est incorrect
let errorsInput = []; // stock un msg d'erreur si la valeur d'un input est incorrecte
function validInput (input, regExp, errorMessagePlace, errorMsg){
    input.addEventListener('change', function(event){
        let regexpTest = regExp.test(input.value);
        if(regexpTest === false){
            errorMessagePlace.innerHTML = errorMsg;
            errorsInput.push(errorMsg);
        }
        else{
            errorMessagePlace.innerHTML = "";
            errorsInput = errorsInput.filter(id => id != errorMsg);
        }
    })
}

validInput(firstName, regExpText, firstNameErrorMsgPlace, firstNameErrorMsg); 
validInput(lastName, regExpText, lastNameErrorMsgPlace, lastNameErrorMsg);
validInput(address, regExpAddress, addressErrorMsgPlace, addressErrorMsg);
validInput(city, regExpText, cityErrorMsgPlace, cityErrorMsg);
validInput(email, regExpEmail, emailErrorMsgPlace, emailErrorMsg);




//////////////////// Envoi de la commande ///////////////////////

// classe pour générer l'objet contact
class contactInfo {
    constructor(firstName, lastName, address, city, email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}



// message d'erreur commande invalide
function errorMsgOrder (errorMsgValue){
    let cartOrder = document.querySelector('.cart');
    let errorMsg = document.createElement('p');
    errorMsg.classList.add("errorInputValue");
    errorMsg.style.color = "yellow";
    errorMsg.style.textAlign = "center";
    errorMsg.style.fontSize = "1rem"
    errorMsg.innerHTML = errorMsgValue;
    cartOrder.appendChild(errorMsg);
}




// Validation des informations de commande à envoyer
function validOrder(){
    // verif si le panier n'est pas vide
    if(cart.length === 0){
        let cartOrderFormSubmit = document.getElementById('order');
            cartOrderFormSubmit.style.display = "none";

            errorMsgOrder('Impossible de passer une commande, votre panier est vide ! <br> <a href=../html/index.html> retour à la boutique </a>');
    }

    // verif des valeurs saisies dans le formulaire
    else{
        document.querySelector('.cart__order__form').addEventListener("change", function(event){
            if(errorsInput.length > 0){
                event.stopPropagation();
                let cartOrderFormSubmit = document.getElementById('order');
                    cartOrderFormSubmit.style.display = "none";
                if(document.querySelector('.errorInputValue')){
                    return
                }
                else{
                    errorMsgOrder ('Impossible de passer une commande, un ou plusieurs champ du formulaire est incorrect');  
                } 
            }
            else{
                let cartOrder = document.querySelector('.cart');
                if(document.querySelector('.errorInputValue')){
                    cartOrder.removeChild(document.querySelector('.errorInputValue'));
                }
                let cartOrderFormSubmit = document.getElementById('order');
                    cartOrderFormSubmit.style.display = "block";
            }
        })   
    }    
}

validOrder();




// Envoi de la commande
let submitOrder = document.querySelector('.cart__order__form');
submitOrder.addEventListener("submit", function(event){
    event.preventDefault();

    // génère l'objet contact à envoyer à l'API
    let contact = new contactInfo(firstName.value, lastName.value, address.value, city.value, email.value);
    
    // génère l'ID des produits dans le panier
    let products = [];
        for(let i = 0; i < cart.length; i++){
        products.push(cart[i].id);
    }

    // La requête POST envoyer
    fetch("http://localhost:3000/api/products/order", {  
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({contact, products})
    })
    .then(function (res) {
        if(res.ok){
            return res.json();
        }
    })
    .then (function(value){
        localStorage.clear();
        let idOrder = value.orderId;
        document.location.href = "../html/confirmation.html" + "?id=" + idOrder;
    })
    .catch(function(error){
        console.log(error);
    })
})