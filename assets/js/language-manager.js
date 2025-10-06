// Language Management System for Portillos Restaurant
// Bilingual support: Spanish (default) and English

class LanguageManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'es';
        this.translations = {
            es: {
                // Navigation
                'nav.inicio': 'Inicio',
                'nav.menu': 'Menú',
                'nav.ordenar': 'Ordenar',
                'nav.nosotros': 'Nosotros',
                'nav.catering': 'Catering',
                'nav.reservas': 'Reservas',
                'nav.contacto': 'Contacto',
                
                // Hero Section
                'hero.title': 'Portillos Restaurante',
                'hero.subtitle': 'Mejor Comida Mexicana Tradicional en Cancún',
                'hero.description': 'Descubre los sabores auténticos de México con deliciosos desayunos, tacos tradicionales, pollo con mole poblano y frescos mariscos. ¡Ordena por WhatsApp!',
                'hero.view_menu': 'Ver Menú',
                'hero.order_whatsapp': 'Ordenar por WhatsApp',
                'hero.follow_facebook': 'Síguenos en Facebook',
                'hero.follow_instagram': 'Síguenos en Instagram',
                
                // Menu Categories
                'menu.all': 'Todos',
                'menu.view_complete': 'VER MENÚ COMPLETO',
                'menu.desayunos': 'Desayunos',
                'menu.antojitos': 'Antojitos',
                'menu.comida': 'Comida',
                'menu.mariscos': 'Mariscos',
                'menu.sopas': 'Sopas',
                'menu.pastas': 'Pastas',
                'menu.search_placeholder': 'Buscar platillo...',
                'menu.title': 'Menú Completo - Comida Mexicana Tradicional',
                'menu.subtitle': 'Descubre los sabores auténticos de México en Cancún con más de 25 platillos tradicionales mexicanos',
                
                // Menu Items
                'menu.huevos_ejotes': 'Huevos con ejotes',
                'menu.huevos_mexicana': 'Huevos a la mexicana',
                'menu.hotcakes_chocolate': 'Hotcakes de chocolate',
                'menu.omelette_jamon': 'Omelette de jamón con queso',
                'menu.chilaquiles_rojos': 'Chilaquiles rojos con pollo y huevo',
                'menu.salbutes_pollo': 'Salbutes de pollo',
                'menu.huarache_carne': 'Huarache de carne asada',
                'menu.tacos_guisado': 'Bufet de tacos de guisado',
                'menu.filete_pescado': 'Filete de pescado empanizado',
                'menu.sopa_mariscos': 'Sopa de mariscos',
                'menu.pollo_mole': 'Pollo con mole poblano',
                'menu.costillas_cerdo': 'Costillas de cerdo con calabacitas',
                'menu.fajitas_pollo': 'Fajitas de pechuga de pollo',
                'menu.fajitas_res': 'Fajitas de res',
                'menu.enchiladas_mole': 'Enchiladas de mole poblano',
                'menu.sopa_tortillas': 'Sopa de tortillas',
                'menu.espagueti_bolonesa': 'Espagueti a la boloñesa',
                'menu.fetuchini_camarones': 'Fetuchini con camarones',
                
                // Contact
                'contact.title': 'Contacto',
                'contact.address': 'Dirección',
                'contact.phone': 'Teléfono',
                'contact.email': 'Email',
                'contact.hours': 'Horarios',
                'contact.form.name': 'Nombre',
                'contact.form.email': 'Email',
                'contact.form.message': 'Mensaje',
                'contact.form.send': 'Enviar Mensaje',
                
                // Footer
                'footer.follow_us': 'Síguenos',
                'footer.quick_links': 'Enlaces Rápidos',
                'footer.contact': 'Contacto',
                'footer.order_now': 'Ordena Ahora',
                'footer.rights': 'Todos los derechos reservados',
                
                // Reviews
                'reviews.title': 'Reseñas de Google Maps - El Mejor Restaurante Mexicano de Cancún',
                'reviews.based_on': 'Basado en',
                'reviews.reviews': 'reseñas',
                'reviews.google_maps': 'de Google Maps',
                'reviews.satisfied_customers': 'clientes satisfechos',
                'reviews.view_maps': 'Ver en Google Maps',
                'reviews.write_review': 'Escribir Reseña en Google Maps',
                'reviews.want_to_review': '¿Quieres dejar tu reseña?',
                
                // Language Switcher
                'lang.spanish': 'Español',
                'lang.english': 'English',
                'lang.switch_to': 'Cambiar a',
                
                // Common
                'common.order': 'Ordenar',
                'common.view': 'Ver',
                'common.more': 'Más',
                'common.close': 'Cerrar',
                'common.loading': 'Cargando...',
                'common.error': 'Error',
                'common.success': 'Éxito'
            },
            en: {
                // Navigation
                'nav.inicio': 'Home',
                'nav.menu': 'Menu',
                'nav.ordenar': 'Order',
                'nav.nosotros': 'About Us',
                'nav.catering': 'Catering',
                'nav.reservas': 'Reservations',
                'nav.contacto': 'Contact',
                
                // Hero Section
                'hero.title': 'Portillos Restaurant',
                'hero.subtitle': 'Best Traditional Mexican Food in Cancún',
                'hero.description': 'Discover authentic Mexican flavors with delicious breakfasts, traditional tacos, chicken with mole poblano, and fresh seafood. Order via WhatsApp!',
                'hero.view_menu': 'View Menu',
                'hero.order_whatsapp': 'Order via WhatsApp',
                'hero.follow_facebook': 'Follow us on Facebook',
                'hero.follow_instagram': 'Follow us on Instagram',
                
                // Menu Categories
                'menu.all': 'All',
                'menu.view_complete': 'VIEW COMPLETE MENU',
                'menu.desayunos': 'Breakfast',
                'menu.antojitos': 'Snacks',
                'menu.comida': 'Main Dishes',
                'menu.mariscos': 'Seafood',
                'menu.sopas': 'Soups',
                'menu.pastas': 'Pasta',
                'menu.search_placeholder': 'Search dish...',
                'menu.title': 'Complete Menu - Traditional Mexican Food',
                'menu.subtitle': 'Discover authentic Mexican flavors in Cancún with over 25 traditional Mexican dishes',
                
                // Menu Items
                'menu.huevos_ejotes': 'Eggs with green beans',
                'menu.huevos_mexicana': 'Mexican-style eggs',
                'menu.hotcakes_chocolate': 'Chocolate pancakes',
                'menu.omelette_jamon': 'Ham and cheese omelette',
                'menu.chilaquiles_rojos': 'Red chilaquiles with chicken and egg',
                'menu.salbutes_pollo': 'Chicken salbutes',
                'menu.huarache_carne': 'Grilled beef huarache',
                'menu.tacos_guisado': 'Stewed tacos buffet',
                'menu.filete_pescado': 'Breaded fish fillet',
                'menu.sopa_mariscos': 'Seafood soup',
                'menu.pollo_mole': 'Chicken with mole poblano',
                'menu.costillas_cerdo': 'Pork ribs with zucchini',
                'menu.fajitas_pollo': 'Chicken breast fajitas',
                'menu.fajitas_res': 'Beef fajitas',
                'menu.enchiladas_mole': 'Mole poblano enchiladas',
                'menu.sopa_tortillas': 'Tortilla soup',
                'menu.espagueti_bolonesa': 'Spaghetti bolognese',
                'menu.fetuchini_camarones': 'Fettuccine with shrimp',
                
                // Contact
                'contact.title': 'Contact',
                'contact.address': 'Address',
                'contact.phone': 'Phone',
                'contact.email': 'Email',
                'contact.hours': 'Hours',
                'contact.form.name': 'Name',
                'contact.form.email': 'Email',
                'contact.form.message': 'Message',
                'contact.form.send': 'Send Message',
                
                // Footer
                'footer.follow_us': 'Follow Us',
                'footer.quick_links': 'Quick Links',
                'footer.contact': 'Contact',
                'footer.order_now': 'Order Now',
                'footer.rights': 'All rights reserved',
                
                // Reviews
                'reviews.title': 'Google Maps Reviews - Best Mexican Restaurant in Cancún',
                'reviews.based_on': 'Based on',
                'reviews.reviews': 'reviews',
                'reviews.google_maps': 'from Google Maps',
                'reviews.satisfied_customers': 'satisfied customers',
                'reviews.view_maps': 'View on Google Maps',
                'reviews.write_review': 'Write Review on Google Maps',
                'reviews.want_to_review': 'Want to leave a review?',
                
                // Language Switcher
                'lang.spanish': 'Español',
                'lang.english': 'English',
                'lang.switch_to': 'Switch to',
                
                // Common
                'common.order': 'Order',
                'common.view': 'View',
                'common.more': 'More',
                'common.close': 'Close',
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.success': 'Success'
            }
        };
        
        this.init();
    }
    
    init() {
        this.createLanguageSwitcher();
        this.applyLanguage(this.currentLanguage);
        this.bindEvents();
    }
    
    getStoredLanguage() {
        return localStorage.getItem('portillos-language') || 'es';
    }
    
    setStoredLanguage(lang) {
        localStorage.setItem('portillos-language', lang);
    }
    
    createLanguageSwitcher() {
        // Create language switcher HTML
        const switcherHTML = `
            <div class="language-switcher">
                <button class="lang-btn" data-lang="es">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSI1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHk9IjEwIiB3aWR0aD0iMjAiIGhlaWdodD0iNSIgZmlsbD0iI0ZGMDAwMCIvPgo8L3N2Zz4K" alt="ES">
                    <span>ES</span>
                </button>
                <button class="lang-btn" data-lang="en">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAyNzY2Ii8+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjEuMTUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjMuNDUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjUuNzUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjguMDUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjEwLjM1IiB3aWR0aD0iMjAiIGhlaWdodD0iMS4xNSIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB5PSIxMi42NSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEuMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeT0iMTQuOTUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxLjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI4LjMzIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIxLjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjEuMTUiIHdpZHRoPSIxLjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjIuMyIgd2lkdGg9IjEuMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMy40NSIgd2lkdGg9IjEuMTUiIGhlaWdodD0iMTUiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNC42IiB3aWR0aD0iMS4xNSIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI1Ljc1IiB3aWR0aD0iMS4xNSIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSI2LjkiIHdpZHRoPSIxLjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjguMDUiIHdpZHRoPSIxLjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=" alt="EN">
                    <span>EN</span>
                </button>
            </div>
        `;
        
        // Add to header
        const header = document.querySelector('.header .navbar .container');
        if (header) {
            header.insertAdjacentHTML('beforeend', switcherHTML);
        }
    }
    
    bindEvents() {
        // Language switcher events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-btn')) {
                const lang = e.target.closest('.lang-btn').dataset.lang;
                this.switchLanguage(lang);
            }
        });
    }
    
    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        this.applyLanguage(lang);
        
        // Update page title and meta tags
        this.updatePageMeta(lang);
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }
    
    applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translations[lang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
    }
    
    updatePageMeta(lang) {
        const titles = {
            es: {
                'index': 'Portillos Restaurante - El Mejor Restaurante Mexicano de Cancún',
                'menu': 'Menú Completo - Comida Mexicana Tradicional',
                'contacto': 'Contacto - Portillos Restaurante Cancún',
                'ordenar': 'Ordenar - Portillos Restaurante Cancún',
                'nosotros': 'Nosotros - Portillos Restaurante Cancún',
                'catering': 'Catering - Portillos Restaurante Cancún',
                'reservas': 'Reservas - Portillos Restaurante Cancún',
                'legal': 'Legal - Portillos Restaurante Cancún'
            },
            en: {
                'index': 'Portillos Restaurant - Best Mexican Restaurant in Cancún',
                'menu': 'Complete Menu - Traditional Mexican Food',
                'contacto': 'Contact - Portillos Restaurant Cancún',
                'ordenar': 'Order - Portillos Restaurant Cancún',
                'nosotros': 'About Us - Portillos Restaurant Cancún',
                'catering': 'Catering - Portillos Restaurant Cancún',
                'reservas': 'Reservations - Portillos Restaurant Cancún',
                'legal': 'Legal - Portillos Restaurant Cancún'
            }
        };
        
        const descriptions = {
            es: {
                'index': 'Descubre los sabores auténticos de México en Cancún con deliciosos desayunos, tacos tradicionales, pollo con mole poblano y frescos mariscos.',
                'menu': 'Menú completo de comida mexicana tradicional en Cancún. Desayunos, antojitos, comida, mariscos, sopas y pastas.',
                'contacto': 'Contacta con Portillos Restaurante en Cancún. Dirección, teléfono, email y horarios de atención.',
                'ordenar': 'Ordena tu comida mexicana favorita por WhatsApp. Servicio rápido y eficiente en Cancún.',
                'nosotros': 'Conoce la historia de Portillos Restaurante, el mejor restaurante mexicano de Cancún con más de 20 años de tradición.',
                'catering': 'Servicios de catering para eventos especiales y celebraciones familiares en Cancún.',
                'reservas': 'Reserva tu mesa en Portillos Restaurante, el mejor restaurante mexicano de Cancún.',
                'legal': 'Política de privacidad, términos y condiciones de Portillos Restaurante.'
            },
            en: {
                'index': 'Discover authentic Mexican flavors in Cancún with delicious breakfasts, traditional tacos, chicken with mole poblano, and fresh seafood.',
                'menu': 'Complete menu of traditional Mexican food in Cancún. Breakfast, snacks, main dishes, seafood, soups, and pasta.',
                'contacto': 'Contact Portillos Restaurant in Cancún. Address, phone, email, and business hours.',
                'ordenar': 'Order your favorite Mexican food via WhatsApp. Fast and efficient service in Cancún.',
                'nosotros': 'Learn about the history of Portillos Restaurant, the best Mexican restaurant in Cancún with over 20 years of tradition.',
                'catering': 'Catering services for special events and family celebrations in Cancún.',
                'reservas': 'Reserve your table at Portillos Restaurant, the best Mexican restaurant in Cancún.',
                'legal': 'Privacy policy, terms and conditions of Portillos Restaurant.'
            }
        };
        
        // Get current page
        const currentPage = this.getCurrentPage();
        
        if (titles[lang] && titles[lang][currentPage]) {
            document.title = titles[lang][currentPage];
        }
        
        if (descriptions[lang] && descriptions[lang][currentPage]) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', descriptions[lang][currentPage]);
            }
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('menu')) return 'menu';
        if (path.includes('contacto')) return 'contacto';
        if (path.includes('ordenar')) return 'ordenar';
        if (path.includes('nosotros')) return 'nosotros';
        if (path.includes('catering')) return 'catering';
        if (path.includes('reservas')) return 'reservas';
        if (path.includes('legal')) return 'legal';
        return 'index';
    }
    
    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;
