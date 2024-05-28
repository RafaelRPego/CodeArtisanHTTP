document.addEventListener( "DOMContentLoaded", function () {
    const productList = document.getElementById( "product-list");
    const apiUrl = "https://fakestoreapi.com/products";

    async function fetchProducts () {
        const response = await fetch(`${apiUrl}?limit=20`);
        const products = await response.json();
        displayProducts(products);
    }

    function displayProducts(products) {
        productList.innerHTML = "";
        
       products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.setAttribute("data-id", product.id);

        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}"/>
        <div class="details">
         <h2>${product.title}</h2>
         <span>${product.category}</span>
         <p>${product.description}</p>
        <p class="price">${product.price}</p>
        </div>
        <button class="edit-btn"><i class="ri-edit-2-line"></i></button>
        <button class="delete-btn"><i class="ri-delete-bin-line"></i></button> `;

        productCard.querySelector(".edit-btn").addEventListener("click", () => {
        console.log("Editando o produto", product.id);
        });

        productCard.querySelector(".delete-btn").addEventListener("click", () => {
            console.log("Deletando o produto", product.id);
            });

        productList.appendChild(productCard);
        })
    }

    async function deleteProduct(productId, productCard){
        const response = await fetch(`${apiUrl}/${productId}`,{
            method:"DELETE",
        });
        if (response.ok) {
            productCard.remove();
        }
    }
    
    fetchProducts();
});