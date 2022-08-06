let cart = JSON.parse(localStorage.getItem("Cart"));
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





// le bouton mettre à jour le panier
let updateCartContent = document.createElement('p');
    updateCartContent.style.textAlign = "center"
    document.querySelector('.cart__price').appendChild(updateCartContent);

let updateCart = document.createElement('button');
    updateCart.innerText = "Mettre à jour le panier";
    updateCart.style.background = "transparent";
    updateCart.style.color = "white";
    updateCart.style.fontSize = "20px";
    updateCart.style.padding = "15px";
    updateCart.style.borderColor = "white";
    updateCart.style.borderRadius = "30px";
    updateCart.style.cursor = "pointer"

    updateCartContent.appendChild(updateCart);

    


// gestion de la modification de la quantité dans le panier
updateCart.addEventListener('click', function(event){

    for(let i = 0; i < cart.length; i++){
        let quantityId = "itemQuantityId" + i;
        document.getElementById(quantityId).addEventListener('change', function(event){
            let newQuantity = document.getElementById(quantityId).value;
            document.getElementById(quantityId).value = newQuantity;
            event.stopPropagation();        
        })
        cart[i].quantity = document.getElementById(quantityId).value;
        cart[i].total = cart[i].quantity*cart[i].price;
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
    document.location.reload();
    event.stopPropagation();
})





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
