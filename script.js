const products = [
  { id: 1, name: "RTX 4070 Super", price: 69990 },
  { id: 2, name: "MSI B550 Tomahawk", price: 14990 },
  { id: 3, name: "Ryzen 7 5700X", price: 18990 },
  { id: 4, name: "Kingston Fury 32GB (2x16) DDR4", price: 9990 },
  { id: 5, name: "Samsung 990 Pro 1TB", price: 12990 },
];

const productList = document.getElementById("product-list");
const cartEl = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("pc-cart") || "[]");

function appendProducts() {
  if (!productList) return;
  productList.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product";
    card.innerHTML = `
      <div class="product-title">${p.name}</div>
      <div class="product-price">${p.price} ₽</div>
      <button data-id="${p.id}">Добавить</button>
    `;
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => addToCart(p.id));
    productList.appendChild(card);
  });
}

function saveCart() {
  localStorage.setItem("pc-cart", JSON.stringify(cart));
}

function appendCart() {
  if (!cartEl) return;
  cartEl.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    const row = document.createElement("div");
    row.className = "cart-item";
    const sum = product.price * item.qty;
    total += sum;
    row.innerHTML = `
      <div>
        <div>${product.name}</div>
        <div>${product.price} ₽ × ${item.qty} = ${sum} ₽</div>
      </div>
      <div class="qty-controls">
        <button data-action="dec">-</button>
        <button data-action="inc">+</button>
        <button data-action="del">×</button>
      </div>
    `;
    const [decBtn, incBtn, delBtn] = row.querySelectorAll("button");
    decBtn.addEventListener("click", () => changeQty(item.id, -1));
    incBtn.addEventListener("click", () => changeQty(item.id, +1));
    delBtn.addEventListener("click", () => removeFromCart(item.id));
    cartEl.appendChild(row);
  });

  if (cartCount) cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
  if (cartTotal) cartTotal.textContent = total;
  saveCart();
}

function addToCart(id) {
  const found = cart.find((i) => i.id === id);
  if (found) {
    found.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  appendCart();
}

function changeQty(id, delta) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((i) => i.id !== id);
  }
  appendCart();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  appendCart();
}

appendProducts();
appendCart();

const ordWindow = document.getElementById("ordwindow");
const checkoutBtn = document.getElementById("checkout-btn");
const closeOrdWindowBtn = document.getElementById("closeordwindow");
const orderForm = document.getElementById("orderform");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    ordWindow.classList.remove("hidden");
  });
}

if (closeOrdWindowBtn) {
  closeOrdWindowBtn.addEventListener("click", () => {
    ordWindow.classList.add("hidden");
  });
}

if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Заказ создан!");
    ordWindow.classList.add("hidden");
    cart = [];
    appendCart();
  });
}
