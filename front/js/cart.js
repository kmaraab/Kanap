const cart = JSON.parse(localStorage.getItem("Cart"));
console.log(cart);
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
                         deleteItem.innerText = "Supprimer"
                         cartItemContentSettingsDelete.appendChild(deleteItem);

    cartItems.appendChild(article);
}


let totalQuantity = 0;
let totalPrice = 0;
for(let i = 0; i < cart.length; i++){
    totalQuantity = totalQuantity + parseInt(cart[i].quantity);
    totalPrice = totalPrice + cart[i].total;
    document.getElementById('totalQuantity').innerText = totalQuantity;
    document.getElementById('totalPrice').innerText = totalPrice;
}
