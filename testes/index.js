// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Oxford Clássico",
        price: 999.99,
        image: "https://media.istockphoto.com/id/1382165903/pt/foto/white-sport-sneaker-on-a-red-gradient-background-woman-and-mens-fashion-sport-shoe-sneakers.jpg?s=612x612&w=0&k=20&c=g2keU4OmWhPvOYmv8irFukrwzXPzZxE3PhppCJpD_BY="
    },
    {
        id: 2,
        name: "Derby Premium",
        price: 999.99,
        image: "https://media.istockphoto.com/id/1382165903/pt/foto/white-sport-sneaker-on-a-red-gradient-background-woman-and-mens-fashion-sport-shoe-sneakers.jpg?s=612x612&w=0&k=20&c=g2keU4OmWhPvOYmv8irFukrwzXPzZxE3PhppCJpD_BY="
    },
    {
        id: 3,
        name: "Monk Strap Elite",
        price: 999.99,
        image: "https://media.istockphoto.com/id/1382165903/pt/foto/white-sport-sneaker-on-a-red-gradient-background-woman-and-mens-fashion-sport-shoe-sneakers.jpg?s=612x612&w=0&k=20&c=g2keU4OmWhPvOYmv8irFukrwzXPzZxE3PhppCJpD_BY="
    }
];

// Carrinho de compras
let cart = [];

// Renderizar produtos
function renderProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showCartModal();
}

// Atualizar carrinho
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

// Mostrar/esconder carrinho
function showCartModal() {
    document.querySelector('.cart-modal').classList.add('active');
}

function hideCartModal() {
    document.querySelector('.cart-modal').classList.remove('active');
}

// Event Listeners
document.querySelector('.cart-icon').addEventListener('click', showCartModal);
document.querySelector('.close-cart').addEventListener('click', hideCartModal);

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Inicializar
renderProducts();