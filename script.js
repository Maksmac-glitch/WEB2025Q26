const products = [
  { id: 1, name: "RTX 4070 Super", price: 69990 },
  { id: 2, name: "MSI B550 Tomahawk", price: 14990 },
  { id: 3, name: "Ryzen 7 5700X", price: 18990 },
  { id: 4, name: "Kingston Fury 32GB (2x16) DDR4", price: 9990 },
  { id: 5, name: "Samsung 990 Pro 1TB", price: 12990 },
];

const productList = document.getElementById("product-list");

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
    productList.appendChild(card);
  });
}

appendProducts();
