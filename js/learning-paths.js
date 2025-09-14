/**
 * learning-paths.js - Handles interactive functionality for the learning paths section
 */

document.addEventListener('DOMContentLoaded', function() {
    const pathCards = document.querySelectorAll('.path-card');
    
    // Initialize the first path as active
    if (pathCards.length > 0) {
        pathCards[0].classList.add('active');
        
        // Add click event to path headers to toggle content
        pathCards.forEach(card => {
            const header = card.querySelector('.path-header');
            const content = card.querySelector('.path-content');
            const steps = card.querySelectorAll('.step');
            const progressBar = card.querySelector('.progress-bar');
            const progressText = card.querySelector('.progress-text');
            
            // Toggle active class on header click
            header.addEventListener('click', () => {
                const isActive = card.classList.contains('active');
                
                // Close all other open paths
                document.querySelectorAll('.path-card').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Toggle current path
                if (!isActive) {
                    card.classList.add('active');
                }
            });
            
            // Add click event to steps to mark as complete
            steps.forEach((step, index) => {
                step.addEventListener('click', (e) => {
                    e.stopPropagation();
                    step.classList.toggle('completed');
                    updateProgress(card);
                });
            });
            
            // Initialize progress
            updateProgress(card);
        });
    }
    
    // Function to update progress indicator
    function updateProgress(card) {
        const steps = card.querySelectorAll('.step');
        const completedSteps = card.querySelectorAll('.step.completed');
        const progressBar = card.querySelector('.progress-bar');
        const progressText = card.querySelector('.progress-text');
        
        if (steps.length > 0 && progressBar && progressText) {
            const progress = Math.round((completedSteps.length / steps.length) * 100);
            progressBar.style.width = `${progress}%`;
            
            // Update progress text
            if (completedSteps.length === 0) {
                progressText.textContent = 'Not started yet';
            } else if (completedSteps.length === steps.length) {
                progressText.textContent = `Completed! 🎉`;
                progressBar.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
            } else {
                progressText.textContent = `${completedSteps.length} of ${steps.length} steps completed`;
            }
            
            // Save progress to localStorage
            const pathId = card.getAttribute('data-path');
            if (pathId) {
                const completedStepIndices = Array.from(steps)
                    .map((step, index) => step.classList.contains('completed') ? index : null)
                    .filter(index => index !== null);
                
                localStorage.setItem(`path-${pathId}`, JSON.stringify({
                    completedSteps: completedStepIndices,
                    lastUpdated: new Date().toISOString()
                }));
            }
        }
    }
    
    // Load saved progress from localStorage
    function loadProgress() {
        pathCards.forEach(card => {
            const pathId = card.getAttribute('data-path');
            if (pathId) {
                const savedData = localStorage.getItem(`path-${pathId}`);
                if (savedData) {
                    try {
                        const { completedSteps } = JSON.parse(savedData);
                        const steps = card.querySelectorAll('.step');
                        
                        completedSteps.forEach(stepIndex => {
                            if (steps[stepIndex]) {
                                steps[stepIndex].classList.add('completed');
                            }
                        });
                        
                        updateProgress(card);
                    } catch (e) {
                        console.error('Error loading saved progress:', e);
                    }
                }
            }
        });
    }
    
    // Load any saved progress
    loadProgress();
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each path card for scroll animations
    pathCards.forEach(card => {
        observer.observe(card);
    });
});
