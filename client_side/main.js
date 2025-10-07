/* ===========================
   SECTION 1: ANIMATED WEBSITE TITLE
   =========================== */

let frames = [
  "W",
  "WR",
  "WRD",
  "WRDZ",
  "WRDZZ",
  "WRDZ",
  "WRD",
  "WR",
  "W"
];

let i = 0;
setInterval(() => {
  document.title = frames[i];
  i = (i + 1) % frames.length;
}, 250);





/* ===========================
   SECTION 2: WEBSITE LOADER
   =========================== */

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1950);
});


/* ===========================
   SECTION 3: NAVBAR SCROLL EFFECT
   =========================== */

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".navbar");
  if (!navbar) {
    console.error("Navbar not found ❌");
    return;
  }

  let prevScroll = window.scrollY;
  const navHeight = navbar.offsetHeight;

  window.addEventListener("scroll", () => {

    let currentScroll = window.scrollY;

    if (currentScroll > prevScroll) {
      // scrolling down → hide
      navbar.style.top = `-${navHeight}px`;
    } else {
      // scrolling up → show
      navbar.style.top = "0";
    }

    prevScroll = currentScroll;
  });
});



/* ===========================
   SECTION 4: DYNAMIC BOOK RENDERING
   =========================== */


document.addEventListener("DOMContentLoaded", () => {
  const featuredBooks = [
    { title: "Harry potter complete edition", price: "$12.99", img: "../Images/Book covers/Harry potter.png" },
    { title: "A silent voice", price: "$19.99", img: "../Images/Book covers/A silent voice.png" },
    { title: "To Kill a Mockingbird", price: "$29.99", img: "../Images/Book covers/To Kill a Mockingbird by Harper Lee.png" },
    { title: "Atomic Habits", price: "$29.99", img: "../Images/Book covers/Atomic Habits.png" },
    { title: "Ikigai", price: "$29.99", img: "../Images/Book covers/IKIGAI.png" }
  ];

  const featuredContainer = document.getElementById("featuredBooks");

  if (featuredContainer) {
    featuredBooks.forEach(book => {
      const bookCard = `
        <div class="book-card" style="cursor:pointer;" onclick="window.location.href='/client_side/landing.html'">
          <div class="image-container">
        <img src="${book.img}" alt="${book.title}">
          </div>
          <h3>${book.title}</h3>
          <p>${book.price}</p>
          <div class="book-actions">
        <button class="buy-btn">Buy now</button>
        <button class="add-btn">Add to cart</button>
          </div>
        </div>
      `;
      featuredContainer.innerHTML += bookCard;
    });
  }
});


/* ===========================
   SECTION 5: DYNAMIC TOP SELLING BOOKS RENDERING
   =========================== */


document.addEventListener("DOMContentLoaded", () => {
  const topSellingBooks = [
    { title: "Deep Work", price: "$21.99", img: "../Images/Book covers/Deep Work.png" },
    { title: "Do Epic Sh*t", price: "$18.99", img: "../Images/Book covers/Do epic Shit.png" },
    { title: "Gild", price: "$24.99", img: "../Images/Book covers/Gild.png" },
    { title: "The Starless Sea", price: "$27.99", img: "../Images/Book covers/The Starless Sea.png" },
    { title: "Six of Crows", price: "$22.99", img: "../Images/Book covers/Six of crows.png" },
  ];

  const TScontainer = document.getElementById("topSellingBooks");

  if (TScontainer) {
    topSellingBooks.forEach(book => {
      const bookCard = `
        <div class="book-card">
          <div class="image-container">
            <img src="${book.img}" alt="${book.title}">
          </div>
          <h3>${book.title}</h3>
          <p>${book.price}</p>
          <div class="book-actions">
            <button class="buy-btn">Buy now</button>
            <button class="add-btn">Add to cart</button>
          </div>
        </div>
      `;
      TScontainer.innerHTML += bookCard;
    });
  }
});



/* ===========================
   SECTION 6: BOOK SEARCH FUNCTIONALITY
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const books = [
    { title: "Harry potter complete edition", price: 1299, img: "../Images/Book covers/Harry potter.png" },
    { title: "A silent voice", price: 1999, img: "../Images/Book covers/A silent voice.png" },
    { title: "To Kill a Mockingbird", price: 2999, img: "../Images/Book covers/To Kill a Mockingbird by Harper Lee.png" },
    { title: "Atomic Habits", price: 1099, img: "../Images/Book covers/Atomic Habits.png" },
    { title: "Ikigai", price: 899, img: "../Images/Book covers/IKIGAI.png" },
    { title: "Deep Work", price: 1199, img: "../Images/Book covers/Deep Work.png" },
    { title: "Do Epic Sh*t", price: 799, img: "../Images/Book covers/Do epic Shit.png" },
    { title: "Gild", price: 1599, img: "../Images/Book covers/Gild.png" },
    { title: "The Starless Sea", price: 1799, img: "../Images/Book covers/The Starless Sea.png" },
    { title: "Six of Crows", price: 1499, img: "../Images/Book covers/Six of crows.png" },
    { title: "The Alchemist", price: 999, img: "../Images/Book covers/The Alchemist.png" }
  ];

  const container = document.getElementById("booksContainer");

  function renderBooks(bookList) {
    container.innerHTML = "";
    if (bookList.length === 0) {
      container.innerHTML = `<p>No books found 😢</p>`;
      return;
    }

    bookList.forEach((book, index) => {
      const bookCard = `
        <div class="book-card">
          <div class="image-container">
            <img src="${book.img}" alt="${book.title}">
          </div>
          <h3>${book.title}</h3>
          <p>₹${book.price}</p>
          <div class="book-actions">
            <button class="buy-btn">Buy now</button>
            <button class="add-btn" data-index="${index}">Add to cart</button>
          </div>
        </div>
      `;
      container.innerHTML += bookCard;
    });

    // attach add-to-cart listeners
    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        addToCart(books[idx]);
      });
    });
  }

  // --- CART LOGIC ---
  function addToCart(book) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.title === book.title);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...book, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} added to cart 🛒`);
  }

  // search logic
  window.searchBooks = function () {
    const query = document.getElementById("bookSearch").value.toLowerCase();
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks);
  };

  document.getElementById("bookSearch").addEventListener("input", searchBooks);

  renderBooks(books);
});





/* ===========================
   SECTION 7: CAROUSEL FUNCTIONALITY
   =========================== */

// ...existing code...

/* ===========================
   SECTION 7: CAROUSEL FUNCTIONALITY
   =========================== */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dotsNav = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  // Create dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (idx === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  });
  const dots = Array.from(dotsNav.children);

  function updateCarousel(index) {
    // Move track
    const slide = slides[index];
    const offset = slide.offsetLeft;
    track.style.transform = `translateX(-${offset}px)`;

    // Update active slide
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    // Update dots
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // Next button
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(currentIndex);
  });

  // Prev button
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(currentIndex);
  });

  // Dots navigation
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateCarousel(currentIndex);
    });
  });

  // Initial state
  updateCarousel(currentIndex);
});
// ...existing code...








// === CART PAGE SCRIPT ===
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".cart-table tbody");
  const totalEl = document.getElementById("cart-total");

  if (!tbody) return; // only run on cart page

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    tbody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">Your cart is empty 🛒</td></tr>`;
      totalEl.textContent = "₹0";
      return;
    }

    cart.forEach((item, i) => {
      const subtotal = item.price * item.qty;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${item.img}" class="cart-img" alt="${item.title}"></td>
        <td>${item.title}</td>
        <td data-price="${item.price}">₹${item.price}</td>
        <td><input type="number" value="${item.qty}" min="1" class="qty-input" data-index="${i}"></td>
        <td class="subtotal">₹${subtotal}</td>
        <td><button class="remove-btn" data-index="${i}">✖</button></td>
      `;
      tbody.appendChild(row);
    });

    totalEl.textContent = `₹${total}`;
  }

  // quantity change
  tbody.addEventListener("input", e => {
    if (e.target.classList.contains("qty-input")) {
      const idx = e.target.dataset.index;
      cart[idx].qty = parseInt(e.target.value);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // remove button
  tbody.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  // initial render
  renderCart();
});



















// ==== config ====
const DEBOUNCE_MS = 280;

// ==== helpers ====
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ==== debounce ====
let debounceTimer = null;
function scheduleSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => searchBooks(), DEBOUNCE_MS);
}

// wire input debounce
const input = $('#bookSearch');
if (input) input.addEventListener('input', scheduleSearch);

// category buttons behavior
$$('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // sync mobile select
    const cat = btn.dataset.cat || '';
    const mobile = $('#mobileCat');
    if (mobile) mobile.value = cat;
    scheduleSearch();
  });
});

// mobile select -> sync pills
const mobileSelect = $('#mobileCat');
if (mobileSelect) {
  mobileSelect.addEventListener('change', (e) => {
    const val = e.target.value || '';
    $$('.category-btn').forEach(b => {
      if ((b.dataset.cat || '') === val) b.classList.add('active');
      else b.classList.remove('active');
    });
    scheduleSearch();
  });
}

// clear button
function clearSearch() {
  const i = $('#bookSearch');
  if (i) { i.value = ''; i.focus(); }
  scheduleSearch();
}

// main search function
function searchBooks() {
  const query = ($('#bookSearch') && $('#bookSearch').value.trim()) || '';
  const catBtn = document.querySelector('.category-btn.active');
  const category = (catBtn && (catBtn.dataset.cat || '')) || (('#mobileCat' in window && $('#mobileCat').value) || '');
  const payload = { query, category, ts: Date.now() };

  // 1) If you already have a frontend list of books, filter locally (optional)
  //    window.__booksData can be an array of objects: { title, author, category, img, slug }
  if (window.__booksData && Array.isArray(window.__booksData)) {
    const q = query.toLowerCase();
    const results = window.__booksData.filter(b => {
      const matchesCategory = !category || (b.category && b.category.toLowerCase() === category.toLowerCase());
      const matchesQuery = !q || (b.title && b.title.toLowerCase().includes(q)) || (b.author && b.author.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
    // try to update a grid if present
    const grid = document.getElementById('booksGrid');
    if (grid) {
      grid.innerHTML = '';
      if (results.length === 0) grid.innerHTML = `<div class="no-results">No books found.</div>`;
      else results.forEach(b => {
        const item = document.createElement('div');
        item.className = 'book-card';
        item.innerHTML = `
          <a href="${b.href || '#'}" class="book-link">
            <img src="${b.img || ''}" alt="${b.title || 'book'}" loading="lazy"/>
            <div class="meta"><strong>${b.title || ''}</strong><span>${b.author || ''}</span></div>
          </a>`;
        grid.appendChild(item);
      });
    }
  }

  // 2) Dispatch an event so your backend/search layer can catch it
  window.dispatchEvent(new CustomEvent('wrddz:search', { detail: payload }));

  // 3) If you already have a global handler like `window.handleBookSearch`, call it:
  if (typeof window.handleBookSearch === 'function') {
    window.handleBookSearch(payload);
  }
}

// optional: let Enter do search (form prevents default already)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') clearSearch();
});
