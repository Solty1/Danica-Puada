document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("user")) || null;

    const checkoutItemsList = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    /**
     * ✅ FUNCTION: Display User Profile
     */
    function displayUserProfile() {
        const profileName = document.getElementById("profile-name");
        const profileEmail = document.getElementById("profile-email");
        const profilePhone = document.getElementById("profile-phone");
        const profileAddress = document.getElementById("profile-address");
        const notLoggedIn = document.getElementById("not-logged-in");

        if (loggedInUser) {
            profileName.textContent = loggedInUser.username || "(No Name)";
            profileEmail.textContent = loggedInUser.email || "(No Email)";
            profilePhone.textContent = loggedInUser.phone || "(No Phone)";
            profileAddress.textContent = loggedInUser.address || "(No Address)";
            notLoggedIn.style.display = "none";
        } else {
            notLoggedIn.style.display = "block";
            alert("You must log in before checking out!");
            window.location.href = "login.html"; // Redirect to login
        }
    }

    displayUserProfile();

    /**
     * ✅ FUNCTION: Display Cart Items
     */
    function displayCheckoutItems() {
        if (checkoutItemsList && checkoutTotal) {
            checkoutItemsList.innerHTML = "";
            let total = 0;

            if (cart.length === 0) {
                checkoutItemsList.innerHTML = "<h2><p>Your cart is empty.</p></h2>";
                checkoutTotal.textContent = "P0.00";
                return;
            }

            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.classList.add("checkout-item");

                // Ensure images exist; use default if missing
                const images = item.images && item.images.length > 0 ? item.images : ["images/product1.jpg"];

                // Generate multiple image elements
                const imageElements = images
                    .map(img => `<img src="${img}" onerror="this.onerror=null; this.src='images/product1.jpg';" 
                        alt="${item.name}" width="50" height="50" style="margin-right:5px;">`)
                    .join('');

                li.innerHTML = `
                    <div style="display:flex; align-items:center;">
                        ${imageElements} 
                        <span>${item.name} - P${item.price.toFixed(2)}</span>
                    </div>`;

                checkoutItemsList.appendChild(li);
                total += item.price;
            });

            checkoutTotal.textContent = `P${total.toFixed(2)}`;
        }
    }

    displayCheckoutItems();

    /**
     * ✅ FUNCTION: Confirm Purchase
     */
    document.getElementById("confirm-purchase")?.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Thank you for your purchase!");
        localStorage.removeItem("cart"); // Clear the cart
        window.location.href = "index.html"; // Redirect to homepage
    });
});
