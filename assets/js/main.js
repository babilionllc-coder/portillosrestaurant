/* ===== PORTILLOS RESTAURANT - JAVASCRIPT ===== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initWhatsAppButtons();
    initImageLoading();
});

// Also initialize when window loads (fallback)
window.addEventListener('load', function() {
    console.log('Window loaded, re-initializing mobile menu...');
    initMobileMenu();
});

// iPhone-Optimized Mobile Menu System
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) {
        console.error('Mobile menu elements not found');
        // Create emergency fallback menu
        createEmergencyMenu();
        return;
    }

    console.log('Mobile menu elements found:', { navToggle, navMenu });

    // Toggle menu function
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            console.log('Menu closed');
        } else {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            console.log('Menu opened');
        }
        
        console.log('Menu state:', navMenu.classList.contains('active'));
        console.log('Menu display:', window.getComputedStyle(navMenu).display);
    }

    // iOS Safari touch event handler
    function handleMenuToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu toggle triggered');
        toggleMenu();
    }

    // Add multiple event listeners for iOS compatibility
    navToggle.addEventListener('click', handleMenuToggle);
    navToggle.addEventListener('touchstart', handleMenuToggle);
    navToggle.addEventListener('touchend', function(e) {
        e.preventDefault();
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            console.log('Menu closed via link click');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            console.log('Menu closed via outside click');
        }
    });

    // iOS Safari specific fixes
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        console.log('iOS device detected, applying iOS-specific fixes');
        
        // Prevent zoom on double tap
        navToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
        
        // Ensure menu is properly positioned on iOS
        navMenu.style.webkitTransform = 'translateZ(0)';
        navMenu.style.transform = 'translateZ(0)';
    }
}

// Emergency fallback menu for when elements aren't found
function createEmergencyMenu() {
    console.log('Creating emergency fallback menu');
    
    const emergencyMenu = document.createElement('div');
    emergencyMenu.id = 'emergency-menu';
    emergencyMenu.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: var(--color-red, #DC2626);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;
    
    emergencyMenu.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: bold;">Menu:</div>
        <a href="index.html" style="color: white; display: block; margin: 5px 0; text-decoration: none;">Inicio</a>
        <a href="menu.html" style="color: white; display: block; margin: 5px 0; text-decoration: none;">Menú</a>
        <a href="ordenar.html" style="color: white; display: block; margin: 5px 0; text-decoration: none;">Ordenar</a>
        <a href="nosotros.html" style="color: white; display: block; margin: 5px 0; text-decoration: none;">Nosotros</a>
    `;
    
    document.body.appendChild(emergencyMenu);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        if (emergencyMenu.parentNode) {
            emergencyMenu.parentNode.removeChild(emergencyMenu);
        }
    }, 10000);
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
    
    // Removed scroll animations for better performance and cleaner look
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
    const phoneNumber = '529981164598'; // Primary WhatsApp number
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
            const whatsappUrl = `https://wa.me/529981164598?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Enhanced Menu Search and Filter Functionality
function initMenuSearch() {
    const searchInput = document.getElementById('menuSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');
    const menuSections = document.querySelectorAll('.menu-category');
    
    if (!searchInput || !menuItems.length) return;
    
    let currentFilter = 'all';
    
    // Ensure all sections are visible by default
    menuSections.forEach(section => {
        section.style.display = 'block';
        section.style.opacity = '1';
    });
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
            const itemCategory = item.closest('.menu-category').getAttribute('data-category');
            
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
            const visibleItems = section.querySelectorAll('.menu-item-card[style*="block"]');
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
            const whatsappUrl = `https://wa.me/529981164598?text=${encodedMessage}`;
            
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

// Menu Modal Functionality
function initMenuModal() {
    const modal = document.getElementById('menuModal');
    const openBtn = document.getElementById('viewMenuBtn');
    const closeBtn = document.getElementById('closeMenuModal');
    const prevBtn = document.getElementById('prevMenuBtn');
    const nextBtn = document.getElementById('nextMenuBtn');
    const menuImage = document.getElementById('menuImage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetZoomBtn = document.getElementById('resetZoomBtn');
    const zoomLevelSpan = document.getElementById('zoomLevel');

    if (!modal || !openBtn) {
        console.log('Modal elements not found:', { modal: !!modal, openBtn: !!openBtn });
        return;
    }

    console.log('Modal elements found:', { modal: !!modal, openBtn: !!openBtn });

    // Menu images array
    const menuImages = [
        'assets/images/VER MENU/vermenu1.jpeg',
        'assets/images/VER MENU/vermenu2.jpeg',
        'assets/images/VER MENU/vermenu3.jpeg'
    ];

    let currentImageIndex = 0;
    let currentZoom = 100;
    let preloadedImages = [];
    let imagesLoaded = false;

    // Preload all menu images for instant loading
    function preloadImages() {
        console.log('Preloading menu images...');
        let loadedCount = 0;
        
        menuImages.forEach((src, index) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                console.log(`Image ${index + 1} preloaded successfully`);
                
                if (loadedCount === menuImages.length) {
                    imagesLoaded = true;
                    console.log('All menu images preloaded successfully');
                }
            };
            img.onerror = () => {
                console.error(`Failed to preload image ${index + 1}:`, src);
                loadedCount++;
                
                if (loadedCount === menuImages.length) {
                    imagesLoaded = true;
                    console.log('Image preloading completed (with some errors)');
                }
            };
            img.src = src;
            preloadedImages[index] = img;
        });
    }

    // Start preloading immediately
    preloadImages();

    // Function to ensure image loads with fallback
    function ensureImageLoads(src, retryCount = 0) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => {
                if (retryCount < 3) {
                    console.log(`Retrying image load (attempt ${retryCount + 1}):`, src);
                    setTimeout(() => {
                        ensureImageLoads(src, retryCount + 1).then(resolve).catch(reject);
                    }, 500 * (retryCount + 1));
                } else {
                    console.error('Failed to load image after 3 attempts:', src);
                    reject(new Error('Image failed to load'));
                }
            };
            img.src = src;
        });
    }

    // Set total pages
    totalPagesSpan.textContent = menuImages.length;

    // Open modal
    openBtn.addEventListener('click', () => {
        console.log('Opening modal...');
        modal.classList.add('show');
        // Allow background scrolling - don't hide overflow
        // document.body.style.overflow = 'hidden'; // Removed to allow background scrolling
        loadImage(0);
        console.log('Modal classes:', modal.className);
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        // Ensure scrolling is restored
        document.body.style.overflow = '';
        resetZoom();
    }

    closeBtn.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Navigation functions
    function loadImage(index) {
        currentImageIndex = index;
        console.log('Loading image:', menuImages[index]);
        
        // Use preloaded image if available, otherwise load normally
        if (preloadedImages[index] && preloadedImages[index].complete) {
            console.log('Using preloaded image for instant loading');
            menuImage.src = preloadedImages[index].src;
            menuImage.classList.add('loaded');
            menuImage.classList.remove('loading');
            menuImage.onload = () => console.log('Preloaded image displayed successfully');
        } else {
            console.log('Loading image normally');
            menuImage.classList.add('loading');
            menuImage.classList.remove('loaded');
            menuImage.src = menuImages[index];
            
            menuImage.onload = () => {
                console.log('Image loaded successfully');
                menuImage.classList.remove('loading');
                menuImage.classList.add('loaded');
            };
        }
        
        menuImage.onerror = () => {
            console.error('Image failed to load:', menuImages[index]);
            menuImage.classList.remove('loading');
            menuImage.classList.add('loaded');
            
            // Try to reload after a short delay
            setTimeout(() => {
                console.log('Retrying image load...');
                menuImage.classList.add('loading');
                menuImage.src = menuImages[index] + '?retry=' + Date.now();
            }, 1000);
        };
        
        currentPageSpan.textContent = index + 1;
        
        // Update navigation buttons
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === menuImages.length - 1;
        
        // Reset zoom when changing images
        resetZoom();
    }

    function nextImage() {
        if (currentImageIndex < menuImages.length - 1) {
            loadImage(currentImageIndex + 1);
        }
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            loadImage(currentImageIndex - 1);
        }
    }

    // Navigation event listeners
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('show')) return;
        
        if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // Zoom functionality
    function updateZoom() {
        menuImage.style.transform = `scale(${currentZoom / 100})`;
        zoomLevelSpan.textContent = `${currentZoom}%`;
        
        // Update zoom buttons
        zoomOutBtn.disabled = currentZoom <= 50;
        zoomInBtn.disabled = currentZoom >= 300;
    }

    function zoomIn() {
        if (currentZoom < 300) {
            currentZoom = Math.min(currentZoom + 25, 300);
            updateZoom();
        }
    }

    function zoomOut() {
        if (currentZoom > 50) {
            currentZoom = Math.max(currentZoom - 25, 50);
            updateZoom();
        }
    }

    function resetZoom() {
        currentZoom = 100;
        updateZoom();
    }

    // Zoom event listeners
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetZoomBtn.addEventListener('click', resetZoom);

    // Mouse wheel zoom
    menuImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    // Touch gestures for mobile
    let startDistance = 0;
    let startZoom = 100;

    menuImage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            startDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            startZoom = currentZoom;
        }
    });

    menuImage.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            if (startDistance > 0) {
                const scale = currentDistance / startDistance;
                const newZoom = Math.round(startZoom * scale);
                currentZoom = Math.max(50, Math.min(300, newZoom));
                updateZoom();
            }
        }
    });

    // Enhanced mobile scrolling functionality
    const imageContainer = modal.querySelector('.menu-image-container');
    
    // Add smooth scrolling to image container
    if (imageContainer) {
        // Enable smooth scrolling
        imageContainer.style.scrollBehavior = 'smooth';
        imageContainer.style.webkitOverflowScrolling = 'touch';
        imageContainer.style.touchAction = 'pan-y';
        imageContainer.style.overflowY = 'auto';
        imageContainer.style.overflowX = 'hidden';
        
        // Mobile touch scrolling improvements
        let isScrolling = false;
        let scrollTimeout;
        
        imageContainer.addEventListener('scroll', () => {
            isScrolling = true;
            
            // Clear previous timeout
            clearTimeout(scrollTimeout);
            
            // Add visual feedback during scroll
            imageContainer.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.1)';
            
            // Remove visual feedback after scroll stops
            scrollTimeout = setTimeout(() => {
                imageContainer.style.boxShadow = '';
                isScrolling = false;
            }, 150);
        });
        
        // Prevent default touch behavior that might interfere
        imageContainer.addEventListener('touchstart', (e) => {
            // Allow touch scrolling
        }, { passive: true });
        
        imageContainer.addEventListener('touchmove', (e) => {
            // Allow touch scrolling
        }, { passive: true });
        
        // Reset scroll position when changing images
        const originalLoadImage = loadImage;
        loadImage = function(index) {
            originalLoadImage(index);
            // Scroll to top when changing images
            setTimeout(() => {
                imageContainer.scrollTop = 0;
            }, 100);
        };
        
        console.log('Mobile scrolling enhanced for image container');
    }

    // Enhanced scroll handling for better user experience
    let isModalOpen = false;
    
    // Track modal state when opening
    const originalOpenClick = openBtn.onclick;
    openBtn.addEventListener('click', () => {
        isModalOpen = true;
        console.log('Modal opened - background scrolling enabled');
    });
    
    // Track modal state when closing
    const originalCloseModal = closeModal;
    closeModal = function() {
        isModalOpen = false;
        console.log('Modal closed - background scrolling restored');
        originalCloseModal();
    };
    
    // Allow background scrolling when modal is open
    document.addEventListener('wheel', (e) => {
        if (isModalOpen) {
            // If scrolling outside modal content, allow background scroll
            const modalContent = modal.querySelector('.menu-modal-content');
            if (modalContent && !modalContent.contains(e.target)) {
                // Allow background scrolling
                return;
            }
        }
    }, { passive: true });

    // Initialize
    loadImage(0);
}

// Initialize menu modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMenuModal();
});

// Also initialize when window loads (for pages that load dynamically)
window.addEventListener('load', () => {
    initMenuModal();
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
