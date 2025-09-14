/**
 * skills.js - Handles search functionality on the skills page
 */

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-btn');
    const skillCards = document.querySelectorAll('.category-card, .trending-tag, .teacher-card');
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.textContent = 'No matching skills found. Try different keywords.';
    noResultsMessage.style.display = 'none';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.margin = '2rem 0';
    noResultsMessage.style.color = '#666';
    noResultsMessage.style.fontSize = '1.1rem';
    
    // Insert the no results message after the search container
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.parentNode.insertBefore(noResultsMessage, searchContainer.nextSibling);
    }

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        let hasResults = false;

        // If search is empty, show all items
        if (searchTerm === '') {
            skillCards.forEach(card => {
                card.style.display = '';
                const parentSection = card.closest('section');
                if (parentSection) {
                    parentSection.style.display = '';
                }
            });
            noResultsMessage.style.display = 'none';
            return;
        }

        // Search through all skill cards
        skillCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = '';
                const parentSection = card.closest('section');
                if (parentSection) {
                    parentSection.style.display = '';
                    parentSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if no matches found
        if (!hasResults) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // Add click event to search button
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Add loading effect
            const originalButtonHTML = searchButton.innerHTML;
            searchButton.disabled = true;
            searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            
            // Simulate search delay for better UX
            setTimeout(() => {
                performSearch();
                searchButton.innerHTML = originalButtonHTML;
                searchButton.disabled = false;
            }, 500);
        });
    }

    // Add Enter key support for search
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Add clear button functionality
    const clearButton = document.createElement('button');
    clearButton.className = 'clear-search';
    clearButton.innerHTML = '<i class="fas fa-times"></i>';
    clearButton.style.position = 'absolute';
    clearButton.style.right = '50px';
    clearButton.style.top = '50%';
    clearButton.style.transform = 'translateY(-50%)';
    clearButton.style.background = 'none';
    clearButton.style.border = 'none';
    clearButton.style.color = '#999';
    clearButton.style.cursor = 'pointer';
    clearButton.style.display = 'none';
    
    // Add hover effect
    clearButton.addEventListener('mouseover', () => {
        clearButton.style.color = '#333';
    });
    
    clearButton.addEventListener('mouseout', () => {
        clearButton.style.color = '#999';
    });

    // Insert clear button into search container
    if (searchContainer) {
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(clearButton);
    }

    // Clear search functionality
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        clearButton.style.display = 'none';
        performSearch();
    });

    // Show/hide clear button based on input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearButton.style.display = this.value ? 'block' : 'none';
        });
    }
});
