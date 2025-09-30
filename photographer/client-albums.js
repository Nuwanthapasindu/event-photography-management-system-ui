// Client Albums JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeClientAlbums();
});

function initializeClientAlbums() {
    // Initialize components
    initializeAlbumCards();
    initializeNavigation();
    initializeAnimations();
    
    console.log('Client Albums page initialized successfully');
}

// Album Cards Functionality
function initializeAlbumCards() {
    const albumCards = document.querySelectorAll('.album-card');
    const viewButtons = document.querySelectorAll('.album-view-btn');
    
    // Handle album card clicks
    albumCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button directly
            if (e.target.closest('.album-view-btn')) {
                return;
            }
            
            const albumType = this.getAttribute('data-album');
            const status = this.querySelector('.album-view-btn').getAttribute('data-status');
            
            handleAlbumClick(albumType, status, this);
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make card focusable
        card.setAttribute('tabindex', '0');
    });
    
    // Handle view button clicks
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const status = this.getAttribute('data-status');
            const albumCard = this.closest('.album-card');
            const albumType = albumCard.getAttribute('data-album');
            
            // Add loading state
            addButtonLoading(this);
            
            // Simulate API call
            setTimeout(() => {
                handleViewButtonClick(albumType, status, albumCard);
                removeButtonLoading(this);
            }, 800);
        });
    });
}

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.client-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation
            const target = this.getAttribute('href').replace('#', '');
            handleNavigation(target);
        });
    });
}

// Handle Album Click
function handleAlbumClick(albumType, status, cardElement) {
    console.log('Album clicked:', albumType, 'Status:', status);
    
    // Add click animation
    cardElement.style.transform = 'scale(0.98)';
    setTimeout(() => {
        cardElement.style.transform = '';
    }, 150);
    
    if (status === 'locked') {
        showPaymentModal(albumType, cardElement);
    } else {
        showAlbumViewer(albumType, cardElement);
    }
}

// Handle View Button Click
function handleViewButtonClick(albumType, status, cardElement) {
    if (status === 'locked') {
        showPaymentModal(albumType, cardElement);
    } else {
        showAlbumViewer(albumType, cardElement);
    }
}

// Show Album Viewer
function showAlbumViewer(albumType, cardElement) {
    const albumData = getAlbumData(albumType, cardElement);
    
    const modalHTML = `
        <div class="modal fade" id="albumViewerModal" tabindex="-1" aria-labelledby="albumViewerModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--primary-deep-blue); color: var(--secondary-white);">
                        <h5 class="modal-title" id="albumViewerModalLabel">
                            <i class="fas fa-images me-2"></i>
                            ${albumData.title}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-8">
                                <h6 class="fw-bold text-primary mb-2">Event Details</h6>
                                <p class="mb-1"><strong>Date:</strong> ${albumData.date}</p>
                                <p class="mb-1"><strong>Album Type:</strong> ${albumData.type}</p>
                                <p class="mb-0"><strong>Status:</strong> <span class="badge bg-success">Unlocked</span></p>
                            </div>
                            <div class="col-md-4 text-end">
                                <button class="btn btn-success me-2">
                                    <i class="fas fa-download me-1"></i>
                                    Download All
                                </button>
                                <button class="btn btn-outline-primary">
                                    <i class="fas fa-share me-1"></i>
                                    Share
                                </button>
                            </div>
                        </div>
                        
                        <!-- Photo Grid -->
                        <div class="row g-3">
                            ${generatePhotoGrid(albumType)}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-external-link-alt me-1"></i>
                            Open Full Gallery
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalHTML, 'albumViewerModal');
}

// Show Payment Modal
function showPaymentModal(albumType, cardElement) {
    const albumData = getAlbumData(albumType, cardElement);
    
    const modalHTML = `
        <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--interactive-error-red); color: var(--secondary-white);">
                        <h5 class="modal-title" id="paymentModalLabel">
                            <i class="fas fa-lock me-2"></i>
                            Album Locked
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <i class="fas fa-lock text-danger" style="font-size: 3rem;"></i>
                            <h4 class="mt-3 mb-2">${albumData.title}</h4>
                            <p class="text-muted">${albumData.date}</p>
                        </div>
                        
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Payment Required:</strong> This album is locked due to partial payment. Please complete your payment to access the photos.
                        </div>
                        
                        <div class="payment-details">
                            <div class="row">
                                <div class="col-6">
                                    <p class="mb-1"><strong>Total Amount:</strong></p>
                                    <p class="h5 text-primary">$299.00</p>
                                </div>
                                <div class="col-6">
                                    <p class="mb-1"><strong>Remaining:</strong></p>
                                    <p class="h5 text-danger">$149.50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" onclick="handlePayment('${albumType}')">
                            <i class="fas fa-credit-card me-1"></i>
                            Complete Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showModal(modalHTML, 'paymentModal');
}

// Generate Photo Grid
function generatePhotoGrid(albumType) {
    const photoCount = 12; // Show 12 photos in preview
    let photoGrid = '';
    
    for (let i = 1; i <= photoCount; i++) {
        const photoClass = getPhotoClass(albumType, i);
        photoGrid += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="photo-item" data-photo="${i}">
                    <div class="photo-placeholder ${photoClass}">
                        <i class="fas fa-image"></i>
                        <div class="photo-overlay">
                            <button class="btn btn-light btn-sm">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return photoGrid;
}

// Get Photo Class for styling
function getPhotoClass(albumType, index) {
    const classes = {
        wedding: ['wedding-photo-1', 'wedding-photo-2', 'wedding-photo-3'],
        graduation: ['grad-photo-1', 'grad-photo-2', 'grad-photo-3'],
        family: ['family-photo-1', 'family-photo-2', 'family-photo-3'],
        corporate: ['corp-photo-1', 'corp-photo-2', 'corp-photo-3'],
        gala: ['gala-photo-1', 'gala-photo-2', 'gala-photo-3'],
        festival: ['fest-photo-1', 'fest-photo-2', 'fest-photo-3'],
        picnic: ['pic-photo-1', 'pic-photo-2', 'pic-photo-3'],
        exhibition: ['exh-photo-1', 'exh-photo-2', 'exh-photo-3']
    };
    
    const typeClasses = classes[albumType] || ['default-photo'];
    return typeClasses[index % typeClasses.length];
}

// Get Album Data
function getAlbumData(albumType, cardElement) {
    const title = cardElement.querySelector('.album-title')?.textContent.trim() || 'Untitled Album';
    const date = cardElement.querySelector('.album-date')?.textContent.replace('Captured on ', '').trim() || 'Unknown Date';
    const status = cardElement.querySelector('.status-badge')?.textContent.trim() || 'Unknown Status';
    
    return {
        title,
        date,
        status,
        type: albumType.charAt(0).toUpperCase() + albumType.slice(1)
    };
}

// Handle Navigation
function handleNavigation(target) {
    console.log('Navigating to:', target);
    
    switch(target) {
        case 'my-bookings':
            showNotification('Redirecting to My Bookings...', 'info');
            setTimeout(() => {
                window.location.href = '../my-bookings.html';
            }, 1000);
            break;
        case 'my-albums':
            showNotification('You are already viewing My Albums', 'info');
            break;
        case 'reviews':
            showNotification('Redirecting to Reviews...', 'info');
            setTimeout(() => {
                window.location.href = '../reviews.html';
            }, 1000);
            break;
        default:
            console.log('Unknown navigation target:', target);
    }
}

// Handle Payment
function handlePayment(albumType) {
    showNotification('Redirecting to payment gateway...', 'info');
    
    // Close payment modal
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    if (paymentModal) {
        paymentModal.hide();
    }
    
    // Simulate payment process
    setTimeout(() => {
        showNotification('Payment completed successfully! Album unlocked.', 'success');
        
        // Update album status in UI
        updateAlbumStatus(albumType, 'unlocked');
    }, 2000);
}

// Update Album Status
function updateAlbumStatus(albumType, newStatus) {
    const albumCard = document.querySelector(`[data-album="${albumType}"]`);
    if (!albumCard) return;
    
    const statusBadge = albumCard.querySelector('.status-badge');
    const viewButton = albumCard.querySelector('.album-view-btn');
    
    if (newStatus === 'unlocked') {
        statusBadge.className = 'status-badge unlocked';
        statusBadge.innerHTML = '<i class="fas fa-unlock me-1"></i>Unlocked';
        
        viewButton.setAttribute('data-status', 'unlocked');
        viewButton.className = 'btn album-view-btn';
        viewButton.innerHTML = '<i class="fas fa-eye me-2"></i>View Album';
    }
}

// Modal Helper
function showModal(modalHTML, modalId) {
    // Remove existing modal
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add photo item styles
    addPhotoStyles();
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
    
    // Clean up
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Add Photo Styles
function addPhotoStyles() {
    if (document.getElementById('photoStyles')) return;
    
    const styles = `
        <style id="photoStyles">
            .photo-item {
                position: relative;
                margin-bottom: 1rem;
            }
            .photo-placeholder {
                height: 200px;
                background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            .photo-placeholder:hover {
                transform: scale(1.02);
            }
            .photo-placeholder i {
                font-size: 2rem;
                color: #ccc;
            }
            .photo-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .photo-placeholder:hover .photo-overlay {
                opacity: 1;
            }
            .wedding-photo-1 { background: linear-gradient(135deg, #ffd89b, #19547b); }
            .wedding-photo-2 { background: linear-gradient(135deg, #667eea, #764ba2); }
            .wedding-photo-3 { background: linear-gradient(135deg, #f093fb, #f5576c); }
            .grad-photo-1 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
            .grad-photo-2 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
            .grad-photo-3 { background: linear-gradient(135deg, #fa709a, #fee140); }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Loading States
function addButtonLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
    
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
}

function removeButtonLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
    
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.innerHTML = originalText;
        button.removeAttribute('data-original-text');
    }
}

// Animations
function initializeAnimations() {
    const albumCards = document.querySelectorAll('.album-card');
    
    // Add fade-in animation with stagger
    albumCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    albumCards.forEach(card => observer.observe(card));
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show client-notification`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 4000);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeClientAlbums,
        handleAlbumClick,
        showNotification,
        formatDate
    };
}