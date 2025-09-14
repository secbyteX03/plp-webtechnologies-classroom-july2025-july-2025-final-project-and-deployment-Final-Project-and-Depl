// Function to get the correct base path for templates
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('skills/')) {
        return '../';
    }
    return './';
}

// Function to load header and footer templates
async function loadTemplates() {
    try {
        const basePath = getBasePath();
        
        // Load header
        const headerResponse = await fetch(`${basePath}templates/header.html`);
        if (!headerResponse.ok) throw new Error('Failed to load header');
        const headerHTML = await headerResponse.text();
        document.querySelector('header').outerHTML = headerHTML;

        // Load footer
        const footerResponse = await fetch(`${basePath}templates/footer.html`);
        if (!footerResponse.ok) throw new Error('Failed to load footer');
        const footerHTML = await footerResponse.text();
        document.querySelector('footer').outerHTML = footerHTML;

        // Set active link based on current page
        setActiveLink();
        
        // Initialize mobile menu toggle
        initMobileMenu();
    } catch (error) {
        console.error('Error loading templates:', error);
    }
}

// Set active link in navigation
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
}

// Load templates when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTemplates);
} else {
    loadTemplates();
}
