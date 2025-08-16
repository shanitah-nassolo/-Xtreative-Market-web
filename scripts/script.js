
// Loading animation
window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loadingOverlay").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("loadingOverlay").style.display = "none";
    }, 500);
  }, 1000);
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

// Scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Cart functionality
let cart = [];

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  updateCartDisplay();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function addToCart(name, price, country, image) {
  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      country: country,
      image: image,
      quantity: 1,
    });
  }

  updateCartCount();
  updateCartDisplay();

  // Show success message
  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${name} added to cart!`;
  document.body.appendChild(successMsg);

  setTimeout(() => {
    successMsg.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(successMsg);
    }, 500);
  }, 3000);
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartEmpty = document.getElementById("cart-empty");
  const cartSummary = document.getElementById("cart-summary");

  if (cart.length === 0) {
    cartItemsContainer.style.display = "none";
    cartEmpty.style.display = "block";
    cartSummary.style.display = "none";
    document.getElementById("cart-items-count").textContent = "0";
  } else {
    cartEmpty.style.display = "none";
    cartItemsContainer.style.display = "block";
    cartSummary.style.display = "block";

    // Update cart items count
    const totalItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    document.getElementById("cart-items-count").textContent = totalItems;

    // Clear existing items
    cartItemsContainer.innerHTML = "";

    // Add items to cart
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                        <div class="cart-item-image" style="background-image: url('${item.image
        }')"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-country">${item.country}</div>
                            <div class="cart-item-price">UGX ${item.price.toLocaleString()}</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Update totals
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    document.getElementById(
      "cart-subtotal"
    ).textContent = `UGX ${subtotal.toLocaleString()}`;
    document.getElementById(
      "cart-total"
    ).textContent = `UGX ${subtotal.toLocaleString()}`;

    // Enable checkout button
    document.getElementById("checkout-btn").disabled = false;
  }
}

function updateQuantity(index, change) {
  cart[index].quantity += change;

  // Remove item if quantity reaches 0
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCartCount();
  updateCartDisplay();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  updateCartDisplay();
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("cartModal");
  if (event.target === modal) {
    closeCart();
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", function () {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 968) {
      navLinks.style.display = "none";
    }
  });
});

// Responsive adjustments
function handleResponsive() {
  if (window.innerWidth > 968) {
    navLinks.style.display = "flex";
  } else {
    navLinks.style.display = "none";
  }
}

window.addEventListener("resize", handleResponsive);
handleResponsive();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');

    // Simulate submission
    this.querySelector("button").classList.add("btn-loading");

    setTimeout(() => {
      this.querySelector("button").classList.remove("btn-loading");

      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Thank you for subscribing!`;
      this.parentNode.insertBefore(successMsg, this.nextSibling);

      // Clear input
      emailInput.value = "";

      setTimeout(() => {
        successMsg.style.opacity = "0";
        setTimeout(() => {
          successMsg.parentNode.removeChild(successMsg);
        }, 500);
      }, 3000);
    }, 1500);
  });
}

// Contact form submission
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simulate submission
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add("btn-loading");
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove("btn-loading");
      submitBtn.disabled = false;

      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.innerHTML = `<i class="fas fa-check-circle"></i> Your message has been sent! We'll get back to you soon.`;
      this.parentNode.insertBefore(successMsg, this.nextSibling);

      // Clear form
      this.reset();

      setTimeout(() => {
        successMsg.style.opacity = "0";
        setTimeout(() => {
          successMsg.parentNode.removeChild(successMsg);
        }, 500);
      }, 5000);
    }, 2000);
  });
}

// Play button functionality
const playButton = document.querySelector(".play-button");
if (playButton) {
  playButton.addEventListener("click", function () {
    // In a real implementation, this would open a video modal
    alert("Video about our artisans would play here");
  });
}
// Simple image slider for all image boxes
