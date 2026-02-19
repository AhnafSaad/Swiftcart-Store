let cartCounting = 0;
const categoryContainer = document.getElementById("category-buttons");
const productsGrid = document.getElementById("products-grid");
const modal = document.getElementById("product-modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
const cartCountingElement = document.getElementById("cart-count");
const mobileBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.getElementById("nav-links");

mobileBtn.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
        if (navLinks.style.maxHeight && navLinks.style.maxHeight !== "0px") {
            navLinks.style.maxHeight = "0";
        } else {
            navLinks.style.maxHeight = navLinks.scrollHeight + "px";
        }
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
        navLinks.style.maxHeight = "none";  
    } else {
        navLinks.style.maxHeight = "0"; 
    }
});

let activeCategoryBtn = null;

//Reuse our cart Button 
function addToCart() {
  cartCounting += 1;
  cartCountingElement.textContent = cartCounting;
  cartCountingElement.classList.remove("hidden");
}

// Load Category   
async function loadCategories() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();
  categories.forEach((category) => {
    const btn = document.createElement("button");
    
    
    btn.className = "px-6 py-2 bg-white text-black rounded-full border border-gray-300 hover:bg-gray-100 transition-colors";
    
    btn.textContent = category.toUpperCase();
    btn.addEventListener("click", () => {
      if (activeCategoryBtn) {
        activeCategoryBtn.classList.remove("bg-blue-500", "text-white");
        activeCategoryBtn.classList.add("bg-white", "text-black");
      }
      btn.classList.remove("bg-white", "text-black");
      btn.classList.add("bg-blue-500", "text-white");
      activeCategoryBtn = btn;

      loadProducts(category);
    });

    categoryContainer.appendChild(btn);
  });
}

// Load products
async function loadProducts(category) {
  productsGrid.innerHTML =
    '<p class="col-span-full text-center"><span class="loading loading-spinner loading-lg text-violet-600"></span></p>';

  const res = await fetch(`https://fakestoreapi.com/products`);
  let products = await res.json();

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  productsGrid.innerHTML = "";
  products.forEach((product) => {
    const card = document.createElement("div");
    
    card.className = "bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md flex flex-col overflow-hidden";

    card.innerHTML = `
      <div class="bg-gray-100 h-48 w-full p-4 flex justify-center items-center">
        <img src="${product.image}" alt="${product.title}" class="h-full w-full object-contain mix-blend-multiply">
      </div>
      
      <div class="p-4 flex flex-col flex-grow bg-white">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] text-blue-600 font-semibold capitalize bg-blue-100 px-2 py-1 rounded-full">${product.category}</span>
          <div class="flex items-center text-xs text-gray-500">
            <span class="text-yellow-400 mr-1 text-sm">&#9733;</span> ${product.rating.rate} <span class="ml-1">(${product.rating.count})</span>
          </div>
        </div>
        <h2 class="text-sm font-semibold mb-1 text-gray-800 truncate">${product.title}</h2>
        <p class="font-bold text-gray-900 mb-3">$${product.price}</p>
        
        <div class="mt-auto flex gap-2">
          <button class="flex-1 py-1.5 bg-white border border-gray-200 text-gray-700 rounded hover:bg-gray-50 details-btn text-xs flex items-center justify-center gap-1 transition-colors" data-id="${product.id}">
            <i class="fa-regular fa-eye text-gray-500 text-[11px]"></i> Details
          </button>
          <button class="flex-1 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 add-cart-btn text-xs flex items-center justify-center gap-1 transition-colors">
            <i class="fa-solid fa-cart-shopping text-[11px]"></i> Add
          </button>
        </div>
      </div>
    `;

    // Details button
    card.querySelector(".details-btn").addEventListener("click", () => showProductDetails(product.id));

    // Add to Cart button
    card.querySelector(".add-cart-btn").addEventListener("click", addToCart);

    productsGrid.appendChild(card);
  });
}

// SHow Product Details  
async function showProductDetails(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  modalContent.innerHTML = `
    <div class="flex flex-col justify-center items-center md:flex-row gap-4">
      <img src="${product.image}" alt="${product.title}" class="w-full md:w-1/2 object-contain h-64 mix-blend-multiply">
      <div class="flex-1 flex flex-col">
        <h2 class="text-lg font-semibold mb-2">${product.title}</h2>
        <p class="text-gray-600 mb-2">${product.description}</p>
        <p class="font-semibold text-xl mb-2">$${product.price}</p>
        <div class="flex items-center mb-2">
          <span class="text-yellow-500 mr-2">&#9733; ${product.rating.rate}</span>
          <span class="text-gray-400">(${product.rating.count} reviews)</span>
        </div>
        <button class="mt-auto py-2 bg-blue-600 text-white rounded hover:bg-blue-700 add-cart-btn">Buy Now</button>
      </div>
    </div>
  `;

  modalContent.querySelector(".add-cart-btn").addEventListener("click", addToCart);

  modal.classList.remove("hidden");
}

// Close Modals 
modalClose.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// Trending products List 
async function loadTrendingProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();
  
  const trending = products.slice(0, 3);
  const trendingContainer = document.getElementById("trending-products");

  trending.forEach((product) => {
    const card = document.createElement("div");
  
    card.className = "bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md flex flex-col overflow-hidden";

    card.innerHTML = `
      <div class="bg-gray-100 h-48 w-full p-4 flex justify-center items-center">
        <img src="${product.image}" class="h-full w-full object-contain mix-blend-multiply">
      </div>
      
      <div class="p-4 flex flex-col flex-grow bg-white">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] text-blue-600 font-semibold capitalize bg-blue-100 px-2 py-1 rounded-full">${product.category}</span>
          <div class="flex items-center text-xs text-gray-500">
            <span class="text-yellow-400 mr-1 text-sm">&#9733;</span> ${product.rating.rate} <span class="ml-1">(${product.rating.count})</span>
          </div>
        </div>
        <h2 class="text-sm font-semibold mb-1 text-gray-800 truncate">${product.title}</h2>
        <p class="font-bold text-gray-900 mb-3">$${product.price}</p>
        
        <div class="mt-auto flex gap-2">
          <button class="flex-1 py-1.5 bg-white border border-gray-200 text-gray-700 rounded hover:bg-gray-50 details-btn text-xs flex items-center justify-center gap-1 transition-colors" data-id="${product.id}">
            <i class="fa-regular fa-eye text-gray-500 text-[11px]"></i> Details
          </button>
          <button class="flex-1 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 add-cart-btn text-xs flex items-center justify-center gap-1 transition-colors">
            <i class="fa-solid fa-cart-shopping text-[11px]"></i> Add
          </button>
        </div>
      </div>
    `;

    // Attach events
    card.querySelector(".details-btn").addEventListener("click", () => showProductDetails(product.id));
    card.querySelector(".add-cart-btn").addEventListener("click", addToCart);

    trendingContainer.appendChild(card);
  });
}

if (categoryContainer && productsGrid) {
  loadCategories();
  loadProducts();
}

if (document.getElementById("trending-products")) {
  loadTrendingProducts();
}