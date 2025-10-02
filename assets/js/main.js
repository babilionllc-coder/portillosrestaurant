/* ===== PORTILLOS RESTAURANT - JAVASCRIPT ===== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initWhatsAppButtons();
    initImageLoading();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.dish-card, .testimonial-card, .category-link');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// WhatsApp Button Functionality
function initWhatsAppButtons() {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: 'Order Button',
                    value: 1
                });
            }
        });
    });
}

// Image Loading with Lazy Loading
function initImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility Functions
function formatPrice(price) {
    return `$${price}`;
}

function createWhatsAppMessage(itemName, price, quantity = 1) {
    const message = `Hola Portillos, quiero ordenar: ${quantity} x ${itemName} - ${formatPrice(price)}. Mi nombre: [NOMBRE]. Dirección: [DIRECCIÓN].`;
    return encodeURIComponent(message);
}

function openWhatsAppOrder(itemName, price, quantity = 1) {
    const phoneNumber = '529981668821'; // Primary WhatsApp number
    const message = createWhatsAppMessage(itemName, price, quantity);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// Order Form Functionality (for future implementation)
function initOrderForm() {
    const orderForms = document.querySelectorAll('.order-form');
    
    orderForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const orderData = Object.fromEntries(formData);
            
            // Create WhatsApp message
            let message = 'Hola Portillos, quiero hacer el siguiente pedido:\n\n';
            
            Object.keys(orderData).forEach(key => {
                if (orderData[key] && orderData[key] !== '0') {
                    message += `• ${key}: ${orderData[key]}\n`;
                }
            });
            
            message += '\nMi nombre: [NOMBRE]\nDirección: [DIRECCIÓN]';
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/529981668821?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Search Functionality (for menu page)
function initMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (searchInput && menuItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            menuItems.forEach(item => {
                const itemText = item.textContent.toLowerCase();
                const itemContainer = item.closest('.menu-category');
                
                if (itemText.includes(searchTerm)) {
                    item.style.display = 'block';
                    if (itemContainer) {
                        itemContainer.style.display = 'block';
                    }
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Hide empty categories
            const categories = document.querySelectorAll('.menu-category');
            categories.forEach(category => {
                const visibleItems = category.querySelectorAll('.menu-item[style*="block"], .menu-item:not([style*="none"])');
                if (visibleItems.length === 0) {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                }
            });
        });
    }
}

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('fade-in-up');
                    }, 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in-up');
                }
            });
        });
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Por favor completa todos los campos obligatorios.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor ingresa un email válido.');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `Hola Portillos,\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/529981668821?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            alert('¡Gracias! Se abrirá WhatsApp para enviar tu mensaje.');
        });
    }
}

// Scroll to Top Functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Cookie Consent (for future implementation)
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (cookieConsent && acceptCookies) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieConsent.style.display = 'block';
        }
        
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }
}

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Handle image errors
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder.jpg';
            this.alt = 'Imagen no disponible';
        });
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initWhatsAppButtons();
    initImageLoading();
    initOrderForm();
    initMenuSearch();
    initGalleryFilter();
    initContactForm();
    initScrollToTop();
    initCookieConsent();
    optimizeImages();
});

// Export functions for use in other scripts
window.PortillosRestaurant = {
    formatPrice,
    createWhatsAppMessage,
    openWhatsAppOrder,
    initMobileMenu,
    initSmoothScrolling,
    initAnimations,
    initWhatsAppButtons
};
