// Reviews Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsPage();
});

function initializeReviewsPage() {
    initializeReviewForm();
    initializeEditToggle();
    
    // Initialize all star rating containers
    const allStarContainers = document.querySelectorAll('.star-rating-input');
    allStarContainers.forEach(container => {
        initializeStarRating(container);
    });
}

// Simple edit form toggle functionality
function initializeEditToggle() {
    // Add click handler to show edit forms
    document.addEventListener('click', function(e) {
        if (e.target.closest('.edit-btn')) {
            e.preventDefault();
            const reviewItem = e.target.closest('.review-item');
            const editForm = reviewItem.querySelector('.edit-form');
            const reviewText = reviewItem.querySelector('.review-text');
            const ratingStars = reviewItem.querySelector('.rating-stars');
            const reviewActions = reviewItem.querySelector('.review-actions');
            
            // Hide review content and show edit form
            reviewText.style.display = 'none';
            ratingStars.style.display = 'none';
            reviewActions.style.display = 'none';
            editForm.style.display = 'block';
            
            // Initialize star rating for the edit form
            const editStarsContainer = editForm.querySelector('.edit-stars');
            if (editStarsContainer) {
                initializeStarRating(editStarsContainer);
            }
        }
    });
}

// Review Form Functionality
function initializeReviewForm() {
    // Initialize star rating functionality
    initializeStarRating('.star-rating-input');
}





// Star Rating Functionality
function initializeStarRating(container) {
    let starContainer;
    
    if (typeof container === 'string') {
        starContainer = document.querySelector(container);
    } else {
        starContainer = container;
    }
    
    if (!starContainer) return;
    
    const radioInputs = starContainer.querySelectorAll('input[type="radio"]');
    const starLabels = starContainer.querySelectorAll('.star-label');
    
    // Add hover events to star labels
    starLabels.forEach((label, index) => {
        label.addEventListener('mouseenter', () => {
            highlightStars(starContainer, 5 - index);
        });
        
        label.addEventListener('click', () => {
            const rating = label.getAttribute('data-rating');
            selectRating(starContainer, rating);
        });
    });
    
    // Reset on mouse leave
    starContainer.addEventListener('mouseleave', () => {
        const checkedInput = starContainer.querySelector('input[type="radio"]:checked');
        if (checkedInput) {
            highlightStars(starContainer, checkedInput.value);
        } else {
            resetStarHighlight(starContainer);
        }
    });
    
    // Initialize with current selection
    const checkedInput = starContainer.querySelector('input[type="radio"]:checked');
    if (checkedInput) {
        highlightStars(starContainer, checkedInput.value);
    }
}

function highlightStars(container, rating) {
    const starLabels = container.querySelectorAll('.star-label');
    starLabels.forEach((label, index) => {
        const starRating = parseInt(label.getAttribute('data-rating'));
        const starIcon = label.querySelector('i');
        
        if (starRating <= rating) {
            starIcon.style.color = '#FFC107';
        } else {
            starIcon.style.color = '#E5E7EB';
        }
    });
}

function selectRating(container, rating) {
    const radioInput = container.querySelector(`input[value="${rating}"]`);
    if (radioInput) {
        radioInput.checked = true;
        highlightStars(container, rating);
        
        // Trigger change event for validation
        radioInput.dispatchEvent(new Event('change'));
    }
}

function resetStarRating(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
        const radioInputs = container.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(input => input.checked = false);
        resetStarHighlight(container);
    }
}

function resetStarHighlight(container) {
    const starLabels = container.querySelectorAll('.star-label');
    starLabels.forEach(label => {
        const starIcon = label.querySelector('i');
        starIcon.style.color = '#E5E7EB';
    });
}