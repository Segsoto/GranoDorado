// Coffee Menu System
class CoffeeMenu {
    constructor() {
        this.coffeeDatabase = {
            "cafe-tarrazu-honey": {
                name: "Café Tarrazú Honey",
                description: "Un café suave y equilibrado con notas frutales brillantes, perfecto para métodos de filtrado. Cultivado en las montañas de Tarrazú, este café presenta un proceso honey que resalta su dulzura natural.",
                intensity: "Suave",
                category: "suave",
                notes: "Frutal, dulce, cítrico",
                brewing: "V60, Chemex, filtrado",
                price: "₡8,500",
                whatsappText: "Hola! Me interesa el Café Tarrazú Honey de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-caturra-lavado": {
                name: "Café Caturra Lavado",
                description: "Un café de cuerpo medio con notas a chocolate y caramelo. Ideal para espresso con cremosidad natural. Su proceso lavado resalta la claridad y limpieza en taza.",
                intensity: "Medio",
                category: "medio",
                notes: "Chocolate, caramelo, nueces",
                brewing: "Espresso, moka, aeropress",
                price: "₡7,800",
                whatsappText: "Hola! Me interesa el Café Caturra Lavado de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-villa-sarchi": {
                name: "Café Villa Sarchí",
                description: "Un café de intensidad media con notas tostadas y a nueces. Perfecto para prensa francesa. Variedad autóctona de Costa Rica con un carácter único y distintivo.",
                intensity: "Medio",
                category: "medio",
                notes: "Nueces, tostado, panela",
                brewing: "Prensa francesa, cold brew",
                price: "₡9,200",
                whatsappText: "Hola! Me interesa el Café Villa Sarchí de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-geisha-premium": {
                name: "Café Geisha Premium",
                description: "Nuestro café más exclusivo, de tueste medio-oscuro con notas intensas a chocolate negro. Una variedad excepcional que ofrece una experiencia sensorial única.",
                intensity: "Fuerte",
                category: "fuerte",
                notes: "Chocolate negro, especias, vainilla",
                brewing: "Espresso, moka",
                price: "₡15,000",
                whatsappText: "Hola! Me interesa el Café Geisha Premium de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-bourbon-natural": {
                name: "Café Bourbon Natural",
                description: "Proceso natural que resalta la dulzura y cuerpo del café. Notas frutales intensas con un final prolongado y satisfactorio.",
                intensity: "Medio",
                category: "medio",
                notes: "Frutas tropicales, miel, chocolate",
                brewing: "V60, Chemex, prensa francesa",
                price: "₡8,900",
                whatsappText: "Hola! Me interesa el Café Bourbon Natural de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-clasico-blend": {
                name: "Grano Dorado Clásico",
                description: "Nuestra mezcla signature que combina lo mejor de nuestros granos. Un café versátil y balanceado, perfecto para cualquier momento del día.",
                intensity: "Medio",
                category: "medio",
                notes: "Equilibrado, chocolate, caramelo",
                brewing: "Cualquier método",
                price: "₡6,500",
                whatsappText: "Hola! Me interesa el Grano Dorado Clásico de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-oscuro-intenso": {
                name: "Café Oscuro Intenso",
                description: "Para los amantes del café fuerte. Tueste oscuro que desarrolla notas ahumadas y amargas balanceadas. Ideal para despertar con energía.",
                intensity: "Fuerte",
                category: "fuerte",
                notes: "Ahumado, chocolate amargo, especias",
                brewing: "Espresso, moka, prensa francesa",
                price: "₡7,200",
                whatsappText: "Hola! Me interesa el Café Oscuro Intenso de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            },
            "cafe-suave-floral": {
                name: "Café Suave Floral",
                description: "Un café delicado con notas florales y cítricas. Perfecto para paladares que buscan sutileza y elegancia en cada sorbo.",
                intensity: "Suave",
                category: "suave",
                notes: "Floral, cítrico, te verde",
                brewing: "V60, Chemex, cold brew",
                price: "₡8,200",
                whatsappText: "Hola! Me interesa el Café Suave Floral de su carta. ¿Podrían darme más información sobre disponibilidad y precios?"
            }
        };

        this.currentFilter = 'all';
        this.modal = null;
        this.currentCoffee = null;
        
        this.init();
    }

    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.renderCoffeeCards();
        this.setupRecommenderButton();
        this.handleDirectLinks();
    }

    setupDOM() {
        this.coffeeGrid = document.getElementById('coffeeGrid');
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.modal = document.getElementById('coffeeModal');
        this.modalClose = document.getElementById('modalClose');
        this.whatsappBtn = document.getElementById('whatsappBtn');
    }

    setupEventListeners() {
        // Category filter buttons
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.filterCoffees(e.target.dataset.category);
                this.updateActiveCategory(e.target);
            });
        });

        // Modal close events
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // WhatsApp button
        if (this.whatsappBtn) {
            this.whatsappBtn.addEventListener('click', () => this.sendWhatsAppMessage());
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }

    renderCoffeeCards() {
        if (!this.coffeeGrid) return;

        this.coffeeGrid.innerHTML = '';

        Object.entries(this.coffeeDatabase).forEach(([key, coffee]) => {
            if (this.currentFilter === 'all' || coffee.category === this.currentFilter) {
                const card = this.createCoffeeCard(key, coffee);
                this.coffeeGrid.appendChild(card);
            }
        });

        // Trigger reveal animation
        setTimeout(() => {
            const cards = this.coffeeGrid.querySelectorAll('.coffee-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('revealed');
                }, index * 100);
            });
        }, 100);
    }

    createCoffeeCard(key, coffee) {
        const card = document.createElement('div');
        card.className = 'coffee-card reveal';
        card.dataset.coffeeKey = key;

        card.innerHTML = `
            <div class="coffee-card-image">
                <i class="fas fa-coffee"></i>
                <div class="intensity-badge intensity-${coffee.category}">${coffee.intensity}</div>
            </div>
            <div class="coffee-card-content">
                <h3 class="coffee-name">${coffee.name}</h3>
                <p class="coffee-short-description">${this.truncateText(coffee.description, 80)}</p>
                <div class="coffee-notes">
                    <span class="notes-label">Notas:</span>
                    <span class="notes-text">${coffee.notes}</span>
                </div>
                <div class="coffee-card-footer">
                    <span class="coffee-price">${coffee.price}</span>
                    <button class="view-details-btn" onclick="coffeeMenu.openModal('${key}')">
                        Ver detalles
                    </button>
                </div>
            </div>
        `;

        return card;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    filterCoffees(category) {
        this.currentFilter = category;
        this.renderCoffeeCards();
    }

    updateActiveCategory(activeButton) {
        this.categoryButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    openModal(coffeeKey) {
        const coffee = this.coffeeDatabase[coffeeKey];
        if (!coffee || !this.modal) return;

        this.currentCoffee = { key: coffeeKey, ...coffee };

        // Update modal content
        document.querySelector('.modal-coffee-name').textContent = coffee.name;
        document.querySelector('.modal-coffee-description').textContent = coffee.description;
        document.querySelector('.coffee-intensity').textContent = coffee.intensity;
        document.querySelector('.coffee-notes').textContent = coffee.notes;
        document.querySelector('.coffee-brewing').textContent = coffee.brewing;

        // Show modal
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Animation
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 10);
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
        }, 300);
    }

    sendWhatsAppMessage() {
        if (!this.currentCoffee) return;

        const phoneNumber = '50612345678'; // TODO: Cambiar por tu número real de WhatsApp (ej: 50687654321)
        const message = encodeURIComponent(this.currentCoffee.whatsappText);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        
        window.open(whatsappURL, '_blank');
    }

    setupRecommenderButton() {
        const recommenderBtn = document.getElementById('startRecommender');
        if (recommenderBtn) {
            recommenderBtn.addEventListener('click', () => {
                // Check if we're on carta.html, if so redirect to index.html with anchor
                if (window.location.pathname.includes('carta.html')) {
                    window.location.href = 'index.html#coffee-recommender';
                } else {
                    // If we're on index.html, scroll to recommender
                    document.getElementById('coffee-recommender')?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Handle direct links to specific coffees
    handleDirectLinks() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            // Check if it's a coffee category or specific coffee
            const categories = ['premium', 'classic', 'smooth', 'suave', 'medio', 'fuerte'];
            if (categories.includes(hash)) {
                if (hash === 'premium' || hash === 'fuerte') {
                    this.filterCoffees('fuerte');
                    this.updateActiveCategory(document.querySelector('[data-category="fuerte"]'));
                } else if (hash === 'classic' || hash === 'medio') {
                    this.filterCoffees('medio');
                    this.updateActiveCategory(document.querySelector('[data-category="medio"]'));
                } else if (hash === 'smooth' || hash === 'suave') {
                    this.filterCoffees('suave');
                    this.updateActiveCategory(document.querySelector('[data-category="suave"]'));
                }
                
                // Scroll to coffee grid
                setTimeout(() => {
                    document.getElementById('coffee-menu')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }
}

// Initialize Coffee Menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.coffeeMenu = new CoffeeMenu();
});