document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSliders();
    initPortfolio();
    initFAQ();
    initForms();
    initMap();
    initScrollEffects();
});

// Navigation
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });

    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Sliders
function initSliders() {
    // Equipment Slider
    const equipmentSlider = {
        container: document.querySelector('.equipment-slider'),
        wrapper: document.querySelector('.slider-wrapper'),
        slides: document.querySelectorAll('.slide'),
        prevBtn: document.querySelector('.slider-prev'),
        nextBtn: document.querySelector('.slider-next'),
        dotsContainer: document.querySelector('.slider-dots'),
        currentIndex: 0,
        slideWidth: 0,
        
        init: function() {
            if (!this.container) return;
            
            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });
            
            // Set initial slide width
            this.updateSlideWidth();
            
            // Add event listeners
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            window.addEventListener('resize', () => this.updateSlideWidth());
            
            // Auto slide
            this.autoSlide();
        },
        
        updateSlideWidth: function() {
            this.slideWidth = this.container.offsetWidth;
            this.wrapper.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
        },
        
        goToSlide: function(index) {
            this.currentIndex = index;
            this.wrapper.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
            
            // Update active dot
            const dots = this.dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        },
        
        prevSlide: function() {
            this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
            this.goToSlide(this.currentIndex);
        },
        
        nextSlide: function() {
            this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
            this.goToSlide(this.currentIndex);
        },
        
        autoSlide: function() {
            setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    };
    
    // Testimonial Slider
    const testimonialSlider = {
        container: document.querySelector('.testimonials-slider'),
        wrapper: document.querySelector('.testimonial-wrapper'),
        items: document.querySelectorAll('.testimonial-item'),
        prevBtn: document.querySelector('.testimonial-prev'),
        nextBtn: document.querySelector('.testimonial-next'),
        dotsContainer: document.querySelector('.testimonial-dots'),
        currentIndex: 0,
        itemWidth: 0,
        
        init: function() {
            if (!this.container) return;
            
            // Create dots
            this.items.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToItem(index));
                this.dotsContainer.appendChild(dot);
            });
            
            // Set initial item width
            this.updateItemWidth();
            
            // Add event listeners
            this.prevBtn.addEventListener('click', () => this.prevItem());
            this.nextBtn.addEventListener('click', () => this.nextItem());
            window.addEventListener('resize', () => this.updateItemWidth());
            
            // Auto slide
            this.autoSlide();
        },
        
        updateItemWidth: function() {
            this.itemWidth = this.container.offsetWidth;
            this.wrapper.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
        },
        
        goToItem: function(index) {
            this.currentIndex = index;
            this.wrapper.style.transform = `translateX(-${this.currentIndex * this.itemWidth}px)`;
            
            // Update active dot
            const dots = this.dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        },
        
        prevItem: function() {
            this.currentIndex = (this.currentIndex === 0) ? this.items.length - 1 : this.currentIndex - 1;
            this.goToItem(this.currentIndex);
        },
        
        nextItem: function() {
            this.currentIndex = (this.currentIndex === this.items.length - 1) ? 0 : this.currentIndex + 1;
            this.goToItem(this.currentIndex);
        },
        
        autoSlide: function() {
            setInterval(() => {
                this.nextItem();
            }, 6000);
        }
    };
    
    // Initialize sliders
    equipmentSlider.init();
    testimonialSlider.init();
}

// Portfolio
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalClose = document.querySelector('.modal-close');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Portfolio filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Portfolio modal
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project ID
            const projectId = this.getAttribute('data-id');
            
            // Get project data (in a real project, this would come from an API or database)
            const projectData = getProjectData(projectId);
            
            // Populate modal with project data
            document.getElementById('modal-title').textContent = projectData.title;
            document.getElementById('modal-main-image').src = projectData.mainImage;
            document.getElementById('modal-main-image').alt = projectData.title;
            document.getElementById('modal-client').textContent = projectData.client;
            document.getElementById('modal-category').textContent = projectData.category;
            document.getElementById('modal-date').textContent = projectData.date;
            document.getElementById('modal-description').innerHTML = projectData.description;
            
            // Create thumbnails
            const thumbsContainer = document.getElementById('modal-thumbs');
            thumbsContainer.innerHTML = '';
            
            projectData.gallery.forEach((image, index) => {
                const thumb = document.createElement('div');
                thumb.classList.add('gallery-thumb');
                if (index === 0) thumb.classList.add('active');
                
                const img = document.createElement('img');
                img.src = image;
                img.alt = `${projectData.title} - Image ${index + 1}`;
                
                thumb.appendChild(img);
                thumbsContainer.appendChild(thumb);
                
                // Thumbnail click event
                thumb.addEventListener('click', function() {
                    document.getElementById('modal-main-image').src = image;
                    
                    // Update active thumbnail
                    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Show modal
            portfolioModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === portfolioModal) {
            closeModal();
        }
    });
    
    function closeModal() {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Mock project data (in a real project, this would come from an API or database)
    function getProjectData(id) {
        const projects = {
            '1': {
                title: 'Terraplanagem Residencial',
                mainImage: 'images/portfolio-1.jpg',
                gallery: ['images/portfolio-1.jpg', 'images/portfolio-1-2.jpg', 'images/portfolio-1-3.jpg'],
                client: 'Construtora Horizonte',
                category: 'Terraplanagem',
                date: 'Janeiro 2023',
                description: '<p>Projeto de terraplanagem para preparação de terreno em condomínio residencial de alto padrão. O trabalho incluiu nivelamento preciso, drenagem adequada e compactação do solo para garantir a estabilidade das futuras construções.</p><p>Utilizamos equipamentos com GPS de alta precisão para garantir o nivelamento perfeito conforme o projeto arquitetônico, resultando em uma economia significativa de tempo e recursos para o cliente.</p>'
            },
            '2': {
                title: 'Demolição Controlada',
                mainImage: 'images/portfolio-2.jpg',
                gallery: ['images/portfolio-2.jpg', 'images/portfolio-2-2.jpg', 'images/portfolio-2-3.jpg'],
                client: 'Incorporadora Nova Era',
                category: 'Demolição',
                date: 'Março 2023',
                description: '<p>Demolição controlada de estrutura antiga para dar lugar a um novo empreendimento comercial. O projeto exigiu planejamento meticuloso para garantir a segurança das edificações vizinhas e minimizar o impacto ambiental.</p><p>Utilizamos técnicas avançadas de demolição seletiva, permitindo a separação e reciclagem de mais de 80% dos materiais, reduzindo significativamente o volume enviado para aterros.</p>'
            },
            '3': {
                title: 'Compactação Industrial',
                mainImage: 'images/portfolio-3.jpg',
                gallery: ['images/portfolio-3.jpg', 'images/portfolio-3-2.jpg', 'images/portfolio-3-3.jpg'],
                client: 'Grupo Industrial Aço Forte',
                category: 'Compactação',
                date: 'Maio 2023',
                description: '<p>Serviço de compactação de solo para fundação de galpão industrial de grande porte. O projeto exigiu compactação de alta densidade para suportar maquinário pesado e garantir a estabilidade da estrutura.</p><p>Realizamos testes de compactação em cada etapa do processo, garantindo que o solo atingisse os índices de compactação especificados no projeto estrutural, resultando em uma base sólida e durável para a construção.</p>'
            },
            '4': {
                title: 'Terraplanagem Comercial',
                mainImage: 'images/portfolio-4.jpg',
                gallery: ['images/portfolio-4.jpg', 'images/portfolio-4-2.jpg', 'images/portfolio-4-3.jpg'],
                client: 'Shopping Center Metrópole',
                category: 'Terraplanagem',
                date: 'Julho 2023',
                description: '<p>Preparação de terreno para construção de shopping center com área de 50.000m². O projeto incluiu movimentação de grande volume de terra, criação de platôs em diferentes níveis e sistema completo de drenagem.</p><p>Concluímos o projeto 15 dias antes do prazo previsto, permitindo que as etapas seguintes da construção iniciassem antecipadamente, gerando economia significativa para o cliente.</p>'
            },
            '5': {
                title: 'Demolição Residencial',
                mainImage: 'images/portfolio-5.jpg',
                gallery: ['images/portfolio-5.jpg', 'images/portfolio-5-2.jpg', 'images/portfolio-5-3.jpg'],
                client: 'Família Rodrigues',
                category: 'Demolição',
                date: 'Agosto 2023',
                description: '<p>Demolição de residência antiga para construção de nova casa. O projeto exigiu cuidado especial para preservar árvores centenárias no terreno e minimizar o impacto na vizinhança.</p><p>Utilizamos equipamentos compactos e técnicas de demolição silenciosa, reduzindo significativamente o ruído e a poeira durante o processo, o que foi muito apreciado pelos vizinhos e pelo cliente.</p>'
            },
            '6': {
                title: 'Compactação para Estrada',
                mainImage: 'images/portfolio-6.jpg',
                gallery: ['images/portfolio-6.jpg', 'images/portfolio-6-2.jpg', 'images/portfolio-6-3.jpg'],
                client: 'Prefeitura Municipal',
                category: 'Compactação',
                date: 'Setembro 2023',
                description: '<p>Preparação e compactação de base para pavimentação de estrada municipal com extensão de 5km. O projeto incluiu correção do subleito, aplicação de material granular e compactação em camadas.</p><p>Utilizamos controle tecnológico rigoroso em cada trecho da obra, garantindo uniformidade na compactação e atendendo a todos os parâmetros técnicos exigidos, o que resultará em maior durabilidade do pavimento.</p>'
            }
        };
        
        return projects[id] || projects['1'];
    }
}

// FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
}

// Forms
function initForms() {
    const quoteForm = document.getElementById('quote-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.success-modal .modal-close');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    
    // Quote form validation and submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(this)) {
                // In a real project, you would send the form data to a server here
                // For this demo, we'll just show the success modal
                successModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real project, you would send the form data to a server here
            // For this demo, we'll just show an alert
            alert('Obrigado por se inscrever em nossa newsletter!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Close success modal
    if (modalClose) {
        modalClose.addEventListener('click', closeSuccessModal);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    function closeSuccessModal() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Form validation
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            
            // Check if input is required and empty
            if (input.hasAttribute('required') && !input.value.trim()) {
                formGroup.classList.add('error');
                errorMessage.textContent = 'Este campo é obrigatório.';
                isValid = false;
            } else {
                // Validate email format
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        formGroup.classList.add('error');
                        errorMessage.textContent = 'Por favor, insira um e-mail válido.';
                        isValid = false;
                    } else {
                        formGroup.classList.remove('error');
                    }
                } else {
                    formGroup.classList.remove('error');
                }
            }
        });
        
        return isValid;
    }
}

// Google Maps
function initMap() {
    // This function will be called by the Google Maps API
    window.initMap = function() {
        const mapElement = document.getElementById('map');
        
        if (!mapElement) return;
        
        // Company location
        const companyLocation = { lat: -23.550520, lng: -46.633308 }; // São Paulo coordinates
        
        // Create map
        const map = new google.maps.Map(mapElement, {
            center: companyLocation,
            zoom: 15,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "weight": "2.00"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#9c9c9c"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7b7b7b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#c8d7d4"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#070707"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                }
            ]
        });
        
        // Add marker
        const marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: 'TerraMaster',
            icon: {
                url: 'images/map-marker.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
        
        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="map-info-window">
                    <h3>TerraMaster</h3>
                    <p>Av. Industrial, 1500 - Centro Empresarial<br>São Paulo - SP, 04547-005</p>
                    <p><strong>Tel:</strong> (11) 3456-7890</p>
                </div>
            `
        });
        
        // Open info window when marker is clicked
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
        
        // Add service areas (in a real project, these would come from a database)
        const serviceAreas = [
            { lat: -23.540520, lng: -46.623308 },
            { lat: -23.560520, lng: -46.643308 },
            { lat: -23.550520, lng: -46.653308 },
            { lat: -23.530520, lng: -46.633308 }
        ];
        
        // Add service area markers
        serviceAreas.forEach(location => {
            new google.maps.Marker({
                position: location,
                map: map,
                icon: {
                    url: 'images/service-marker.png',
                    scaledSize: new google.maps.Size(30, 30)
                }
            });
        });
    };
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('[data-aos]');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const windowTop = window.pageYOffset;
        const windowBottom = windowTop + windowHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementVisible = 150;
            
            if (elementTop < windowBottom - elementVisible) {
                element.classList.add('aos-animate');
            } else {
                element.classList.remove('aos-animate');
            }
        });
    }
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}