// Estado global da aplicação
const state = {
    cart: [],
    products: [],
    currentCategory: 'all',
    searchQuery: '',
    user: null
};

// Produtos exemplo
const products = [
    {
        id: 1,
        name: "Oxford Clássico",
        price: 599.90,
        category: "masculino",
        subcategory: "oxford",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
        sizes: [38, 39, 40, 41, 42, 43],
        colors: ["Preto", "Marrom", "Café"],
        description: "Oxford clássico em couro legítimo com acabamento premium."
    },
    {
        id: 2,
        name: "Scarpin Elegance",
        price: 459.90,
        category: "feminino",
        subcategory: "scarpin",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
        sizes: [34, 35, 36, 37, 38, 39],
        colors: ["Preto", "Nude", "Vermelho"],
        description: "Scarpin elegante em couro com salto alto e acabamento sofisticado."
    }
    // Adicione mais produtos conforme necessário
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Função de inicialização
function initializeApp() {
    state.products = products;
    loadProducts();
    updateCartCount();
    setupSearch();
    setupCategories();
    setupNewsletter();
}

// Configuração de Event Listeners
function setupEventListeners() {
    // Menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Carrinho
    const cartButton = document.querySelector('.cart-icon');
    if (cartButton) {
        cartButton.addEventListener('click', toggleCart);
    }

    // Busca
    const searchButton = document.querySelector('[data-search-button]');
    if (searchButton) {
        searchButton.addEventListener('click', toggleSearch);
    }

    // Categorias
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            navigateToCategory(category);
        });
    });
}

// Funções do Carrinho
function addToCart(productId, size, color) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        size: size,
        color: color,
        quantity: 1
    };

    const existingItem = state.cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push(cartItem);
    }

    updateCartUI();
    showNotification('Produto adicionado ao carrinho');
    saveCartToLocalStorage();
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
    saveCartToLocalStorage();
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    const cartTotal = document.querySelector('.cart-total');
    if (cartTotal) {
        const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatCurrency(total);
    }
}

// Funções de Produto
function loadProducts(filters = {}) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    let filteredProducts = state.products;

    // Aplicar filtros
    if (filters.category && filters.category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    if (filters.search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            p.description.toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="group" data-product-id="${product.id}">
            <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white">
                <img src="${product.image}" alt="${product.name}" 
                    class="h-[300px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105">
            </div>
            <div class="mt-4 text-center">
                <h3 class="text-lg font-medium text-gray-900">${product.name}</h3>
                <p class="mt-1 text-lg font-medium text-purple-700">${formatCurrency(product.price)}</p>
                <button onclick="quickView(${product.id})" 
                    class="mt-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
                    Ver Detalhes
                </button>
            </div>
        </div>
    `;
}

// Modal de Produto
function quickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-serif">${product.name}</h2>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded">
                <div>
                    <p class="text-xl font-medium text-purple-700 mb-4">${formatCurrency(product.price)}</p>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Tamanho</label>
                        <select class="w-full border rounded p-2" id="size-select">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Cor</label>
                        <select class="w-full border rounded p-2" id="color-select">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
                    <button onclick="addToCartFromModal(${product.id})" 
                        class="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-600 transition-colors">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Funções de Busca
function setupSearch() {
    const searchInput = document.querySelector('[data-search-input]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            state.searchQuery = e.target.value;
            loadProducts({ search: state.searchQuery });
        }, 300));
    }
}

// Funções de Newsletter
function setupNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            subscribeToNewsletter(email);
        });
    }
}

function subscribeToNewsletter(email) {
    // Simulação de envio para API
    console.log(`Inscrito: ${email}`);
    showNotification('Obrigado por se inscrever à nossa newsletter!');
}

// Funções Utilitárias
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-purple-700 text-white px
