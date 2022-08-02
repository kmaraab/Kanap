(async function(){
    const products = await getProducts();
    addProductsToHome(products);
})()

//RECUPERATION DES DONNEES DES PRODUITS DEPUIS L'API
function getProducts(){
    return fetch('http://localhost:3000/api/products')
        .then(function(res){
            if(res.ok){
                return res.json()
            }
        })
        .then(function(products){
            return products
        })
        .catch(function(error){
            alert(error)
        })    
}


//AJOUT DES PRODUITS A LA PAGE D'ACCUEIL
function addProductsToHome(products){
    let i = 0;
    while (i < products.length){
        let lienProduct = document.createElement('a');
            lienProduct.href = "./product.html" + "?id=" + products[i]._id;

        let contentProduct = document.createElement('article');
            let imageProduct = document.createElement('img');
                imageProduct.alt = products[i].altTxt;
                imageProduct.src = products[i].imageUrl;

            let nomProduct = document.createElement('h3');
                nomProduct.classList.add("productName");
                nomProduct.innerText = products[i].name; 

            let descrisptionProduct = document.createElement('p');
                descrisptionProduct.classList.add("productDescription");
                descrisptionProduct.innerText = products[i].description;

        document.getElementById('items')
            .appendChild(lienProduct)
                .appendChild(contentProduct);
        
        contentProduct.appendChild(imageProduct);
        contentProduct.appendChild(nomProduct);
        contentProduct.appendChild(descrisptionProduct);
        i++;
    }
}