/* ————— Aurelle storefront ————— */

// SVG art generators — each product gets hand-drawn line art on a soft gradient tile
const DEFS = `<defs>
  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8c66b"/><stop offset=".55" stop-color="#c9a227"/><stop offset="1" stop-color="#9a7a1a"/></linearGradient>
  <radialGradient id="p" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#f3ead9"/><stop offset="1" stop-color="#d9c9a8"/></radialGradient>
  <linearGradient id="e" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f6b52"/><stop offset="1" stop-color="#143327"/></linearGradient>
  <linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d98b6c"/><stop offset="1" stop-color="#a04d33"/></linearGradient>
  <linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7ba3c9"/><stop offset="1" stop-color="#3c6183"/></linearGradient>
</defs>`;

const ART = {
  heartPendant: `<path d="M30 22 C 30 78, 130 78, 130 22" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/><path d="M80 70 l0 12" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round"/><path d="M80 132 C 60 116, 52 104, 52 94 a14 14 0 0 1 28 -4 a14 14 0 0 1 28 4 c0 10 -8 22 -28 38z" fill="url(#r)" stroke="url(#g)" stroke-width="3"/>`,
  crossPendant: `<path d="M30 22 C 30 78, 130 78, 130 22" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/><path d="M80 70 l0 10" stroke="url(#g)" stroke-width="3.5" stroke-linecap="round"/><g stroke="url(#g)" stroke-width="12" stroke-linecap="round"><path d="M80 86 v46"/><path d="M62 100 h36"/></g><circle cx="80" cy="100" r="5" fill="url(#e)"/>`,
  beadBracelet: `<ellipse cx="80" cy="82" rx="48" ry="42" fill="none" stroke="url(#g)" stroke-width="3"/>${[0,45,90,135,180,225,270,315].map(a=>{const r1=Math.PI*a/180;return `<circle cx="${80+48*Math.cos(r1)}" cy="${82+42*Math.sin(r1)}" r="9" fill="${a%90===0?'url(#e)':'url(#p)'}"/>`}).join('')}`,
  huggies: `<circle cx="55" cy="82" r="26" fill="none" stroke="url(#g)" stroke-width="7"/><circle cx="55" cy="52" r="5" fill="url(#g)"/><circle cx="105" cy="82" r="26" fill="none" stroke="url(#g)" stroke-width="7"/><circle cx="105" cy="52" r="5" fill="url(#g)"/><circle cx="55" cy="108" r="5" fill="url(#r)"/><circle cx="105" cy="108" r="5" fill="url(#b)"/>`,
  hoops: `<circle cx="55" cy="85" r="30" fill="none" stroke="url(#g)" stroke-width="6"/><rect x="49" y="106" width="12" height="18" rx="4" fill="url(#e)" stroke="url(#g)" stroke-width="2"/><circle cx="105" cy="85" r="30" fill="none" stroke="url(#g)" stroke-width="6"/><rect x="99" y="106" width="12" height="18" rx="4" fill="url(#e)" stroke="url(#g)" stroke-width="2"/><circle cx="55" cy="51" r="4.5" fill="url(#g)"/><circle cx="105" cy="51" r="4.5" fill="url(#g)"/>`,
  bangle: `<ellipse cx="80" cy="82" rx="50" ry="44" fill="none" stroke="url(#g)" stroke-width="9"/><ellipse cx="80" cy="82" rx="50" ry="44" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2" transform="translate(-2 -2)"/><circle cx="80" cy="38" r="8" fill="url(#p)"/>`,
  pearlHeart: `<ellipse cx="80" cy="82" rx="48" ry="42" fill="none" stroke="url(#g)" stroke-width="4"/>${[210,240,270,300,330].map(a=>{const r1=Math.PI*a/180;return `<circle cx="${80+48*Math.cos(r1)}" cy="${82+42*Math.sin(r1)}" r="8" fill="url(#p)"/>`}).join('')}<path d="M80 52 C 72 44, 60 46, 60 56 c0 7 9 13 20 22 c11 -9 20 -15 20 -22 c0 -10 -12 -12 -20 -4z" fill="url(#r)" stroke="url(#g)" stroke-width="2.5" transform="translate(0 60)"/>`,
  monogram: `<path d="M30 22 C 30 80, 130 80, 130 22" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/><circle cx="80" cy="104" r="30" fill="url(#e)" stroke="url(#g)" stroke-width="3.5"/><text x="80" y="116" text-anchor="middle" font-family="Georgia,serif" font-size="34" font-style="italic" fill="#e8c66b">A</text>`,
  butterfly: `<path d="M30 22 C 30 76, 130 76, 130 22" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/><g transform="translate(80 106)"><path d="M0 -6 C -30 -34, -46 -6, -12 6 C -40 24, -18 40, 0 12" fill="url(#b)" stroke="url(#g)" stroke-width="2.5"/><path d="M0 -6 C 30 -34, 46 -6, 12 6 C 40 24, 18 40, 0 12" fill="url(#r)" stroke="url(#g)" stroke-width="2.5"/><line x1="0" y1="-12" x2="0" y2="16" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/></g>`,
  sunburst: `<circle cx="80" cy="85" r="24" fill="url(#b)" stroke="url(#g)" stroke-width="4"/>${[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>{const r1=Math.PI*a/180;return `<line x1="${80+32*Math.cos(r1)}" y1="${85+32*Math.sin(r1)}" x2="${80+46*Math.cos(r1)}" y2="${85+46*Math.sin(r1)}" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/>`}).join('')}<circle cx="80" cy="35" r="5" fill="url(#g)"/>`,
  snake: `<path d="M28 40 q 26 18 52 0 t 52 0 M28 70 q 26 18 52 0 t 52 0 M28 100 q 26 18 52 0 t 52 0" fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round"/><path d="M28 40 q 26 18 52 0 t 52 0 M28 70 q 26 18 52 0 t 52 0 M28 100 q 26 18 52 0 t 52 0" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>`,
  tulip: `<path d="M24 96 C 50 60, 110 60, 136 96" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/><g transform="translate(80 84)"><path d="M-11 6 c0 -16 -4 -22 -11 -26 c12 -2 16 4 16 10 c0 -10 2 -16 6 -20 c4 4 6 10 6 20 c0 -6 4 -12 16 -10 c-7 4 -11 10 -11 26 z" fill="url(#r)" stroke="url(#g)" stroke-width="2.5"/></g><circle cx="46" cy="76" r="4" fill="url(#p)"/><circle cx="114" cy="76" r="4" fill="url(#p)"/>`,
  toteBag: `<path d="M36 58 h88 l-8 62 a8 8 0 0 1 -8 7 H52 a8 8 0 0 1 -8 -7z" fill="url(#e)" stroke="url(#g)" stroke-width="3.5"/><path d="M58 58 v-10 a22 22 0 0 1 44 0 v10" fill="none" stroke="url(#g)" stroke-width="4.5"/><g stroke="#e8c66b" stroke-opacity=".6" stroke-width="1.5"><path d="M44 74 h72 M46 90 h68 M48 106 h64"/></g><circle cx="80" cy="90" r="9" fill="url(#r)"/>`,
  duffel: `<rect x="24" y="62" width="112" height="58" rx="29" fill="url(#b)" stroke="url(#g)" stroke-width="3.5"/><path d="M58 62 a24 24 0 0 1 44 0" fill="none" stroke="url(#g)" stroke-width="4.5"/><g stroke="#fff" stroke-opacity=".5" stroke-width="1.5"><path d="M40 78 q 40 14 80 0 M40 96 q 40 14 80 0"/></g><rect x="70" y="62" width="20" height="58" fill="url(#r)" opacity=".85"/>`,
  laptopSleeve: `<rect x="30" y="46" width="100" height="72" rx="10" fill="url(#r)" stroke="url(#g)" stroke-width="3.5"/><path d="M30 66 h100" stroke="url(#g)" stroke-width="3"/><circle cx="80" cy="56" r="5" fill="url(#g)"/><g stroke="#fff" stroke-opacity=".55" stroke-width="1.5"><path d="M42 82 h76 M42 96 h76"/><circle cx="56" cy="89" r="6" fill="none"/><circle cx="104" cy="89" r="6" fill="none"/></g>`,
  studSet: `<circle cx="48" cy="60" r="9" fill="url(#p)" stroke="url(#g)" stroke-width="2.5"/><circle cx="112" cy="60" r="9" fill="url(#p)" stroke="url(#g)" stroke-width="2.5"/><path d="M80 96 c-8 -9 -14 -14 -14 -20 a8 8 0 0 1 14 -4 a8 8 0 0 1 14 4 c0 6 -6 11 -14 20z" fill="url(#r)" stroke="url(#g)" stroke-width="2.5"/><path d="M42 112 l6 -12 6 12 -6 12z" fill="url(#e)" stroke="url(#g)" stroke-width="2"/><path d="M106 112 l6 -12 6 12 -6 12z" fill="url(#e)" stroke="url(#g)" stroke-width="2"/>`,
};

function tile(art, bg) {
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">${DEFS}<rect width="160" height="160" rx="18" fill="${bg}"/>${ART[art]}</svg>`;
}

const BG = { cream: '#f3ead9', blush: '#f0e0d6', sage: '#e3e9e0', sky: '#e2e9ef' };

const PRODUCTS = [
  // New arrivals
  { id: 'n1', grid: 'new', name: 'Puffy Heart Pendant Necklace', price: 29.99, art: 'heartPendant', bg: BG.blush, badge: 'New' },
  { id: 'n2', grid: 'new', name: 'Faith Birthstone Cross Necklace', price: 24.99, art: 'crossPendant', bg: BG.cream, badge: 'New' },
  { id: 'n3', grid: 'new', name: 'Aurora Crystal Huggie Earrings', price: 29.99, was: 59.99, art: 'huggies', bg: BG.sage, badge: 'Sale' },
  { id: 'n4', grid: 'new', name: 'Baguette Drop Hoop Earrings', price: 24.99, art: 'hoops', bg: BG.sky, badge: 'New' },
  { id: 'n5', grid: 'new', name: 'White Enamel Heritage Bangle', price: 29.99, art: 'bangle', bg: BG.cream },
  { id: 'n6', grid: 'new', name: 'Celeste Pearl Heart Bangle', price: 29.99, art: 'pearlHeart', bg: BG.blush },
  { id: 'n7', grid: 'new', name: 'Luxe Monogram Charm Necklace', price: 24.99, art: 'monogram', bg: BG.sage },
  { id: 'n8', grid: 'new', name: 'Papillon Birthstone Necklace', price: 24.99, art: 'butterfly', bg: BG.sky },
  // Handmade
  { id: 'h1', grid: 'handmade', name: 'Coastal Palm Quilted Tote', price: 69, was: 145, art: 'toteBag', bg: BG.sky, badge: 'Sale' },
  { id: 'h2', grid: 'handmade', name: 'Blush Bloom Weekender Duffel', price: 75, was: 169, art: 'duffel', bg: BG.blush, badge: 'Sale' },
  { id: 'h3', grid: 'handmade', name: 'Safari Luxe Laptop Sleeve 15"', price: 35, was: 69, art: 'laptopSleeve', bg: BG.sage, badge: 'Sale' },
  { id: 'h4', grid: 'handmade', name: 'Sweetheart Block-Print Tote', price: 69, was: 145, art: 'toteBag', bg: BG.cream, badge: 'Sale' },
  // Most loved
  { id: 'l1', grid: 'loved', name: 'Golden Tulip Vine Necklace', price: 69, art: 'tulip', bg: BG.cream, badge: 'Bestseller' },
  { id: 'l2', grid: 'loved', name: 'Golden Snake Chain Necklace', price: 24.99, was: 39.99, art: 'snake', bg: BG.blush, badge: 'Sale' },
  { id: 'l3', grid: 'loved', name: 'Turquoise Sunburst Hoops', price: 24.99, art: 'sunburst', bg: BG.sage, badge: 'Bestseller' },
  { id: 'l4', grid: 'loved', name: 'Nova Beaded Bracelet', price: 29.99, art: 'beadBracelet', bg: BG.sky },
  { id: 'l5', grid: 'loved', name: 'Heart & Crystal Stud Trio', price: 8.99, art: 'studSet', bg: BG.blush, badge: 'Under $10' },
  { id: 'l6', grid: 'loved', name: 'Emerald Radiance Bangle', price: 29.99, art: 'bangle', bg: BG.sage },
  { id: 'l7', grid: 'loved', name: 'Rosé Pearl Charm Necklace', price: 29.99, was: 59.99, art: 'pearlHeart', bg: BG.cream, badge: 'Sale' },
  { id: 'l8', grid: 'loved', name: 'Luxe Hoop Trio Set', price: 19.99, was: 39.99, art: 'hoops', bg: BG.blush, badge: 'Sale' },
];

const money = n => `$${n.toFixed(2)}`;

// ————— Render product grids —————
function renderGrids() {
  for (const gridName of ['new', 'handmade', 'loved']) {
    const el = document.getElementById(gridName + 'Grid');
    el.innerHTML = PRODUCTS.filter(p => p.grid === gridName).map(p => `
      <article class="product-card reveal">
        <div class="pc-img" style="background:${p.bg}">
          ${p.badge ? `<span class="badge ${p.badge === 'Sale' ? 'sale' : ''}">${p.badge}</span>` : ''}
          ${tile(p.art, p.bg)}
        </div>
        <div class="pc-body">
          <h3 class="pc-name">${p.name}</h3>
          <p class="pc-price">
            ${p.was ? `<span class="was">${money(p.was)}</span>` : ''}
            <span class="now">${money(p.price)}</span>
          </p>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </article>`).join('');
  }
}

// ————— Cart —————
let cart = {};
try { cart = JSON.parse(localStorage.getItem('aurelle-cart') || '{}'); } catch { cart = {}; }

const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('cartOverlay');
const FREE_SHIP = 79;

function saveCart() { localStorage.setItem('aurelle-cart', JSON.stringify(cart)); }

function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === id), qty }))
    .filter(e => e.p && e.qty > 0);
}

function renderCart() {
  const entries = cartEntries();
  const count = entries.reduce((s, e) => s + e.qty, 0);
  const total = entries.reduce((s, e) => s + e.p.price * e.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = money(total);

  const ship = document.getElementById('cartShip');
  if (total >= FREE_SHIP) ship.textContent = '✦ You’ve unlocked free shipping';
  else ship.textContent = `You’re ${money(FREE_SHIP - total)} away from free shipping`;

  const box = document.getElementById('cartItems');
  if (!entries.length) {
    box.innerHTML = '<p class="cart-empty">Your cart is empty — for now.</p>';
    return;
  }
  box.innerHTML = entries.map(({ p, qty }) => `
    <div class="cart-item">
      <div class="ci-art">${tile(p.art, p.bg)}</div>
      <div>
        <p class="ci-name">${p.name}</p>
        <p class="ci-price">${money(p.price)}</p>
      </div>
      <div class="ci-qty">
        <button data-dec="${p.id}" aria-label="Decrease">−</button>
        <span>${qty}</span>
        <button data-inc="${p.id}" aria-label="Increase">+</button>
      </div>
    </div>`).join('');
}

function openCart() { drawer.classList.add('open'); overlay.classList.add('open'); }
function closeCart() { drawer.classList.remove('open'); overlay.classList.remove('open'); }

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

document.addEventListener('click', e => {
  const add = e.target.closest('.add-btn');
  if (add) {
    const id = add.dataset.id;
    cart[id] = (cart[id] || 0) + 1;
    saveCart(); renderCart();
    add.textContent = 'Added ✦'; add.classList.add('added');
    setTimeout(() => { add.textContent = 'Add to cart'; add.classList.remove('added'); }, 1200);
    return;
  }
  const inc = e.target.closest('[data-inc]');
  if (inc) { cart[inc.dataset.inc]++; saveCart(); renderCart(); return; }
  const dec = e.target.closest('[data-dec]');
  if (dec) {
    const id = dec.dataset.dec;
    cart[id]--; if (cart[id] <= 0) delete cart[id];
    saveCart(); renderCart();
  }
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  const btn = document.getElementById('checkoutBtn');
  btn.textContent = 'This is a demo ✦';
  setTimeout(() => btn.textContent = 'Checkout', 1600);
});

// ————— Newsletter —————
document.getElementById('newsForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('newsDone').classList.add('show');
  e.target.reset();
});

// ————— Scroll reveal —————
function watchReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}

// ————— Social-proof toast —————
const TOAST_LINES = [
  ['Someone in Perth', 'Papillon Birthstone Necklace'],
  ['Someone in Sydney', 'Coastal Palm Quilted Tote'],
  ['Someone in Melbourne', 'Luxe Hoop Trio Set'],
  ['Someone in Brisbane', 'Golden Snake Chain Necklace'],
];
let toastIdx = 0;
function showToast() {
  const [who, what] = TOAST_LINES[toastIdx++ % TOAST_LINES.length];
  const t = document.getElementById('toast');
  t.innerHTML = `<strong>${who}</strong> just bought the <strong>${what}</strong><small>Verified order · a few minutes ago</small>`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4200);
}
setTimeout(showToast, 6000);
setInterval(showToast, 19000);

// ————— Init —————
renderGrids();
renderCart();
watchReveals();
