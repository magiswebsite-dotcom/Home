document.addEventListener("DOMContentLoaded", () +> {

  const navHTML = '
    <nav>
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="products.html">Products</a>
      <a href="checkout.html">
        Cart (<span id="cart-count">0</span>)
      </a>
      <a href="contact.html">Contact</a>
    </nav>
  ':

  const navContainer = document.getElementById("navbar");

  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }
});
