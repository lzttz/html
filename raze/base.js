const products = [
    {
        id: 1,
        name: "Oxford Clássico Masculino",
        price: "R$ 399,90",
        image: "oxford.jpg",
        category: "masculino"
    },
    {
        id: 2,
        name: "Scarpin Elegante",
        price: "R$ 299,90",
        image: "scarpin.jpg",
        category: "feminino"
    },
    {
        id: 3,
        name: "Derby Premium",
        price: "R$ 459,90",
        image: "derby.jpg",
        category: "masculino"
    },
    {
        id: 4,
        name: "Sandália Festa",
        price: "R$ 329,90",
        image: "sandalia.jpg",
        category: "feminino"
    }
];

// Function to create product cards
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Adicionar ao Carrinho</button>
            </div>
        </div>
    `;
}

// Load products
function loadProducts() {
    const newArrivalsGrid = document.querySelector('.new-arrivals .products-grid');
    const featuredGrid = document.querySelector('.featured-products .products-grid');

    // Load new arrivals (first 4 products)
    const newArrivals = products.slice(0, 4);
    newArrivalsGrid.innerHTML = newArrivals.map(createProductCard).join('');

    // Load featured products (random selection)
    const featured = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
    featuredGrid.innerHTML = featured.map(createProductCard).join('');
}

// Shopping cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartUI();
        showNotification('Produto adicionado ao carrinho!');
    }
}

function updateCartUI() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Newsletter subscription
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Obrigado por se inscrever!');
        this.reset();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});