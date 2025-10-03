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

// Enhanced Mobile Menu Toggle with iOS Support
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) return;

    let isMenuOpen = false;
    let touchStartY = 0;
    let touchEndY = 0;

    // Detect iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Enhanced toggle function with ARIA management
    function toggleMenu(force = null) {
        const shouldOpen = force !== null ? force : !isMenuOpen;
        
        if (shouldOpen) {
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            isMenuOpen = true;
            
            // Focus management for accessibility
            setTimeout(() => {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) firstLink.focus();
            }, 100);
        } else {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Restore background scroll
            isMenuOpen = false;
        }
    }

    // Click event (desktop and touch devices)
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Touch events for iOS devices
    if (isIOS) {
        navToggle.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        navToggle.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].clientY;
            const touchDiff = Math.abs(touchStartY - touchEndY);
            
            // Only trigger if it's a tap (small movement)
            if (touchDiff < 10) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
            }
        }, { passive: false });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu(false);
        });

        // Add touch support for links on iOS
        if (isIOS) {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            link.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        }
    });

    // Close menu when clicking outside (improved for touch)
    function handleOutsideClick(event) {
        if (isMenuOpen && !navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            toggleMenu(false);
        }
    }

    document.addEventListener('click', handleOutsideClick);
    
    // Touch outside detection for iOS
    if (isIOS) {
        document.addEventListener('touchstart', function(e) {
            if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMenu(false);
            }
        }, { passive: true });
    }

    // Handle escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
            navToggle.focus();
        }
    });

    // Handle iOS viewport changes (address bar show/hide)
    if (isIOS) {
        let lastHeight = window.innerHeight;
        
        function handleViewportChange() {
            const currentHeight = window.innerHeight;
            
            // If height decreased significantly, likely address bar appeared
            if (currentHeight < lastHeight - 100) {
                // Adjust menu positioning if needed
                if (isMenuOpen) {
                    navMenu.style.maxHeight = `${currentHeight - 70}px`;
                }
            }
            
            lastHeight = currentHeight;
        }

        window.addEventListener('resize', handleViewportChange);
        window.addEventListener('orientationchange', function() {
            setTimeout(handleViewportChange, 500); // iOS needs delay after orientation change
        });
    }

    // Prevent menu from opening on scroll (iOS Safari)
    if (isIOS) {
        let isScrolling = false;
        
        window.addEventListener('scroll', function() {
            isScrolling = true;
            setTimeout(() => { isScrolling = false; }, 150);
        }, { passive: true });

        navToggle.addEventListener('touchstart', function(e) {
            if (isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });
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

// Scroll Animations - Enhanced
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                // Stagger animation for multiple elements
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with staggered delays
    const animatedElements = document.querySelectorAll('.dish-card, .testimonial-card, .category-link, .section-title');
    animatedElements.forEach((el, index) => {
        el.dataset.delay = index * 100; // Stagger by 100ms
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

// Enhanced Menu Search and Filter Functionality
function initMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (!searchInput || !menuItems.length) return;
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase().trim();
        filterMenuItems();
    });
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            filterMenuItems();
        });
    });
    
    function filterMenuItems() {
        menuItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            const itemCategory = item.closest('.menu-section').getAttribute('data-category');
            
            // Check if item matches search term
            const matchesSearch = currentSearch === '' || itemText.includes(currentSearch);
            
            // Check if item matches filter
            const matchesFilter = currentFilter === 'all' || itemCategory === currentFilter;
            
            if (matchesSearch && matchesFilter) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
            }
        });
        
        // Show/hide menu sections based on visible items
        menuSections.forEach(section => {
            const visibleItems = section.querySelectorAll('.menu-item[style*="block"]');
            if (visibleItems.length > 0) {
                section.style.display = 'block';
                section.style.opacity = '1';
            } else {
                section.style.display = 'none';
                section.style.opacity = '0';
            }
        });
        
        // Show "No results" message if needed
        showNoResultsMessage();
    }
    
    function showNoResultsMessage() {
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const visibleItems = document.querySelectorAll('.menu-item[style*="block"]');
        if (visibleItems.length === 0 && (currentSearch !== '' || currentFilter !== 'all')) {
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No se encontraron resultados</h3>
                    <p>Intenta con otros términos de búsqueda o cambia el filtro.</p>
                </div>
            `;
            
            const menuCategories = document.querySelector('.menu-categories');
            if (menuCategories) {
                menuCategories.appendChild(message);
            }
        }
    }
}

// Enhanced Gallery Filter and Lightbox Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items with animation
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filter === 'all' || itemCategory === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    if (!lightbox) return;
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Get all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Initialize current images array
    function updateCurrentImages() {
        currentImages = [];
        galleryItems.forEach(item => {
            if (item.style.display !== 'none') {
                const expandBtn = item.querySelector('.gallery-expand-btn');
                if (expandBtn) {
                    currentImages.push({
                        src: expandBtn.getAttribute('data-src'),
                        alt: expandBtn.getAttribute('data-alt'),
                        title: item.querySelector('.gallery-info h3')?.textContent || '',
                        description: item.querySelector('.gallery-info p')?.textContent || ''
                    });
                }
            }
        });
    }
    
    // Open lightbox
    function openLightbox(index) {
        if (currentImages.length === 0) return;
        
        currentIndex = index;
        const image = currentImages[currentIndex];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        updateNavigationButtons();
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Update navigation buttons
    function updateNavigationButtons() {
        lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }
    
    // Navigate to previous image
    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
        const image = currentImages[currentIndex];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
    }
    
    // Navigate to next image
    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
        const image = currentImages[currentIndex];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxTitle.textContent = image.title;
        lightboxDescription.textContent = image.description;
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        const expandBtn = item.querySelector('.gallery-expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', function() {
                updateCurrentImages();
                openLightbox(index);
            });
        }
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left - next image
            } else {
                prevImage(); // Swipe right - previous image
            }
        }
    }
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

// Scroll Progress and Back to Top - Enhanced
function initScrollToTop() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);
    
    // Scroll progress functionality
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
        
        // Show/hide back to top button
        if (scrollTop > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
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
    initLightbox();
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
