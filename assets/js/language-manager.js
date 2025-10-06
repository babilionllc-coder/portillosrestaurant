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
                
                // About Us Page
                'about.title': 'Nosotros',
                'about.subtitle': 'Nuestra historia y pasión por la comida mexicana',
                'about.history_title': 'La Historia de Portillos',
                'about.history_text': 'Portillos Restaurante nació el 19 de julio de 2019 con la visión de llevar los sabores auténticos de México al corazón de Cancún. Fundado con pasión y dedicación, nuestro restaurante combina tradiciones culinarias centenarias con ingredientes frescos del mar Caribe.',
                'about.founded_title': 'Nuestra Historia',
                'about.founded_date': 'Fundado el 19 de julio de 2019',
                'about.mission_text': 'Nacimos con la idea de llevar hasta tu mesa auténtica comida mexicana con mucho sabor. Desde el primer día hemos trabajado para ofrecerte los mejores sabores tradicionales de México.',
                
                // Contact Page
                'contact.title': 'Contacto',
                'contact.subtitle': 'Estamos aquí para servirte',
                'contact.address_title': 'Dirección',
                'contact.phone_title': 'Teléfono',
                'contact.hours_title': 'Horarios',
                'contact.form_title': 'Envíanos un mensaje',
                'contact.form_name': 'Nombre',
                'contact.form_email': 'Email',
                'contact.form_message': 'Mensaje',
                'contact.form_send': 'Enviar mensaje',
                
                // Order Page
                'order.title': 'Ordenar',
                'order.subtitle': 'Ordena tu comida favorita',
                'order.whatsapp_title': 'Ordena por WhatsApp',
                'order.whatsapp_description': 'Haz tu pedido directamente por WhatsApp',
                'order.whatsapp_button': 'Ordenar por WhatsApp',
                
                // Catering Page
                'catering.title': 'Catering',
                'catering.subtitle': 'Servicios de catering para eventos',
                'catering.services_title': 'Nuestros Servicios',
                'catering.contact_title': 'Contáctanos para tu evento',
                
                // Reservations Page
                'reservations.title': 'Reservas',
                'reservations.subtitle': 'Reserva tu mesa',
                'reservations.form_title': 'Hacer una reserva',
                'reservations.form_date': 'Fecha',
                'reservations.form_time': 'Hora',
                'reservations.form_guests': 'Número de personas',
                'reservations.form_name': 'Nombre',
                'reservations.form_phone': 'Teléfono',
                'reservations.form_reserve': 'Reservar mesa',
                
                // Legal Page
                'legal.title': 'Términos y Condiciones',
                'legal.subtitle': 'Información legal',
                'legal.privacy_title': 'Política de Privacidad',
                'legal.terms_title': 'Términos de Uso',
                
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
                
                // About Us Page
                'about.title': 'About Us',
                'about.subtitle': 'Our history and passion for Mexican food',
                'about.history_title': 'The History of Portillos',
                'about.history_text': 'Portillos Restaurant was born on July 19, 2019, with the vision of bringing authentic Mexican flavors to the heart of Cancún. Founded with passion and dedication, our restaurant combines centuries-old culinary traditions with fresh ingredients from the Caribbean Sea.',
                'about.founded_title': 'Our History',
                'about.founded_date': 'Founded on July 19, 2019',
                'about.mission_text': 'We were born with the idea of bringing authentic Mexican food with great flavor to your table. From day one we have worked to offer you the best traditional flavors of Mexico.',
                
                // Contact Page
                'contact.title': 'Contact',
                'contact.subtitle': 'We are here to serve you',
                'contact.address_title': 'Address',
                'contact.phone_title': 'Phone',
                'contact.hours_title': 'Hours',
                'contact.form_title': 'Send us a message',
                'contact.form_name': 'Name',
                'contact.form_email': 'Email',
                'contact.form_message': 'Message',
                'contact.form_send': 'Send message',
                
                // Order Page
                'order.title': 'Order',
                'order.subtitle': 'Order your favorite food',
                'order.whatsapp_title': 'Order via WhatsApp',
                'order.whatsapp_description': 'Place your order directly via WhatsApp',
                'order.whatsapp_button': 'Order via WhatsApp',
                
                // Catering Page
                'catering.title': 'Catering',
                'catering.subtitle': 'Catering services for events',
                'catering.services_title': 'Our Services',
                'catering.contact_title': 'Contact us for your event',
                
                // Reservations Page
                'reservations.title': 'Reservations',
                'reservations.subtitle': 'Reserve your table',
                'reservations.form_title': 'Make a reservation',
                'reservations.form_date': 'Date',
                'reservations.form_time': 'Time',
                'reservations.form_guests': 'Number of people',
                'reservations.form_name': 'Name',
                'reservations.form_phone': 'Phone',
                'reservations.form_reserve': 'Reserve table',
                
                // Legal Page
                'legal.title': 'Terms and Conditions',
                'legal.subtitle': 'Legal information',
                'legal.privacy_title': 'Privacy Policy',
                'legal.terms_title': 'Terms of Use',
                
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
        console.log('Initializing LanguageManager...');
        this.createLanguageSwitcher();
        this.applyLanguage(this.currentLanguage);
        this.bindEvents();
        console.log('LanguageManager initialized with language:', this.currentLanguage);
    }
    
    getStoredLanguage() {
        return localStorage.getItem('portillos-language') || 'es';
    }
    
    setStoredLanguage(lang) {
        localStorage.setItem('portillos-language', lang);
    }
    
    createLanguageSwitcher() {
        console.log('Creating language switcher...');
        
        // Check if switcher already exists
        const existingSwitcher = document.querySelector('.language-switcher');
        if (existingSwitcher) {
            console.log('Language switcher already exists, removing old one');
            existingSwitcher.remove();
        }
        
        // Create language switcher HTML with active state
        const activeClass = this.currentLanguage === 'es' ? 'active' : '';
        const activeClassEn = this.currentLanguage === 'en' ? 'active' : '';
        
        const switcherHTML = `
            <div class="language-switcher">
                <button class="lang-btn ${activeClass}" data-lang="es">
                    <span class="flag-icon">🇪🇸</span>
                    <span>ES</span>
                </button>
                <button class="lang-btn ${activeClassEn}" data-lang="en">
                    <span class="flag-icon">🇺🇸</span>
                    <span>EN</span>
                </button>
            </div>
        `;
        
        console.log('Language switcher HTML:', switcherHTML);
        
        // Add to header - try multiple selectors
        let header = document.querySelector('.header .navbar .container');
        if (!header) {
            header = document.querySelector('.navbar .container');
        }
        if (!header) {
            header = document.querySelector('.header .container');
        }
        if (!header) {
            header = document.querySelector('.container');
        }
        
        console.log('Found header:', header);
        
        if (header) {
            header.insertAdjacentHTML('beforeend', switcherHTML);
            console.log('Language switcher added successfully to header');
            
            // Verify it was added
            const addedSwitcher = document.querySelector('.language-switcher');
            console.log('Verification - switcher exists:', !!addedSwitcher);
            console.log('Verification - buttons count:', document.querySelectorAll('.lang-btn').length);
            
            // Update active state
            this.updateActiveLanguageButton();
        } else {
            console.error('Could not find header container for language switcher');
        }
    }
    
    bindEvents() {
        console.log('Binding language switcher events...');
        
        // Language switcher events
        document.addEventListener('click', (e) => {
            if (e.target.closest('.lang-btn')) {
                const btn = e.target.closest('.lang-btn');
                const lang = btn.dataset.lang;
                console.log('Language button clicked:', lang);
                this.switchLanguage(lang);
            }
        });
        
        // Verify buttons are clickable
        setTimeout(() => {
            const buttons = document.querySelectorAll('.lang-btn');
            console.log('Language buttons found:', buttons.length);
            buttons.forEach((btn, index) => {
                console.log(`Button ${index}:`, btn.dataset.lang, btn.textContent);
            });
        }, 1000);
    }
    
    updateActiveLanguageButton() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });
        console.log('Updated active language button for:', this.currentLanguage);
    }
    
    switchLanguage(lang) {
        console.log('Switching language from', this.currentLanguage, 'to', lang);
        
        if (lang === this.currentLanguage) {
            console.log('Language already active, skipping');
            return;
        }
        
        this.currentLanguage = lang;
        this.setStoredLanguage(lang);
        this.applyLanguage(lang);
        
        // Update page title and meta tags
        this.updatePageMeta(lang);
        
        // Update active button
        this.updateActiveLanguageButton();
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        console.log('Language switched successfully to:', lang);
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
    console.log('DOM ready, initializing LanguageManager...');
    window.languageManager = new LanguageManager();
});

// Fallback initialization
window.addEventListener('load', () => {
    if (!window.languageManager) {
        console.log('Window loaded, fallback LanguageManager initialization...');
        window.languageManager = new LanguageManager();
    }
});

// Export for use in other scripts
window.LanguageManager = LanguageManager;
