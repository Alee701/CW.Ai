document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const addCardButton = document.getElementById("add-card");

    const adminPassword = "admin123";
    let isAdmin = false;

    function promptForAdmin() {
        const password = prompt("Enter admin password:");
        if (password === adminPassword) {
            isAdmin = true;
        } else {
            alert("Incorrect password.");
        }
    }

    addCardButton.addEventListener("click", () => {
        if (!isAdmin) promptForAdmin();
        if (isAdmin) {
            const title = prompt("Enter product title:");
            const details = prompt("Enter product details:");
            const price = prompt("Enter product price:");
            const quantity = prompt("Enter product quantity:");
            const imageUrl = prompt("Enter product image URL:", "https://via.placeholder.com/300");

            if (title && details && price && quantity && imageUrl) {
                const product = { title, details, price, quantity, imageUrl };
                createCard(product);
                saveProduct(product);
            }
        }
    });

    function createCard({ title, details, price, quantity, imageUrl }) {
        const card = document.createElement("div");
        card.className = "card";

        const cardImage = document.createElement("img");
        cardImage.src = imageUrl;
        cardImage.alt = title;

        const cardContent = document.createElement("div");
        cardContent.className = "card-content";
        cardContent.innerHTML = `
            <h3>${title}</h3>
            <p>${details}</p>
            <div class="price">Price: $${price}</div>
            <div class="quantity">Quantity: ${quantity}</div>
        `;

        const cardDetails = document.createElement("div");
        cardDetails.className = "card-details";
        cardDetails.innerText = details;

        const cardButtons = document.createElement("div");
        cardButtons.className = "card-buttons";

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            if (!isAdmin) promptForAdmin();
            if (isAdmin) {
                editCard(card, cardContent, cardDetails, cardImage);
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", () => {
            if (!isAdmin) promptForAdmin();
            if (isAdmin) {
                deleteCard(card);
            }
        });

        const duplicateButton = document.createElement("button");
        duplicateButton.innerText = "Duplicate";
        duplicateButton.addEventListener("click", () => {
            duplicateCard({ title, details, price, quantity, imageUrl });
        });

        cardButtons.appendChild(editButton);
        cardButtons.appendChild(deleteButton);
        cardButtons.appendChild(duplicateButton);

        card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardDetails);
        card.appendChild(cardButtons);

        cardContainer.appendChild(card);
    }

    function editCard(card, cardContent, cardDetails, cardImage) {
        const newTitle = prompt("Enter new product title", cardContent.querySelector("h3").innerText);
        const newDetails = prompt("Enter new product details", cardDetails.innerText);
        const newPrice = prompt("Enter new product price", cardContent.querySelector(".price").innerText.replace("Price: $", ""));
        const newQuantity = prompt("Enter new product quantity", cardContent.querySelector(".quantity").innerText.replace("Quantity: ", ""));
        const newImageUrl = prompt("Enter new product image URL", cardImage.src);

        if (newTitle && newDetails && newPrice && newQuantity && newImageUrl) {
            cardContent.querySelector("h3").innerText = newTitle;
            cardContent.querySelector("p").innerText = newDetails;
            cardContent.querySelector(".price").innerText = `Price: $${newPrice}`;
            cardContent.querySelector(".quantity").innerText = `Quantity: ${newQuantity}`;
            cardImage.src = newImageUrl;
            cardDetails.innerText = newDetails;

            const updatedProduct = { title: newTitle, details: newDetails, price: newPrice, quantity: newQuantity, imageUrl: newImageUrl };
            updateProduct(card, updatedProduct);
        }
    }

    function deleteCard(card) {
        const productTitle = card.querySelector("h3").innerText;
        removeProduct(productTitle);
        card.remove();
    }

    function duplicateCard(product) {
        createCard(product);
        saveProduct(product);
    }

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function updateProduct(card, updatedProduct) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        const productTitle = card.querySelector("h3").innerText;
        const productIndex = products.findIndex(product => product.title === productTitle);
        if (productIndex > -1) {
            products[productIndex] = updatedProduct;
            localStorage.setItem("products", JSON.stringify(products));
        }
    }

    function removeProduct(title) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        products = products.filter(product => product.title !== title);
        localStorage.setItem("products", JSON.stringify(products));
    }

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.forEach(product => createCard(product));
    }

    loadProducts();
});
