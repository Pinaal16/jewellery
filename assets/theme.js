/* ————— Lauviere theme JS: real Shopify AJAX cart ————— */

const money = cents =>
  (window.theme.moneyFormat || '${{amount}}').replace(/\{\{\s*amount\s*\}\}/, (cents / 100).toFixed(2));

/* ————— Cart drawer ————— */
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('cartOverlay');

function openCart() { drawer.classList.add('open'); overlay.classList.add('open'); }
function closeCart() { drawer.classList.remove('open'); overlay.classList.remove('open'); }

async function fetchCart() {
  const res = await fetch('/cart.js');
  return res.json();
}

function renderCart(cart) {
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cart.item_count;
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = money(cart.items_subtotal_price);

  const ship = document.getElementById('cartShip');
  if (ship) {
    const threshold = window.theme.freeShipThreshold;
    if (cart.items_subtotal_price >= threshold) ship.textContent = '✦ You’ve unlocked free shipping';
    else ship.textContent = `You’re ${money(threshold - cart.items_subtotal_price)} away from free shipping`;
  }

  const box = document.getElementById('cartItems');
  if (!box) return;
  if (!cart.items.length) {
    box.innerHTML = '<p class="cart-empty">Your cart is empty — for now.</p>';
    return;
  }
  box.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <div class="ci-art">${item.image ? `<img src="${item.image}&width=128" alt="" loading="lazy">` : ''}</div>
      <div>
        <p class="ci-name">${item.product_title}</p>
        ${item.variant_title && item.variant_title !== 'Default Title' ? `<p class="ci-price">${item.variant_title}</p>` : ''}
        <p class="ci-price">${money(item.final_price)}</p>
      </div>
      <div class="ci-qty">
        <button data-key="${item.key}" data-qty="${item.quantity - 1}" aria-label="Decrease quantity">−</button>
        <span>${item.quantity}</span>
        <button data-key="${item.key}" data-qty="${item.quantity + 1}" aria-label="Increase quantity">+</button>
      </div>
    </div>`).join('');
}

async function changeLine(key, quantity) {
  const res = await fetch('/cart/change.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: key, quantity })
  });
  renderCart(await res.json());
}

async function addToCart(variantId, button) {
  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Number(variantId), quantity: 1 })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (button) {
      button.textContent = err.description || 'Unavailable';
      setTimeout(() => { button.textContent = 'Add to cart'; }, 2000);
    }
    return;
  }
  renderCart(await fetchCart());
  if (button) {
    button.textContent = 'Added ✦'; button.classList.add('added');
    setTimeout(() => { button.textContent = 'Add to cart'; button.classList.remove('added'); }, 1200);
  }
  openCart();
}

document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

document.addEventListener('click', e => {
  const add = e.target.closest('[data-variant-id]');
  if (add) {
    e.preventDefault();
    addToCart(add.dataset.variantId, add);
    return;
  }
  const qty = e.target.closest('[data-key]');
  if (qty) changeLine(qty.dataset.key, Number(qty.dataset.qty));
});

/* ————— Product page: variant select + gallery ————— */
const pdpForm = document.getElementById('pdpForm');
if (pdpForm) {
  const select = pdpForm.querySelector('select[name="id"]');
  const priceNow = document.getElementById('pdpPriceNow');
  const priceWas = document.getElementById('pdpPriceWas');
  select?.addEventListener('change', () => {
    const opt = select.selectedOptions[0];
    if (priceNow && opt.dataset.price) priceNow.textContent = money(Number(opt.dataset.price));
    if (priceWas) priceWas.style.display = opt.dataset.compare ? '' : 'none';
    if (priceWas && opt.dataset.compare) priceWas.textContent = money(Number(opt.dataset.compare));
    const btn = pdpForm.querySelector('[data-variant-id]');
    if (btn) {
      btn.dataset.variantId = opt.value;
      btn.disabled = opt.dataset.available !== 'true';
      btn.textContent = opt.dataset.available === 'true' ? 'Add to cart' : 'Sold out';
    }
  });

  document.querySelectorAll('.pdp-thumbs button').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const main = document.querySelector('.pdp-media img');
      if (main && thumb.dataset.src) main.src = thumb.dataset.src;
      document.querySelectorAll('.pdp-thumbs button').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

/* ————— Mobile nav ————— */
document.getElementById('menuToggle')?.addEventListener('click', () => {
  document.getElementById('mobileNav')?.classList.toggle('open');
});

/* ————— Scroll reveal ————— */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));

/* ————— Email signup popup ————— */
(function () {
  var cfg = (window.theme && window.theme.popup) || {};
  var el = document.getElementById('signupPopup');
  var veil = document.getElementById('popupVeil');
  if (!cfg.enabled || !el || !veil) return;

  var KEY = 'lauviere-popup';
  var art = el.querySelector('.popup-art');
  if (art) el.classList.add('has-art');

  function seen() {
    try {
      var until = Number(localStorage.getItem(KEY) || 0);
      return until > Date.now();
    } catch (e) { return false; }
  }
  function remember(days) {
    try { localStorage.setItem(KEY, String(Date.now() + days * 86400000)); } catch (e) {}
  }

  var lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    el.hidden = false; veil.hidden = false;
    requestAnimationFrame(function () { el.classList.add('open'); veil.classList.add('open'); });
    var field = el.querySelector('input[type="email"]');
    if (field) setTimeout(function () { field.focus(); }, 400);
  }

  function close(days) {
    el.classList.remove('open'); veil.classList.remove('open');
    remember(days == null ? cfg.remindDays : days);
    setTimeout(function () { el.hidden = true; veil.hidden = true; }, 380);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.getElementById('popupClose').addEventListener('click', function () { close(); });
  document.getElementById('popupDecline').addEventListener('click', function () { close(); });
  veil.addEventListener('click', function () { close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !el.hidden) close();
  });

  // Keep tabbing inside the dialog while it is open
  el.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = el.querySelectorAll('button, [href], input, textarea, select');
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Shopify reloads with ?customer_posted=true after a successful signup
  if (/[?&]customer_posted=true/.test(window.location.search)) {
    var form = document.getElementById('popupForm');
    var done = document.getElementById('popupDone');
    if (form && done) { form.hidden = true; done.hidden = false; }
    remember(365);
    open();
    return;
  }

  if (!seen()) setTimeout(open, cfg.delay || 8000);
})();

/* ————— Init ————— */
fetchCart().then(renderCart);
