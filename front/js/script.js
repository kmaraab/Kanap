///////////////////////// Insertion des produits dans la page d’accueil ////////////////////

(async function(){
    const products = await getProducts();
    addProductsToHome(products);
})()



//recuperation des donnees des produits depuis l'api
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



//ajout des produits a la page d'accueil
function addProductsToHome(products){
    let i = 0;
    while (i < products.length){

        //ajout des l'id dans les lien des produits
        let lienProduct = document.createElement('a');
            lienProduct.href = "./product.html" + "?id=" + products[i]._id;

        
        let contentProduct = document.createElement('article');
            
            //recuperation des URL des produits
            let imageProduct = document.createElement('img');
                imageProduct.alt = products[i].altTxt;
                imageProduct.src = products[i].imageUrl;


            //recuperation des noms des produits    
            let nomProduct = document.createElement('h3');
                nomProduct.classList.add("productName");
                nomProduct.innerText = products[i].name; 


            //recuperation des descriptions des produits    
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