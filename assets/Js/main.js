document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById( "product-list");
    const apiUrl = "https://fakestoreapi.com/products";
    const formAddProduct = document.getElementById("add-product-form");
    const formEditProduct = document.getElementById("edit-product-form");
    const editModal = document.getElementById("edit-modal");
    const closeModal = document.querySelector(".close-btn");

  

    let editProductId = null;

    async function fetchProducts () {
        const response = await fetch(`${apiUrl}?limit=20`);
        const products = await response.json();
        displayProducts(products);
    }

    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach((product) => {
          addProductToDOM(product);
        });
      }
        
    function addProductToDOM(product) {
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
    
        productCard
      .querySelector(".edit-btn")
      .addEventListener("click", () => showEditForm(product));
    productCard
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteProduct(product.id, productCard));
    productList.appendChild(productCard);
  }

     async function deleteProduct(productId, productCard) {
    const response = await fetch(`${apiUrl}/${productId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      productCard.remove();
    }
  }
    
  async function addProduct(event) {
    console.log("addProduct", event);
    event.preventDefault();
     const name = document.getElementById("name").value;
     const price = document.getElementById("price").value;
     const description = document.getElementById("description").value;
     const image = document.getElementById("image").value;
     const category = document.getElementById("category").value;

    
    const newProduct = {
        title: name,
        price,
        description,
        image,
        category,
    };

    const response = await fetch(apiUrl, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    });

    if(response.ok){
        const addedProduct= await response.json();
        addProductToDOM([addedProduct]);
        formAddProduct.reset();
     }

    }

    function showEditForm(product){
      console.log(product);
      document.getElementById("edit-id").value = product.id;
      document.getElementById("edit-name").value=product.title;
      document.getElementById("edit-price").value=product.price;
      document.getElementById("edit-description").value=product.description;
      document.getElementById("edit-image").value=product.image;
      document.getElementById("edit-category").value=product.category;


      editProductId = product.id
      formEditProduct.style = display = "block";
    }

    function showEditModal(product) {
      document.getElementById("modal-image").src = product.image;
      document.getElementById("modal-title").innerText = product.title;
      document.getElementById("modal-description").innerText = product.description;
      document.getElementById("modal-price").innerText = `$${product.price}`;
      document.getElementById("modal-category").innerText = product.category;
  
      editModal.style.display = "block";
    }

    async function editProduct(event){
      event.preventDefault();
      const id = document.getElementById("edit-id").value;
      const name = document.getElementById("edit-name").value;
     const price = document.getElementById("edit-price").value;
     const description = document.getElementById("edit-description").value;
     const image = document.getElementById("edit-image").value;
     const category = document.getElementById("edit-category").value;


     const updateProduct = {
      title: name,
      price,
      description,
      image,
      category,
     };

     const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateProduct),
      });
      if(response.ok){
        const updateProduct = await response.json();
        fetchProducts();
        formEditProduct.reset ();
        formEditProduct.style.display = "none";
      }
    }

    closeModal.addEventListener("click", () => {
      editModal.style.display = "none";
    });

    formAddProduct.addEventListener("submit", addProduct);
    formEditProduct.addEventListener("submit", addProduct);

    fetchProducts();
});