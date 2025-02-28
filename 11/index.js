// Produtos da loja
const produtos = [
    {
        id: 1,
        nome: 'Mountain Bike Pro',
        categoria: 'bicicletas',
        preco: 999.90,
        descricao: 'Bicicleta mountain bike com 21 marchas',
        imagem: 'https://images.tcdn.com.br/img/img_prod/789576/bicicleta_mountain_bike_aluminio_aro_29_caloiflex_preto_dm9t140915n_1507362_1_15ced13475f5ee59692d1590b23fba6b.png'
    },
    {
        id: 2,
        nome: 'Capacete Profissional',
        categoria: 'acessorios',
        preco: 999.90,
        descricao: 'Capacete com regulagem e ventilação',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_748988-MLA81614177690_012025-O.webp'
    },
    {
        id: 3,
        nome: 'Kit Manutenção',
        categoria: 'pecas',
        preco: 999.90,
        descricao: 'Kit com ferramentas essenciais',
        imagem: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-ls9c9vwe25h76b'
    },
    {
        id: 4,
        nome: 'Baterias',
        categoria: 'baterias',
        preco: 999.90,
        descricao: 'Bateria moura',
        imagem: 'https://cdn.awsli.com.br/2500x2500/1249/1249655/produto/62307670/439e2e583d.jpg'
    },
    {
        id: 5,
        nome: 'bicicleta',
        categoria: 'bicicletas',
        preco: 999.90,
        descricao: 'Bicicleta Mtb Aro 29 Oggi Big Wheel 7.2 2024 Grafit Vermelho',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_644544-MLB73657523853_122023-O.webp'
    }

];

document.addEventListener('DOMContentLoaded', function() {
    // Função para renderizar produtos
    function renderizarProdutos(produtosParaMostrar) {
        const productList = document.getElementById('productList');
        if (!productList) return;

        productList.innerHTML = '';

        if (produtosParaMostrar.length === 0) {
            productList.innerHTML = '<div class="col-12 text-center"><p>Nenhum produto encontrado</p></div>';
            return;
        }

        produtosParaMostrar.forEach(produto => {
            const produtoHTML = `
                <div class="col-md-4 mb-4 product-card" data-category="${produto.categoria}" data-aos="fade-up">
                    <div class="card h-100">
                        <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${produto.nome}</h5>
                            <p class="card-text">${produto.descricao}</p>
                            <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                            <button class="btn btn-primary w-100" onclick="abrirWhatsApp('${produto.nome}')">
                                <i class="fab fa-whatsapp me-2"></i>Comprar
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += produtoHTML;
        });
    }

    // Inicializar produtos
    renderizarProdutos(produtos);

    // Filtro de categorias
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.getAttribute('data-category');
                const filteredProducts = category === 'todos' 
                    ? produtos 
                    : produtos.filter(produto => produto.categoria === category);
                
                renderizarProdutos(filteredProducts);
            });
        });
    }

    // Pesquisa de produtos
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        function pesquisarProdutos() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (searchTerm === '') {
                renderizarProdutos(produtos);
                return;
            }

            const filteredProducts = produtos.filter(produto => 
                produto.nome.toLowerCase().includes(searchTerm) || 
                produto.descricao.toLowerCase().includes(searchTerm)
            );
            renderizarProdutos(filteredProducts);
        }

        searchButton.addEventListener('click', pesquisarProdutos);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                pesquisarProdutos();
            }
        });
    }

    // Formulário de Agendamento
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = this.querySelectorAll('input, select, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Se tudo estiver válido
            alert('Agendamento recebido! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }

                // Validação específica para email
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                }
            });

            if (!isValid) {
                alert('Por favor, preencha todos os campos corretamente.');
                return;
            }

            // Se tudo estiver válido
            alert('Mensagem enviada! Responderemos em breve.');
            this.reset();
        });
    }

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ativa ao menu quando scrollar
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.navbar-nav a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar-nav a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    });
});

// Função para abrir WhatsApp
function abrirWhatsApp(produto) {
    const telefone = '553298178420';
    const mensagem = `Olá! Gostaria de mais informações sobre o produto: ${produto}`;
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
