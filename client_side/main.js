window.addEventListener("load", () => {
    setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    }, 1950); 
});


//nav bar scroll effect
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



// dynamically Featured books

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
      featuredContainer.innerHTML += bookCard;
    });
  }
});


// dynamically Top selling books

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



// dynamically load books
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
  window.searchBooks = function() {
	const query = document.getElementById("bookSearch").value.toLowerCase();
	const filteredBooks = books.filter(book =>
      	book.title.toLowerCase().includes(query)
    );
    renderBooks(filteredBooks);
  };

  // Enable instant search while typing
  document.getElementById("bookSearch").addEventListener("input", searchBooks);
});
