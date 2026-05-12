function loadNavbar() {
  const navContainer = document.getElementById("navbar");

  if (!navContainer) {
    return;
  }

  navContainer.innerHTML = `
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="products.html">Products</a>
      <a href="checkout.html">Cart (<span id="cart-count">0</span>)</a>
      <a href="custom.html">Custom</a>
      <a href="contact.html">Contact</a>
    </nav>
  `;

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

document.addEventListener("DOMContentLoaded", loadNavbar);
