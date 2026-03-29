function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();
  let item = cart.find(i => i.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  alert(name + " added to cart");
}

function clearCart() {
  localStorage.removeItem("cart");
}