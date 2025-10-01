// Coffee Recommender System - Versión Limpia
class CoffeeRecommender {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 4;
        this.answers = {};
        this.coffeeDatabase = {
            suave_frutal_v60_mañana: {
                name: "Café Tarrazú Honey",
                description: "Un café suave y equilibrado con notas frutales brillantes, perfecto para métodos de filtrado.",
                intensity: "Suave",
                notes: "Frutal y dulce",
                brewing: "V60 o filtrado",
                whatsappText: "Hola, me interesa el Café Tarrazú Honey que me recomendó el sistema"
            },
            suave_chocolate_espresso_mañana: {
                name: "Café Caturra Lavado",
                description: "Un café de cuerpo medio con notas a chocolate y caramelo. Ideal para espresso con cremosidad natural.",
                intensity: "Suave-Medio",
                notes: "Chocolate y caramelo",
                brewing: "Espresso o moka",
                whatsappText: "Hola, me interesa el Café Caturra Lavado que me recomendó el sistema"
            },
            medio_nueces_prensa_tarde: {
                name: "Café Villa Sarchí",
                description: "Un café de intensidad media con notas tostadas y a nueces. Perfecto para prensa francesa.",
                intensity: "Medio",
                notes: "Nueces y tostado",
                brewing: "Prensa francesa",
                whatsappText: "Hola, me interesa el Café Villa Sarchí que me recomendó el sistema"
            },
            fuerte_chocolate_espresso_todo: {
                name: "Café Geisha Premium",
                description: "Nuestro café más exclusivo, de tueste medio-oscuro con notas intensas a chocolate negro.",
                intensity: "Fuerte",
                notes: "Chocolate negro y especias",
                brewing: "Espresso o moka",
                whatsappText: "Hola, me interesa el Café Geisha Premium que me recomendó el sistema"
            },
            default: {
                name: "Café Grano Dorado Clásico",
                description: "Nuestra mezcla signature que combina lo mejor de nuestros granos. Un café versátil y balanceado.",
                intensity: "Medio",
                notes: "Equilibrado y versátil",
                brewing: "Cualquier método",
                whatsappText: "Hola, me interesa el Café Grano Dorado Clásico que me recomendó el sistema"
            }
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        const floatBtn = document.getElementById('coffeeRecommenderFloat');
        const mainBtn = document.getElementById('coffeeRecommenderBtn');
        const modal = document.getElementById('coffeeRecommenderModal');
        const closeBtn = document.getElementById('closeRecommenderModal');
        
        if (floatBtn) {
            floatBtn.addEventListener('click', () => this.openModal());
        }
        
        if (mainBtn) {
            mainBtn.addEventListener('click', () => this.openModal());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        }
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('.option-btn')) {
                this.selectOption(e.target.closest('.option-btn'));
            }
        });
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const retakeBtn = document.getElementById('retakeQuizBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousStep());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
        if (retakeBtn) retakeBtn.addEventListener('click', () => this.resetQuiz());
    }

    openModal() {
        const modal = document.getElementById('coffeeRecommenderModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('coffeeRecommenderModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    selectOption(optionBtn) {
        const step = optionBtn.closest('.quiz-step');
        const stepNumber = parseInt(step.dataset.step);
        const value = optionBtn.dataset.value;
        
        step.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        optionBtn.classList.add('selected');
        
        this.answers[`step${stepNumber}`] = value;
        
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    nextStep() {
        if (this.currentStep < this.maxSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
        } else {
            this.showResults();
        }
        this.updateNavigation();
        this.updateProgress();
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
        this.updateNavigation();
        this.updateProgress();
    }

    showStep(stepNumber) {
        document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
        const currentStepEl = document.querySelector(`[data-step="${stepNumber}"]`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentStep > 1 ? 'flex' : 'none';
        }
        
        if (nextBtn) {
            // El botón siguiente siempre es visible
            nextBtn.style.display = 'flex';
            
            if (this.currentStep === this.maxSteps) {
                nextBtn.innerHTML = 'Ver Recomendación <i class="fas fa-star"></i>';
            } else {
                nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
            }
            
            const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
            const hasSelection = currentStepEl && currentStepEl.querySelector('.option-btn.selected');
            nextBtn.disabled = !hasSelection;
            
            // Agregar clase para hacer el botón más visible cuando está deshabilitado
            if (!hasSelection) {
                nextBtn.classList.add('waiting-selection');
            } else {
                nextBtn.classList.remove('waiting-selection');
            }
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            const percentage = (this.currentStep / this.maxSteps) * 100;
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${this.currentStep} de ${this.maxSteps}`;
        }
    }

    showResults() {
        document.querySelectorAll('.quiz-step').forEach(step => step.classList.remove('active'));
        const resultsStep = document.querySelector('[data-step="results"]');
        if (resultsStep) {
            resultsStep.classList.add('active');
        }
        
        const navigation = document.querySelector('.quiz-navigation');
        if (navigation) {
            navigation.style.display = 'none';
        }
        
        this.generateRecommendation();
    }

    generateRecommendation() {
        const { step1, step2, step3, step4 } = this.answers;
        const key = `${step1}_${step2}_${step3}_${step4}`;
        
        let coffee = this.coffeeDatabase[key] || this.findBestMatch();
        this.displayRecommendation(coffee);
    }

    findBestMatch() {
        const { step1, step2, step3 } = this.answers;
        
        if (step1 === 'suave' && step2 === 'frutal') {
            return this.coffeeDatabase.suave_frutal_v60_mañana;
        } else if (step1 === 'medio' && step2 === 'chocolate') {
            return this.coffeeDatabase.suave_chocolate_espresso_mañana;
        } else if (step1 === 'fuerte') {
            return this.coffeeDatabase.fuerte_chocolate_espresso_todo;
        } else if (step3 === 'prensa') {
            return this.coffeeDatabase.medio_nueces_prensa_tarde;
        }
        
        return this.coffeeDatabase.default;
    }

    displayRecommendation(coffee) {
        const nameEl = document.getElementById('recommendedName');
        const descEl = document.getElementById('recommendedDescription');
        const intensityEl = document.getElementById('intensityLevel');
        const notesEl = document.getElementById('flavorNotes');
        const brewingEl = document.getElementById('brewingTip');
        const orderBtn = document.getElementById('orderCoffeeBtn');
        
        if (nameEl) nameEl.textContent = coffee.name;
        if (descEl) descEl.textContent = coffee.description;
        if (intensityEl) intensityEl.textContent = `Intensidad: ${coffee.intensity}`;
        if (notesEl) notesEl.textContent = `Notas: ${coffee.notes}`;
        if (brewingEl) brewingEl.textContent = `Ideal para: ${coffee.brewing}`;
        
        if (orderBtn) {
            const whatsappUrl = `https://wa.me/50687104694?text=${encodeURIComponent(coffee.whatsappText)}`;
            orderBtn.href = whatsappUrl;
            orderBtn.target = '_blank';
        }
    }

    resetQuiz() {
        this.currentStep = 1;
        this.answers = {};
        
        document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
        this.showStep(1);
        
        const navigation = document.querySelector('.quiz-navigation');
        if (navigation) {
            navigation.style.display = 'flex';
        }
        
        this.updateNavigation();
        this.updateProgress();
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new CoffeeRecommender();
});