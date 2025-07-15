function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2000);
}

function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;
  const body = document.body;
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
  }
  toggle.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  });
}

document.addEventListener('DOMContentLoaded', initDarkMode);

