document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("user")) || null;

    /**
     * ✅ FUNCTION: Add item to cart
     */
    function addToCart(name, price, images) {
        if (!loggedInUser) {
            alert("You must log in first to add items to your cart.");
            window.location.href = "login.html";
            return;
        }

        price = parseFloat(price);

        // Ensure images is an array
        if (typeof images === "string") {
            images = JSON.parse(images);
        }

        let product = { name, price, images };

        // Push to cart array and save to localStorage
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log("Cart updated:", cart); // Debugging log
        alert(`${name} added to cart!`);
        displayCart();
    }

    // Attach event listener to add-to-cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const images = this.getAttribute("data-images") ? JSON.parse(this.getAttribute("data-images")) : [];

            addToCart(name, price, images);
        });
    });

    /**
     * ✅ FUNCTION: Display cart contents
     */
    function displayCart() {
        const cartItemsList = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        if (cartItemsList && cartTotal) {
            cartItemsList.innerHTML = "";
            let total = 0;

            if (cart.length === 0) {
                cartItemsList.innerHTML = "<h2><p>Your cart is empty.</p></h2>";
                cartTotal.textContent = "P0.00";
                return;
            }

            cart.forEach((item, index) => {
                const li = document.createElement("li");
                li.classList.add("cart-item");

                // Ensure images array exists, fallback to a default image
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
                        <button style="margin-left:10px; color:white; background:red; border:none; padding:5px 10px; cursor:pointer;" 
                            onclick="removeFromCart(${index})">
                            Remove
                        </button>
                    </div>`;

                cartItemsList.appendChild(li);
                total += item.price;
            });

            cartTotal.textContent = `P${total.toFixed(2)}`;
        }
    }

    /**
     * ✅ FUNCTION: Remove an item from the cart
     */
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    };

    if (document.getElementById("cart-items")) {
        displayCart();
    }

    /**
     * ✅ LOGIN FUNCTIONALITY
     */
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;
            const password = document.getElementById("password").value;

            if (password.length < 8 || password.length > 16) {
                alert("Password must be between 8 and 16 characters.");
                return;
            }
            if (!/^\d{11}$/.test(phone)) {
                alert("Phone number must be exactly 11 digits.");
                return;
            }

            const userData = { username, email, phone, address };
            localStorage.setItem("user", JSON.stringify(userData));
            alert("Login successful!");
            window.location.href = "profile.html";
        });
    }

    /**
     * ✅ PROFILE PAGE FUNCTIONALITY
     */
    const profileContainer = document.getElementById("profile-container");
    const notLoggedIn = document.getElementById("not-logged-in");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profilePhone = document.getElementById("profile-phone");
    const profileAddress = document.getElementById("profile-address");

    if (loggedInUser) {
        if (profileContainer) profileContainer.style.display = "block";
        if (notLoggedIn) notLoggedIn.style.display = "none";

        if (profileName) profileName.textContent = loggedInUser.username || "(Not Logged In)";
        if (profileEmail) profileEmail.textContent = loggedInUser.email || "(No Email)";
        if (profilePhone) profilePhone.textContent = loggedInUser.phone || "(No Phone Number)";
        if (profileAddress) profileAddress.textContent = loggedInUser.address || "(No Address)";

        const logoutButton = document.getElementById("logout");
        if (logoutButton) logoutButton.style.display = "inline";
    } else {
        if (profileContainer) profileContainer.style.display = "none";
        if (notLoggedIn) notLoggedIn.style.display = "block";
    }

    /**
     * ✅ LOGOUT FUNCTIONALITY
     */
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            alert("You have logged out. Cart is now empty.");
            window.location.href = "login.html";
        });
    }

    /**
     * ✅ SIGN IN / PROFILE / LOGOUT BUTTON HANDLING
     */
    function updateNavButtons() {
        const signInButton = document.getElementById("sign-in-btn");
        const profileButton = document.getElementById("profile-btn");
        const logoutNavButton = document.getElementById("logout-btn");

        if (loggedInUser) {
            if (signInButton) signInButton.style.display = "none";
            if (profileButton) profileButton.style.display = "inline";
            if (logoutNavButton) logoutNavButton.style.display = "inline";
        } else {
            if (signInButton) signInButton.style.display = "inline";
            if (profileButton) profileButton.style.display = "none";
            if (logoutNavButton) logoutNavButton.style.display = "none";
        }
    }

    updateNavButtons();

    const logoutNavButton = document.getElementById("logout-btn");
    if (logoutNavButton) {
        logoutNavButton.addEventListener("click", function () {
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            alert("You have logged out.");
            window.location.href = "index.html";
        });
    }

    /**
     * ✅ FUNCTION: Navigate to checkout
     */
    function goToCheckout() {
        localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
        window.location.href = "checkout.html"; // Redirect to checkout page
    }

    document.getElementById("checkout-btn")?.addEventListener("click", goToCheckout);
});
