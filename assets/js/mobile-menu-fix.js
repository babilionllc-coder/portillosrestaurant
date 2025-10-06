// Mobile Menu Fix - Simplified and Robust Implementation
function initMobileMenuFixed() {
    console.log('Initializing FIXED mobile menu...');
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) {
        console.error('Mobile menu elements not found:', { navToggle: !!navToggle, navMenu: !!navMenu });
        return;
    }

    console.log('Mobile menu elements found:', { navToggle, navMenu });

    // Remove all existing event listeners by cloning the element
    const newNavToggle = navToggle.cloneNode(true);
    navToggle.parentNode.replaceChild(newNavToggle, navToggle);
    
    // Get the fresh element
    const toggle = document.getElementById('navToggle');

    // Simple toggle function
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            // Close menu
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            console.log('Menu CLOSED');
        } else {
            // Open menu
            navMenu.classList.add('active');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            console.log('Menu OPENED');
        }
        
        // Debug info
        console.log('Menu state:', navMenu.classList.contains('active'));
        console.log('Menu display:', window.getComputedStyle(navMenu).display);
        console.log('Menu visibility:', window.getComputedStyle(navMenu).visibility);
    }

    // Add click event listener
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu toggle CLICKED');
        toggleMenu();
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            console.log('Menu closed via link click');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
            navMenu.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            console.log('Menu closed via outside click');
        }
    });

    // Add touch support for mobile
    toggle.addEventListener('touchstart', function(e) {
        e.preventDefault();
        console.log('Mobile menu toggle TOUCHED');
        toggleMenu();
    });

    console.log('FIXED mobile menu initialization complete');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready - initializing FIXED mobile menu');
    initMobileMenuFixed();
});

// Also initialize when window loads (fallback)
window.addEventListener('load', function() {
    console.log('Window loaded - re-initializing FIXED mobile menu');
    initMobileMenuFixed();
});
