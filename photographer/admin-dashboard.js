// Admin Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

function initializeAdminDashboard() {
    // Initialize components
    initializeSidebar();
    initializeNavigation();
    initializeBookingCards();
    initializeNotifications();
    
    // Add loading animations
    addLoadingAnimations();
    
    console.log('Admin Dashboard initialized successfully');
}

// Sidebar Functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Mobile toggle functionality
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            toggleSidebar();
        });
    }
    
    // Overlay click to close sidebar
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            closeSidebar();
        });
    }
    
    // Handle sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation
            const section = this.getAttribute('data-section');
            handleSectionNavigation(section);
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 991) {
                closeSidebar();
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeSidebar();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('show')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Navigation Functionality
function initializeNavigation() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.section) {
            updateActiveSection(e.state.section);
        }
    });
    
    // Set initial state
    const initialSection = 'dashboard';
    history.replaceState({ section: initialSection }, '', `#${initialSection}`);
}

function handleSectionNavigation(section) {
    console.log('Navigating to section:', section);
    
    // Update URL without page reload
    history.pushState({ section: section }, '', `#${section}`);
    
    // Update active section
    updateActiveSection(section);
    
    // Load section content
    loadSectionContent(section);
}

function updateActiveSection(section) {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
}

function loadSectionContent(section) {
    // Show loading state
    showSectionLoading();
    
    // Simulate content loading
    setTimeout(() => {
        switch(section) {
            case 'dashboard':
                showDashboardContent();
                break;
            case 'bookings':
                showBookingsContent();
                break;
            case 'admin':
                showAdminContent();
                break;
            case 'photographers':
                showPhotographersContent();
                break;
            case 'packages':
                showPackagesContent();
                break;
            case 'payments':
                showPaymentsContent();
                break;
            case 'reviews':
                showReviewsContent();
                break;
            case 'albums':
                showAlbumsContent();
                break;
            case 'equipment':
                showEquipmentContent();
                break;
            default:
                showDashboardContent();
        }
        
        hideSectionLoading();
    }, 300);
}

// Booking Cards Functionality
function initializeBookingCards() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            addButtonLoading(this);
            
            // Get booking data
            const card = this.closest('.booking-card');
            const bookingData = getBookingDataFromCard(card);
            
            // Simulate API call
            setTimeout(() => {
                handleViewBooking(bookingData);
                removeButtonLoading(this);
            }, 800);
        });
    });
    
    // Add hover animations
    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Notifications Functionality
function initializeNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            showNotificationsModal();
        });
    }
}

// Content Loading Functions
function showDashboardContent() {
    // Current booking cards are already shown
    console.log('Dashboard content loaded');
}

function showBookingsContent() {
    showNotification('Bookings section loaded', 'info');
}

function showAdminContent() {
    showNotification('Admin section - coming soon', 'info');
}

function showPhotographersContent() {
    showNotification('Photographers section - coming soon', 'info');
}

function showPackagesContent() {
    showNotification('Packages section - coming soon', 'info');
}

function showPaymentsContent() {
    showNotification('Payments section - coming soon', 'info');
}

function showReviewsContent() {
    showNotification('Reviews section - coming soon', 'info');
}

function showAlbumsContent() {
    showNotification('Albums section - coming soon', 'info');
}

function showEquipmentContent() {
    showNotification('Equipment section - coming soon', 'info');
}

// Loading States
function showSectionLoading() {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.classList.add('loading');
    }
}

function hideSectionLoading() {
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.classList.remove('loading');
    }
}

function addButtonLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
    
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
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

// Data Extraction
function getBookingDataFromCard(card) {
    const title = card.querySelector('.booking-title')?.textContent.trim();
    const date = card.querySelector('.booking-date')?.textContent.trim();
    const client = card.querySelector('.client-info')?.textContent.replace('Client - ', '').trim();
    const photographer = card.querySelector('.photographer-info')?.textContent.replace('Photographer - ', '').trim();
    const location = card.querySelector('.location-badge')?.textContent.trim();
    
    return {
        title,
        date,
        client,
        photographer,
        location
    };
}

// Handle Booking View
function handleViewBooking(bookingData) {
    console.log('Viewing booking:', bookingData);
    showBookingDetailsModal(bookingData);
}

// Booking Details Modal
function showBookingDetailsModal(bookingData) {
    const modalHTML = `
        <div class="modal fade" id="bookingDetailsModal" tabindex="-1" aria-labelledby="bookingDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--primary-deep-blue); color: var(--secondary-white);">
                        <h5 class="modal-title" id="bookingDetailsModalLabel">
                            <i class="fas fa-calendar-check me-2"></i>
                            Booking Details
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary mb-2">Event Title</h6>
                                <p class="mb-0">${bookingData.title || 'N/A'}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary mb-2">Date</h6>
                                <p class="mb-0">${bookingData.date || 'N/A'}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary mb-2">Client</h6>
                                <p class="mb-0">${bookingData.client || 'N/A'}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary mb-2">Photographer</h6>
                                <p class="mb-0">${bookingData.photographer || 'N/A'}</p>
                            </div>
                            <div class="col-12">
                                <h6 class="fw-bold text-primary mb-2">Location</h6>
                                <p class="mb-0">${bookingData.location || 'N/A'}</p>
                            </div>
                            <div class="col-12">
                                <hr>
                                <h6 class="fw-bold text-primary mb-3">Quick Actions</h6>
                                <div class="d-flex gap-2 flex-wrap">
                                    <button class="btn btn-outline-primary btn-sm">
                                        <i class="fas fa-edit me-1"></i>Edit Booking
                                    </button>
                                    <button class="btn btn-outline-success btn-sm">
                                        <i class="fas fa-images me-1"></i>View Photos
                                    </button>
                                    <button class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-user me-1"></i>Contact Client
                                    </button>
                                    <button class="btn btn-outline-warning btn-sm">
                                        <i class="fas fa-calendar me-1"></i>Reschedule
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm">
                                        <i class="fas fa-download me-1"></i>Export Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">
                            <i class="fas fa-external-link-alt me-1"></i>
                            Open Full View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('bookingDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('bookingDetailsModal'));
    modal.show();
    
    // Clean up
    document.getElementById('bookingDetailsModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Notifications Modal
function showNotificationsModal() {
    const modalHTML = `
        <div class="modal fade" id="notificationsModal" tabindex="-1" aria-labelledby="notificationsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="notificationsModalLabel">
                            <i class="fas fa-bell me-2"></i>
                            Notifications
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="notification-item p-3 border-bottom">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-calendar-plus text-success me-3 mt-1"></i>
                                <div>
                                    <h6 class="mb-1">New Booking Request</h6>
                                    <p class="mb-1 text-muted small">Sarah Miller requested a wedding shoot for August 25th</p>
                                    <small class="text-muted">2 hours ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="notification-item p-3 border-bottom">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-upload text-info me-3 mt-1"></i>
                                <div>
                                    <h6 class="mb-1">Photos Uploaded</h6>
                                    <p class="mb-1 text-muted small">Emily Carter uploaded 45 photos for Johnson wedding</p>
                                    <small class="text-muted">4 hours ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="notification-item p-3">
                            <div class="d-flex align-items-start">
                                <i class="fas fa-star text-warning me-3 mt-1"></i>
                                <div>
                                    <h6 class="mb-1">New Review</h6>
                                    <p class="mb-1 text-muted small">5-star review received from David & Emma</p>
                                    <small class="text-muted">6 hours ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm">Mark All as Read</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('notificationsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('notificationsModal'));
    modal.show();
    
    // Clean up
    document.getElementById('notificationsModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show admin-notification`;
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

// Loading Animations
function addLoadingAnimations() {
    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.05}s`;
        link.classList.add('slide-in');
    });
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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAdminDashboard,
        handleViewBooking,
        showNotification,
        formatDate
    };
}