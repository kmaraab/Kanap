/////////////////////// Lien entre un produit de la page d’accueil et la page Produit ///////////////////////////

let idProduit = new URL(location.href).searchParams.get("id"); //recupère la valeur de l'id du lien

(async function(){
    const product = await getProduct();
    addProductToProductPage(product);
})()

//récupération des données d'un produit depuis l'api
async function getProduct(){
    return fetch('http://localhost:3000/api/products/' + idProduit)
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(product){
            return product
        })
        .catch(function(error){
            alert(error)
        })    
}



//insertion d'un produit et ses détails dans la page produit
function addProductToProductPage(product){
    let imageProduct = document.createElement('img');
                imageProduct.alt = product.altTxt;
                imageProduct.src = product.imageUrl;

            let nomProduct = product.name;
            let prixProduct = product.price; 
            let descrisptionProduct = product.description;

            let colorsProduct = product.colors;
    let i = 0;
    while(i < colorsProduct.length){
        let color = document.createElement('option');
            color.innerText = colorsProduct[i];
        document.getElementById('colors')
            .appendChild(color);
        i++;
    }

    document.querySelector(".item__img")
        .appendChild(imageProduct);

    document.getElementById('title')
        .innerText = nomProduct;
    
    document.getElementById('price')
        .innerText = prixProduct;
    
    document.getElementById('description')
        .innerText = descrisptionProduct;
}




///////////////////////////  Ajout d'un produit au panier /////////////////////

let addToCart = document.getElementById('addToCart');
let cart = [];


//classe de nouveau produit a ajouter au panier
class addNewProductToCart {
    constructor(id, urlImg, name, quantity, color, price, total){
        this.id = id;
        this.urlImg = urlImg;
        this.name = name;
        this.quantity = quantity;
        this.color = color;
        this.price = price;
        this.total = total;
    }
}



(async function(){
    const product = await getProduct();
    let idProductAddToCart = await getIdProductAddToCart(product);
    let urlImgProductAddToCart = await getUrlImgProductAddToCart(product);
    let nameProductAddToCart = await getNameProductAddToCart(product);
    let priceProductAddToCart = await getPriceProductAddToCart(product);
    pressAddToCart(idProductAddToCart, urlImgProductAddToCart, nameProductAddToCart, priceProductAddToCart);
})()



//récuperation de l'id du produit
function getIdProductAddToCart(product){
    return product._id;
}


//récuperation de l'URL de l'image du produit
function getUrlImgProductAddToCart(product){
    return product.imageUrl;
}


//récuperation du nom du produit
function getNameProductAddToCart(product){
    return product.name;
}


//récuperation du prix du produit
function getPriceProductAddToCart(product){
    return product.price;
}


//ajout d'un produit dans le local storage
function pressAddToCart(idProductAddToCart, urlImgProductAddToCart, nameProductAddToCart, priceProductAddToCart){
    addToCart.addEventListener('click',function(event){
        
        
        // ecoute la modification de la couleur
        let getColor = document.getElementById('colors');
        getColor.addEventListener('change', function(event){
            let colorSelect = getColor.options[getColor.selectedIndex].text;
            getColor.value = colorSelect; 
            event.stopPropagation();
        });
        let colorSelect = getColor.value;
        

        // ecoute la modification de la qauntité
        let getQuantity = document.getElementById('quantity');
        getQuantity.addEventListener('change', function(event){
            let newQuantity = getQuantity.value;
            getQuantity.value = newQuantity; 
            event.stopPropagation();
        });
        let quantityValue = getQuantity.value;


        // création d'un nouveau objet de produit à ajouter au panier
        let productAddToCart = new addNewProductToCart(idProductAddToCart, urlImgProductAddToCart, nameProductAddToCart, quantityValue, colorSelect, priceProductAddToCart, quantityValue*priceProductAddToCart);
        
        //verif s'il y'a des articles dans le panier on les recupère avant d'ajouter le nouveau
        if(localStorage.getItem("Cart")){
            cart = JSON.parse(localStorage.getItem("Cart"));
            cart.push(productAddToCart);
            let stringCart = JSON.stringify(cart);
            localStorage.setItem("Cart", stringCart);
          }
          else{
            cart.push(productAddToCart);
            let stringCart = JSON.stringify(cart);
            localStorage.setItem("Cart", stringCart);
          }
        event.stopPropagation;
    })
}