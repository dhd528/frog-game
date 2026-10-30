const KEY = 'frog:skin';
const SKINS = [
  { id: 'classic', label: '经典奶蛙' },
  { id: 'mei', label: '阿玫' }
];

function current() {
  try {
    return localStorage.getItem(KEY) || 'classic';
  } catch {
    return 'classic';
  }
}

function mount() {
  if (document.getElementById('dsh-skin-panel')) return;
  const panel = document.createElement('div');
  panel.id = 'dsh-skin-panel';
  panel.innerHTML =
    '<div class="dsh-skin-title">皮肤</div>' +
    SKINS.map(
      (s) => `<button class="dsh-skin-btn" data-skin="${s.id}">${s.label}</button>`
    ).join('');

  panel.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-skin]');
    if (!btn) return;
    try {
      localStorage.setItem(KEY, btn.dataset.skin);
    } catch {
      return;
    }
    location.reload();
  });

  document.body.appendChild(panel);

  const active = current();
  for (const btn of panel.querySelectorAll('[data-skin]')) {
    btn.classList.toggle('active', btn.dataset.skin === active);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
