/**
 * Youth Skill Share Platform - Main JavaScript
 * Handles all interactive elements across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Form submission handling
    const skillForm = document.getElementById('skillForm');
    if (skillForm) {
        skillForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(skillForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for offering your skill! We\'ll review your submission and get back to you soon.');
            skillForm.reset();
        });
    }
    
    // Search and filter functionality
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBy = document.getElementById('sortBy');
    const skillsList = document.getElementById('skillsList');
    
    if (searchInput && categoryFilter && sortBy && skillsList) {
        // Sample skills data - in a real app, this would come from a server
        const sampleSkills = [
            {
                id: 1,
                title: 'Graphic Design Basics',
                instructor: 'Alex Johnson',
                description: 'Learn the fundamentals of design and how to use tools like Adobe Photoshop and Illustrator.',
                category: 'design',
                date: '2025-09-10',
                rating: 4.8
            },
            {
                id: 2,
                title: 'Web Development 101',
                instructor: 'Sam Wilson',
                description: 'Introduction to HTML, CSS, and JavaScript for beginners.',
                category: 'technology',
                date: '2025-09-12',
                rating: 4.5
            },
            {
                id: 3,
                title: 'Public Speaking Mastery',
                instructor: 'Jamie Smith',
                description: 'Overcome stage fright and deliver powerful presentations.',
                category: 'communication',
                date: '2025-09-08',
                rating: 4.9
            },
            {
                id: 4,
                title: 'Digital Marketing Fundamentals',
                instructor: 'Taylor Reed',
                description: 'Learn the basics of digital marketing including SEO, social media, and email marketing.',
                category: 'business',
                date: '2025-09-15',
                rating: 4.6
            },
            {
                id: 5,
                title: 'Spanish for Beginners',
                instructor: 'Maria Garcia',
                description: 'Start speaking Spanish with confidence in everyday situations.',
                category: 'languages',
                date: '2025-09-05',
                rating: 4.7
            },
            {
                id: 6,
                title: 'Photography Basics',
                instructor: 'Chris Lee',
                description: 'Learn how to take stunning photos with any camera.',
                category: 'arts',
                date: '2025-09-18',
                rating: 4.8
            }
        ];
        
        // Function to render skills
        function renderSkills(skills) {
            skillsList.innerHTML = '';
            
            if (skills.length === 0) {
                skillsList.innerHTML = '<p class="no-results">No skills found matching your criteria. Try adjusting your search or filters.</p>';
                return;
            }
            
            skills.forEach(skill => {
                const skillElement = document.createElement('div');
                skillElement.className = 'skill-listing fade-in';
                skillElement.innerHTML = `
                    <h3>${skill.title}</h3>
                    <p class="instructor">By: ${skill.instructor}</p>
                    <p>${skill.description}</p>
                    <span class="category">${formatCategory(skill.category)}</span>
                    <button class="btn secondary learn-more" data-id="${skill.id}">Learn More</button>
                `;
                skillsList.appendChild(skillElement);
            });
            
            // Add event listeners to the "Learn More" buttons
            document.querySelectorAll('.learn-more').forEach(button => {
                button.addEventListener('click', function() {
                    const skillId = this.getAttribute('data-id');
                    alert(`You clicked on skill #${skillId}. In a real application, this would take you to the skill details page.`);
                });
            });
        }
        
        // Format category for display
        function formatCategory(category) {
            return category.charAt(0).toUpperCase() + category.slice(1);
        }
        
        // Filter and sort skills
        function updateSkills() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value.toLowerCase();
            const sortMethod = sortBy.value;
            
            let filteredSkills = [...sampleSkills];
            
            // Filter by search term
            if (searchTerm) {
                filteredSkills = filteredSkills.filter(skill => 
                    skill.title.toLowerCase().includes(searchTerm) || 
                    skill.description.toLowerCase().includes(searchTerm) ||
                    skill.instructor.toLowerCase().includes(searchTerm)
                );
            }
            
            // Filter by category
            if (category) {
                filteredSkills = filteredSkills.filter(skill => 
                    skill.category === category
                );
            }
            
            // Sort skills
            switch (sortMethod) {
                case 'newest':
                    filteredSkills.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'popular':
                    filteredSkills.sort((a, b) => b.rating - a.rating);
                    break;
                case 'alphabetical':
                    filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
                    break;
            }
            
            renderSkills(filteredSkills);
        }
        
        // Event listeners
        searchInput.addEventListener('input', updateSkills);
        categoryFilter.addEventListener('change', updateSkills);
        sortBy.addEventListener('change', updateSkills);
        
        // Initial render
        updateSkills();
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // In a real application, you would send this data to a server
            console.log('Contact form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! We\'ll get back to you as soon as possible.');
            contactForm.reset();
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            const answer = item.querySelector('p');
            
            question.addEventListener('click', () => {
                // Close all other open FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('p').style.display = 'none';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.display = 'block';
                } else {
                    answer.style.display = 'none';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Function to show a notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add some basic animations on scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
});
