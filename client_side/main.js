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
    { title: "Harry potter complete edition", price: "$12.99", img: "../Images/Book covers/Harry potter.png" },
    { title: "A silent voice", price: "$19.99", img: "../Images/Book covers/A silent voice.png" },
    { title: "To Kill a Mockingbird", price: "$29.99", img: "../Images/Book covers/To Kill a Mockingbird by Harper Lee.png" },
    { title: "Atomic Habits", price: "$29.99", img: "../Images/Book covers/Atomic Habits.png" },
    { title: "Ikigai", price: "$29.99", img: "../Images/Book covers/IKIGAI.png" },
    { title: "Deep Work", price: "$21.99", img: "../Images/Book covers/Deep Work.png" },
    { title: "Do Epic Sh*t", price: "$18.99", img: "../Images/Book covers/Do epic Shit.png" },
    { title: "Gild", price: "$24.99", img: "../Images/Book covers/Gild.png" },
    { title: "The Starless Sea", price: "$27.99", img: "../Images/Book covers/The Starless Sea.png" },
    { title: "Six of Crows", price: "$22.99", img: "../Images/Book covers/Six of crows.png" },
    { title: "The Alchemist", price: "$19.99", img: "../Images/Book covers/The Alchemist.png" }
  ];

  const container = document.getElementById("booksContainer");

  // Reusable function to render books
  function renderBooks(bookList) {
    container.innerHTML = "";
    if (bookList.length === 0) {
      container.innerHTML = `<p>No books found 😢</p>`;
      return;
    }

    bookList.forEach(book => {
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
      container.innerHTML += bookCard;
    });
  }

  // Show all books on page load
  renderBooks(books);

  // Search function
  window.searchBooks = function () {
    const query = document.getElementById("bookSearch").value.toLowerCase();
    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks);
  };

  // Enable instant search while typing
  document.getElementById("bookSearch").addEventListener("input", searchBooks);
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