// Photographer Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePhotographerDashboard();
});

function initializePhotographerDashboard() {
    // Initialize event listeners
    initializeViewButtons();
    initializeNavigation();
    initializeResponsiveTable();
    
    // Add loading state management
    initializeLoadingStates();
    
    console.log('Photographer Dashboard initialized successfully');
}

// View Button Functionality
function initializeViewButtons() {
    const viewButtons = document.querySelectorAll('.photographer-view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            addLoadingState(this);
            
            // Get the event data from the row
            const row = this.closest('.photographer-table-row');
            const eventData = getEventDataFromRow(row);
            
            // Simulate API call delay
            setTimeout(() => {
                handleViewEvent(eventData);
                removeLoadingState(this);
            }, 800);
        });
    });
}

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.photographer-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation based on href
            const target = this.getAttribute('href');
            handleNavigation(target);
        });
    });
}

// Responsive Table Functionality
function initializeResponsiveTable() {
    const tableCells = document.querySelectorAll('.photographer-table-cell');
    const headers = ['Date', 'Venue', 'Client', 'Action'];
    
    tableCells.forEach((cell, index) => {
        const headerIndex = index % 4;
        cell.setAttribute('data-label', headers[headerIndex]);
    });
}

// Loading State Management
function initializeLoadingStates() {
    // Add loading class helper
    window.addLoadingState = function(element) {
        element.classList.add('loading');
        element.disabled = true;
        
        const originalText = element.innerHTML;
        element.setAttribute('data-original-text', originalText);
        element.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
    };
    
    window.removeLoadingState = function(element) {
        element.classList.remove('loading');
        element.disabled = false;
        
        const originalText = element.getAttribute('data-original-text');
        if (originalText) {
            element.innerHTML = originalText;
            element.removeAttribute('data-original-text');
        }
    };
}

// Event Data Extraction
function getEventDataFromRow(row) {
    const cells = row.querySelectorAll('.photographer-table-cell');
    return {
        date: cells[0]?.textContent.trim(),
        venue: cells[1]?.textContent.trim(),
        client: cells[2]?.textContent.trim()
    };
}

// Handle View Event Action
function handleViewEvent(eventData) {
    console.log('Viewing event:', eventData);
    
    // Create modal or redirect to event details page
    showEventDetailsModal(eventData);
}

// Show Event Details Modal
function showEventDetailsModal(eventData) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="eventDetailsModal" tabindex="-1" aria-labelledby="eventDetailsModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--primary-deep-blue); color: var(--secondary-white);">
                        <h5 class="modal-title" id="eventDetailsModalLabel">
                            <i class="fas fa-calendar-alt me-2"></i>
                            Event Details
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary">Date</h6>
                                <p class="mb-0">${eventData.date}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="fw-bold text-primary">Venue</h6>
                                <p class="mb-0">${eventData.venue}</p>
                            </div>
                            <div class="col-12">
                                <h6 class="fw-bold text-primary">Client</h6>
                                <p class="mb-0">${eventData.client}</p>
                            </div>
                            <div class="col-12">
                                <hr>
                                <h6 class="fw-bold text-primary">Actions</h6>
                                <div class="d-flex gap-2 flex-wrap">
                                    <button class="btn btn-outline-primary btn-sm">
                                        <i class="fas fa-images me-1"></i>View Photos
                                    </button>
                                    <button class="btn btn-outline-success btn-sm">
                                        <i class="fas fa-upload me-1"></i>Upload Photos
                                    </button>
                                    <button class="btn btn-outline-info btn-sm">
                                        <i class="fas fa-edit me-1"></i>Edit Details
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm">
                                        <i class="fas fa-download me-1"></i>Download Report
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
    
    // Remove existing modal if any
    const existingModal = document.getElementById('eventDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    modal.show();
    
    // Clean up modal after hidden
    document.getElementById('eventDetailsModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Handle Navigation
function handleNavigation(target) {
    console.log('Navigating to:', target);
    
    switch(target) {
        case '#events':
            // Already on events page
            showNotification('You are already viewing Events', 'info');
            break;
        case '#profile':
            showNotification('Profile section coming soon', 'info');
            break;
        case '#albums':
            showNotification('Albums section coming soon', 'info');
            break;
        default:
            console.log('Unknown navigation target:', target);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show photographer-notification`;
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
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Search/Filter Functionality (for future enhancement)
function initializeSearchFilter() {
    const searchInput = document.getElementById('eventSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterEvents(searchTerm);
        });
    }
}

function filterEvents(searchTerm) {
    const rows = document.querySelectorAll('.photographer-table-row');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('.photographer-table-cell');
        const rowText = Array.from(cells).map(cell => cell.textContent.toLowerCase()).join(' ');
        
        if (rowText.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
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

function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializePhotographerDashboard,
        handleViewEvent,
        showNotification,
        formatDate,
        capitalizeWords
    };
}