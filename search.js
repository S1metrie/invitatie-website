function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function applyCategoryFilter(cat) {
  const products = document.querySelectorAll('.produs');
  products.forEach(p => {
    const gender = p.dataset.gender;
    const season = p.dataset.season;
    if (cat === 'all' || gender === cat || season === cat) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
  document.querySelectorAll('.filter-bar button').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
}

function filterProducts(query) {
  const products = document.querySelectorAll('.produs');
  let found = false;
  products.forEach(p => {
    const name = p.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query.toLowerCase())) {
      p.style.display = 'block';
      found = true;
    } else {
      p.style.display = 'none';
    }
  });
  const message = document.getElementById('search-message');
  if (message) {
    message.textContent = found
      ? `Rezultate pentru "${query}"`
      : `Nu am găsit produse pentru "${query}"`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const q = form.querySelector('input').value.trim();
      if (q) {
        window.location.href = `produse.html?q=${encodeURIComponent(q)}`;
      }
    });
  });

  document.querySelectorAll('.filter-bar button').forEach(btn => {
    btn.addEventListener('click', () => {
      applyCategoryFilter(btn.dataset.filter);
    });
  });

  const q = getQueryParam('q');
  if (q) {
    const input = document.querySelector('.search-form input');
    if (input) input.value = q;
    filterProducts(q);
  }

  const f = getQueryParam('filter');
  if (f) {
    applyCategoryFilter(f);
  }
});
