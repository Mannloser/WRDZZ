// ---- Quick utils & sample data ----
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

const sampleBooks = [
  {id: 1, title: "Harry Potter Complete Edition", author: "J.K. Rowling", price: 1299, stock: 42},
  {id: 2, title: "A Silent Voice", author: "Yoshitoki Ōima", price: 1999, stock: 28},
  {id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 2999, stock: 35},
  {id: 4, title: "Atomic Habits", author: "James Clear", price: 1099, stock: 19},
  {id: 5, title: "Ikigai", author: "Héctor García & Francesc Miralles", price: 899, stock: 31},
  {id: 6, title: "Deep Work", author: "Cal Newport", price: 1199, stock: 22},
  {id: 7, title: "Do Epic Sh*t", author: "Ankur Warikoo", price: 799, stock: 17},
  {id: 8, title: "Gild", author: "Richa Anirudh", price: 1599, stock: 26},
  {id: 9, title: "The Starless Sea", author: "Erin Morgenstern", price: 1799, stock: 15},
  {id: 10, title: "Six of Crows", author: "Leigh Bardugo", price: 1499, stock: 33},
  {id: 11, title: "The Alchemist", author: "Paulo Coelho", price: 999, stock: 29}
];


const sampleUsers = [
    { id: 1, name: 'Rhea', email: 'rhea@example.com', role: 'customer', active: true },
    { id: 2, name: 'Amit', email: 'amit@example.com', role: 'customer', active: true },
    { id: 3, name: 'Zara', email: 'zara@example.com', role: 'admin', active: true },
];

const sampleOrders = [
    { id: 1, customer: 'Rhea', items: [{ title: 'Atomic Habits', qty: 1 }], total: 299, status: 'Processing', date: '2025-09-10' },
    { id: 2, customer: 'Amit', items: [{ title: 'The Alchemist', qty: 2 }], total: 398, status: 'Shipped', date: '2025-09-05' },
    { id: 3, customer: 'Rhea', items: [{ title: 'Deep Work', qty: 1 }], total: 349, status: 'Delivered', date: '2025-08-28' },
];

// ---- Local storage wrapper ----
function load(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback }
}
function save(key, v) { localStorage.setItem(key, JSON.stringify(v)) }

// Initialize data if empty
if (!load('bs_books', null)) save('bs_books', sampleBooks);
if (!load('bs_users', null)) save('bs_users', sampleUsers);
if (!load('bs_orders', null)) save('bs_orders', sampleOrders);

// ---- App state ----
let books = load('bs_books', sampleBooks);
let users = load('bs_users', sampleUsers);
let orders = load('bs_orders', sampleOrders);

// ---- Page nav ----
$$('.nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        $$('.nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showPage(btn.dataset.page);
    })
})
function showPage(name) {
    $$('.page').forEach(p => p.style.display = 'none');
    const el = $(`#${name}`);
    if (el) el.style.display = 'block';
}

// topbar date
function updateDate() {
    const d = new Date();
    $('#currentDate').textContent = d.toLocaleString();
}
setInterval(updateDate, 1000);
updateDate();

// ---- Dashboard ----
function calcRevenueThisMonth() {
    const now = new Date();
    const thisMonth = now.getMonth();
    let total = 0;
    orders.forEach(o => {
        const d = new Date(o.date);
        if (d.getMonth() === thisMonth && d.getFullYear() === now.getFullYear()) total += Number(o.total || 0);
    })
    return total;
}
function updateKPIs() {
    $('#kpiRevenue').textContent = `₹${calcRevenueThisMonth()}`;
    $('#kpiOrders').textContent = orders.length;
    $('#kpiBooks').textContent = books.length;
    $('#kpiUsers').textContent = users.filter(u => u.active).length;
}

// revenue chart: simple bar chart using canvas
function drawRevenueChart() {
    const ctx = $('#revenueChart');
    const c = ctx.getContext('2d');
    // months (last 6)
    const labels = [];
    const data = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const m = d.toLocaleString('default', { month: 'short' });
        labels.push(m);
        const sum = orders.reduce((acc, o) => { const od = new Date(o.date); if (od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear()) return acc + Number(o.total || 0); return acc; }, 0);
        data.push(sum);
    }
    // draw
    const w = ctx.width = ctx.getAttribute('width');
    const h = ctx.height = ctx.getAttribute('height');
    c.clearRect(0, 0, w, h);
    // grid
    c.strokeStyle = 'rgba(255,255,255,0.04)'; c.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
        c.beginPath(); c.moveTo(0, h - (g * (h / 4))); c.lineTo(w, h - (g * (h / 4))); c.stroke();
    }
    const max = Math.max(...data, 100);
    const pad = 30;
    const barW = (w - pad * 2) / data.length * 0.6;
    data.forEach((v, i) => {
        const x = pad + i * ((w - pad * 2) / data.length) + ((w - pad * 2) / data.length - barW) / 2;
        const barH = (v / max) * (h - 40);
        const y = h - barH - 20;
        // bar
        const grd = c.createLinearGradient(x, y, x, y + barH);
        grd.addColorStop(0, 'rgba(125,10,10,0.95)');
        grd.addColorStop(1, 'rgba(138,56,50,0.6)');
        c.fillStyle = grd;
        roundRect(c, x, y, barW, barH, 6, true, false);
        // label
        c.fillStyle = 'rgba(255,255,255,0.8)';
        c.font = '12px Inter';
        c.fillText(labels[i], x, h - 4);
    })
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
    if (typeof r === 'undefined') r = 5;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
}

// Recent orders table
function renderRecentOrders() {
    const t = $('#recentOrders'); t.innerHTML = '';
    const recent = orders.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    recent.forEach(o => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>#${o.id}</td><td>${o.customer}</td><td>₹${o.total}</td><td><span class='badge ${o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'warn' : 'danger'}'>${o.status}</span></td>`;
        t.appendChild(tr);
    })
}

// ---- Books management ----
function renderBooks(filter = '') {
    const tbody = $('#booksTable tbody'); tbody.innerHTML = '';
    const q = filter.trim().toLowerCase();
    books.forEach(b => {
        if (q && !(b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(b.title)}</td><td>${escapeHtml(b.author)}</td><td>₹${b.price}</td><td>${b.stock}</td><td class='table-actions'><button class='btn ghost' data-id='${b.id}' data-act='edit'>Edit</button><button class='btn ghost' data-id='${b.id}' data-act='delete'>Delete</button></td>`;
        tbody.appendChild(tr);
    })
}

function openBookModal(mode = 'add', book = null) {
    $('#bookModal').classList.add('show');
    $('#modalTitle').textContent = mode === 'add' ? 'Add Book' : 'Edit Book';
    $('#bookTitle').value = book ? book.title : '';
    $('#bookAuthor').value = book ? book.author : '';
    $('#bookPrice').value = book ? book.price : '';
    $('#bookStock').value = book ? book.stock : '';
    $('#saveBook').dataset.mode = mode;
    if (book) $('#saveBook').dataset.id = book.id; else delete $('#saveBook').dataset.id;
}
function closeBookModal() {
    $('#bookModal').classList.remove('show');
}

$('#cancelModal').addEventListener('click', closeBookModal);

$('#saveBook').addEventListener('click', () => {
    const mode = $('#saveBook').dataset.mode;
    const title = $('#bookTitle').value.trim();
    const author = $('#bookAuthor').value.trim();
    const price = Number($('#bookPrice').value) || 0;
    const stock = Number($('#bookStock').value) || 0;
    if (!title || !author) { alert('Title and author are required'); return; }
    if (mode === 'add') {
        const id = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
        books.push({ id, title, author, price, stock });
    } else {
        const id = Number($('#saveBook').dataset.id);
        const idx = books.findIndex(b => b.id === id);
        if (idx > -1) books[idx] = { ...books[idx], title, author, price, stock };
    }
    save('bs_books', books); renderBooks($('#bookSearch').value || ''); updateKPIs(); drawRevenueChart(); closeBookModal();
})

$('#booksTable').addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const id = Number(btn.dataset.id);
    const act = btn.dataset.act;
    if (act === 'edit') { const book = books.find(b => b.id === id); openBookModal('edit', book); }
    if (act === 'delete') { if (confirm('Delete this book?')) { books = books.filter(b => b.id !== id); save('bs_books', books); renderBooks($('#bookSearch').value || ''); updateKPIs(); } }
})

// ---- Users ----
function renderUsers(filter = '') {
    const tbody = $('#usersTable tbody'); tbody.innerHTML = '';
    const q = filter.trim().toLowerCase();
    users.forEach(u => {
        if (q && !(u.name.toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q))) return;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(u.name)}</td><td>${escapeHtml(u.email)}</td><td>${escapeHtml(u.role)}</td><td>${u.active ? '<span class="badge success">Active</span>' : '<span class="badge danger">Suspended</span>'}</td><td class='table-actions'><button class='btn ghost' data-id='${u.id}' data-act='toggle'>Toggle</button><button class='btn ghost' data-id='${u.id}' data-act='del'>Delete</button></td>`;
        tbody.appendChild(tr);
    })
}

$('#usersTable').addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const id = Number(btn.dataset.id);
    const act = btn.dataset.act;
    if (act === 'toggle') { users = users.map(u => u.id === id ? { ...u, active: !u.active } : u); save('bs_users', users); renderUsers($('#userSearch').value || ''); updateKPIs(); }
    if (act === 'del') { if (confirm('Delete user?')) { users = users.filter(u => u.id !== id); save('bs_users', users); renderUsers($('#userSearch').value || ''); updateKPIs(); } }
})

// ---- Orders ----
function renderOrders(filter = '') {
    const tbody = $('#ordersTable tbody'); tbody.innerHTML = '';
    const q = filter.trim().toLowerCase();
    orders.forEach(o => {
        if (q && !(String(o.id).includes(q) || (o.customer || '').toLowerCase().includes(q))) return;
        const items = o.items.map(i => `${i.title} x${i.qty}`).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>#${o.id}</td><td>${escapeHtml(o.customer)}</td><td>${escapeHtml(items)}</td><td>₹${o.total}</td><td><span class='badge ${o.status === 'Delivered' ? 'success' : o.status === 'Shipped' ? 'warn' : 'danger'}'>${o.status}</span></td><td class='table-actions'><button class='btn ghost' data-id='${o.id}' data-act='next'>Next</button><button class='btn ghost' data-id='${o.id}' data-act='del'>Delete</button></td>`;
        tbody.appendChild(tr);
    })
}

$('#ordersTable').addEventListener('click', (e) => {
    const btn = e.target.closest('button'); if (!btn) return;
    const id = Number(btn.dataset.id); const act = btn.dataset.act;
    const idx = orders.findIndex(o => o.id === id); if (idx === -1) return;
    if (act === 'next') {
        const order = orders[idx];
        const seq = ['Processing', 'Shipped', 'Delivered'];
        const i = seq.indexOf(order.status);
        order.status = seq[Math.min(seq.length - 1, i + 1)];
        save('bs_orders', orders); renderOrders($('#orderSearch').value || ''); renderRecentOrders(); drawRevenueChart();
    }
    if (act === 'del') { if (confirm('Delete order?')) { orders.splice(idx, 1); save('bs_orders', orders); renderOrders($('#orderSearch').value || ''); renderRecentOrders(); updateKPIs(); } }
})

// ---- helpers & events
function escapeHtml(s) { return (s || '').replace(/[&<>"]+/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c)); }

$('#bookSearch').addEventListener('input', (e) => renderBooks(e.target.value));
$('#userSearch').addEventListener('input', (e) => renderUsers(e.target.value));
$('#orderSearch').addEventListener('input', (e) => renderOrders(e.target.value));

$('#globalSearch').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    // quick filter: switch to matching page
    if (q.includes('book') || q.length === 0) { showPage('books'); $('.nav button[data-page="books"]').classList.add('active'); }
})

// quick nav
$('#goBooks').addEventListener('click', () => { showPage('books'); $$('.nav button').forEach(b => b.classList.remove('active')); $('.nav button[data-page="books"]').classList.add('active'); });
$('#goUsers').addEventListener('click', () => { showPage('users'); $$('.nav button').forEach(b => b.classList.remove('active')); $('.nav button[data-page="users"]').classList.add('active'); });
$('#goOrders').addEventListener('click', () => { showPage('orders'); $$('.nav button').forEach(b => b.classList.remove('active')); $('.nav button[data-page="orders"]').classList.add('active'); });

// add book triggers
$('#addBookBtn').addEventListener('click', () => openBookModal('add'));
$('#quickAdd').addEventListener('click', () => { openBookModal('add') });

// theme customization
$('#colorPrimary').addEventListener('change', (e) => { document.documentElement.style.setProperty('--primary-color', e.target.value); });
$('#colorSecondary').addEventListener('change', (e) => { document.documentElement.style.setProperty('--secondary-color', e.target.value); });
$('#resetTheme').addEventListener('click', () => { document.documentElement.style.setProperty('--primary-color', '#7d0a0a'); document.documentElement.style.setProperty('--secondary-color', '#8a3832'); $('#colorPrimary').value = '#7d0a0a'; $('#colorSecondary').value = '#8a3832'; });

// initial render
function refreshAll() { books = load('bs_books', sampleBooks); users = load('bs_users', sampleUsers); orders = load('bs_orders', sampleOrders); renderBooks(); renderUsers(); renderOrders(); updateKPIs(); drawRevenueChart(); renderRecentOrders(); }
refreshAll();

// small usability: close modal on outside click
$('#bookModal').addEventListener('click', (e) => { if (e.target.id === 'bookModal') closeBookModal(); });

// expose for debugging
window.BookstoreAdmin = { refreshAll, books, users, orders };