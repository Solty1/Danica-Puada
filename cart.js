document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    /**
     * ✅ FUNCTION: Display Cart Items
     */
    function displayCartItems() {
        cartItemsList.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = "<h2><p>Your cart is empty.</p></h2>";
            cartTotal.textContent = "P0.00";
            checkoutBtn.disabled = true; // Disable checkout button
            return;
        }

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("cart-item");

            const images = item.images && item.images.length > 0 ? item.images : ["images/product1.jpg"];
            const imageElements = images
                .map(img => `<img src="${img}" onerror="this.onerror=null; this.src='images/product1.jpg';" 
                    alt="${item.name}" width="50" height="50" style="margin-right:5px;">`)
                .join('');

            li.innerHTML = `
                <div style="display:flex; align-items:center;">
                    ${imageElements} 
                    <span>${item.name} - P${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})" style="margin-left:10px; background:red; color:white;">Remove</button>
                </div>`;

            cartItemsList.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `P${total.toFixed(2)}`;
        checkoutBtn.disabled = false; // Enable checkout button if cart is not empty
    }

    displayCartItems();

    /**
     * ✅ FUNCTION: Remove Item from Cart
     */
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }

    /**
     * ✅ FUNCTION: Proceed to Checkout
     */
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty! Add items before proceeding.");
        } else {
            window.location.href = "checkout.html"; // Redirect to checkout
        }
    });

});
