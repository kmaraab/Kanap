let idProduit = new URL(location.href).searchParams.get("id"); //recupère la valeur de l'id du lien

(async function(){
    const product = await getProduct();
    addProductToProductPage(product);
})()

//RECUPERATION DES DONNEES D'UN PRODUIT DEPUIS L'API
function getProduct(){
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

//AJOUT D'UN PRODUIT A LA PAGE PRODUIT
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