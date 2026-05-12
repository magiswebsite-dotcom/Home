const PAYPAL_BUSINESS_EMAIL = "YOUR_PAYPAL_EMAIL@example.com";
const PAYPAL_CURRENCY = "USD";

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
}

function addToCart(name, price) {
  const cart = getCart();
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: Number(price),
      quantity: 1
    });
  }

  saveCart(cart);
  alert(`${name} added to cart.`);
}

function increaseQuantity(name) {
  const cart = getCart();
  const item = cart.find(item => item.name === name);

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
}

function decreaseQuantity(name) {
  let cart = getCart();
  const item = cart.find(item => item.name === name);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(item => item.name !== name);
  }

  saveCart(cart);
}

function removeFromCart(name) {
  const cart = getCart().filter(item => item.name !== name);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem("cart");
  updateCartCount();

  if (document.getElementById("cart-items")) {
    renderCartPage();
  }
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.textContent = count;
  }
}

function calculateCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCartPage() {
  const cart = getCart();
  const cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="empty-cart-message">Your cart is empty.</p>
    `;

    const paypalButton = document.querySelector(".paypal-btn");
    if (paypalButton) {
      paypalButton.disabled = true;
    }

    return;
  }

  let html = `
    <div class="cart-table">
      <div class="cart-row cart-header">
        <span>Item</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Item Total</span>
        <span>Remove</span>
      </div>
  `;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;

    html += `
      <div class="cart-row">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>

        <span class="quantity-box">
          <button type="button" onclick="decreaseQuantity('${item.name}')">-</button>
          <strong>${item.quantity}</strong>
          <button type="button" onclick="increaseQuantity('${item.name}')">+</button>
        </span>

        <span>$${itemTotal.toFixed(2)}</span>

        <span>
          <button type="button" class="remove-btn" onclick="removeFromCart('${item.name}')">
            Remove
          </button>
        </span>
      </div>
    `;
  });

  html += `
    </div>

    <div class="cart-total-box">
      <h3>Total: $${calculateCartTotal().toFixed(2)}</h3>
    </div>
  `;

  cartItems.innerHTML = html;

  const paypalButton = document.querySelector(".paypal-btn");
  if (paypalButton) {
    paypalButton.disabled = false;
  }
}

function checkoutWithPayPal() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let paypalURL = "https://www.paypal.com/cgi-bin/webscr";
  paypalURL += "?cmd=_cart";
  paypalURL += "&upload=1";
  paypalURL += "&business=" + encodeURIComponent(PAYPAL_BUSINESS_EMAIL);
  paypalURL += "&currency_code=" + encodeURIComponent(PAYPAL_CURRENCY);

  cart.forEach((item, index) => {
    const itemNumber = index + 1;

    paypalURL += `&item_name_${itemNumber}=${encodeURIComponent(item.name)}`;
    paypalURL += `&amount_${itemNumber}=${encodeURIComponent(item.price.toFixed(2))}`;
    paypalURL += `&quantity_${itemNumber}=${encodeURIComponent(item.quantity)}`;
  });

  window.location.href = paypalURL;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
