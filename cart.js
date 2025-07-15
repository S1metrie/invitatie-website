function loadCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    const cart = loadCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalQty;
  }
}

function addToCart(name, price) {
  let cart = loadCart();
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price: parseFloat(price), qty: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

function renderCart() {
  const rows = document.getElementById('cart-rows');
  if (!rows) return;
  const cart = loadCart();
  rows.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${item.name}</td>` +
      `<td>${item.qty}</td>` +
      `<td>${item.price} RON</td>` +
      `<td>${item.qty * item.price} RON</td>` +
      `<td><button class="remove" data-index="${index}">Șterge</button></td>`;
    rows.appendChild(row);
    total += item.qty * item.price;
  });
  const totalEl = document.getElementById('cart-total');
  if (totalEl) {
    totalEl.textContent = cart.length ? `Total: ${total} RON` : 'Coșul este gol';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.name, btn.dataset.price);
    });
  });

  const rows = document.getElementById('cart-rows');
  if (rows) {
    renderCart();
    rows.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove')) {
        const index = e.target.dataset.index;
        let cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
        updateCartCount();
      }
    });
    const clearBtn = document.getElementById('clear-cart');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        saveCart([]);
        renderCart();
        updateCartCount();
      });
    }
  }

  updateCartCount();
});
