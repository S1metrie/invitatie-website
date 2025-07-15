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
  if (typeof showToast === 'function') {
    showToast('Produs ad\u0103ugat!');
  }
}

function changeQty(index, delta) {
  let cart = loadCart();
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart(cart);
}

function renderCart() {
  const rows = document.getElementById('cart-rows');
  if (!rows) return;
  const cart = loadCart();
  rows.innerHTML = '';
  let subtotal = 0;
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${item.name}</td>` +
      `<td><button class="qty-btn decrease" data-index="${index}">-</button>` +
      `<span class="qty">${item.qty}</span>` +
      `<button class="qty-btn increase" data-index="${index}">+</button></td>` +
      `<td>${item.price} RON</td>` +
      `<td>${item.qty * item.price} RON</td>` +
      `<td><button class="remove" data-index="${index}">Șterge</button></td>`;
    rows.appendChild(row);
    subtotal += item.qty * item.price;
  });
  const shipping = cart.length ? 20 : 0;
  const vat = subtotal * 0.19;
  const total = subtotal + vat + shipping;
  const sEl = document.getElementById('subtotal');
  const vEl = document.getElementById('tva');
  const shEl = document.getElementById('shipping');
  const totalEl = document.getElementById('cart-total');
  if (sEl) sEl.textContent = cart.length ? `${subtotal.toFixed(2)} RON` : '0 RON';
  if (vEl) vEl.textContent = cart.length ? `${vat.toFixed(2)} RON` : '0 RON';
  if (shEl) shEl.textContent = cart.length ? `${shipping.toFixed(2)} RON` : '0 RON';
  if (totalEl) totalEl.textContent = cart.length ? `${total.toFixed(2)} RON` : 'Coșul este gol';
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
      const index = e.target.dataset.index;
      if (e.target.classList.contains('remove')) {
        let cart = loadCart();
        cart.splice(index, 1);
        saveCart(cart);
      } else if (e.target.classList.contains('increase')) {
        changeQty(index, 1);
      } else if (e.target.classList.contains('decrease')) {
        changeQty(index, -1);
      } else {
        return;
      }
      renderCart();
      updateCartCount();
      if (typeof showToast === 'function') {
        showToast('Coș actualizat');
      }
    });
    const clearBtn = document.getElementById('clear-cart');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          saveCart([]);
          renderCart();
          updateCartCount();
          if (typeof showToast === 'function') {
            showToast('Coș golit');
          }
        });
      }
  }

  updateCartCount();
});
