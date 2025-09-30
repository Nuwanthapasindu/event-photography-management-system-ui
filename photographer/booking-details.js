// Booking Details JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingDetails();
});

function initializeBookingDetails() {
    // Initialize components
    initializeNavigation();
    initializeEquipmentManagement();
    initializeActionButtons();
    initializeAnimations();
    
    console.log('Booking Details page initialized successfully');
}

// Navigation Functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.booking-nav-link');
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-link');
    
    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href').replace('#', '');
            handleNavigation(target);
        });
    });
    
    // Handle breadcrumb clicks
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('href').replace('#', '');
            handleNavigation(target);
        });
    });
}

// Equipment Management
function initializeEquipmentManagement() {
    const addEquipmentBtn = document.getElementById('addEquipmentBtn');
    const addEquipmentForm = document.getElementById('addEquipmentForm');
    const equipmentSelect = document.getElementById('equipmentSelect');
    const customEquipmentInput = document.getElementById('customEquipment');
    
    // Handle add equipment button click
    if (addEquipmentBtn) {
        addEquipmentBtn.addEventListener('click', function() {
            handleAddEquipment();
        });
    }
    
    // Handle form submission
    if (addEquipmentForm) {
        addEquipmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddEquipment();
        });
    }
    
    // Handle select change to clear custom input
    if (equipmentSelect) {
        equipmentSelect.addEventListener('change', function() {
            if (this.value && customEquipmentInput) {
                customEquipmentInput.value = '';
            }
        });
    }
    
    // Handle custom input to clear select
    if (customEquipmentInput) {
        customEquipmentInput.addEventListener('input', function() {
            if (this.value && equipmentSelect) {
                equipmentSelect.value = '';
            }
        });
    }
    
    // Initialize remove equipment buttons
    initializeRemoveButtons();
}

// Initialize Remove Equipment Buttons
function initializeRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-equipment-btn');
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const equipmentId = this.getAttribute('data-equipment-id');
            handleRemoveEquipment(equipmentId, this);
        });
    });
}

// Handle Add Equipment
function handleAddEquipment() {
    const equipmentSelect = document.getElementById('equipmentSelect');
    const customEquipmentInput = document.getElementById('customEquipment');
    const addBtn = document.getElementById('addEquipmentBtn');
    
    let equipmentName = '';
    
    if (equipmentSelect && equipmentSelect.value) {
        equipmentName = equipmentSelect.value;
    } else if (customEquipmentInput && customEquipmentInput.value.trim()) {
        equipmentName = customEquipmentInput.value.trim();
    } else {
        showNotification('Please select or enter equipment name', 'warning');
        return;
    }
    
    // Add loading state
    addButtonLoading(addBtn);
    
    // Simulate API call
    setTimeout(() => {
        addEquipmentToTable(equipmentName);
        
        // Reset form
        if (equipmentSelect) equipmentSelect.value = '';
        if (customEquipmentInput) customEquipmentInput.value = '';
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addEquipmentModal'));
        if (modal) {
            modal.hide();
        }
        
        removeButtonLoading(addBtn);
        showNotification('Equipment added successfully', 'success');
    }, 800);
}

// Add Equipment to Table
function addEquipmentToTable(equipmentName) {
    const tableBody = document.getElementById('equipmentTableBody');
    const emptyState = document.getElementById('emptyEquipment');
    
    if (!tableBody) return;
    
    // Hide empty state if visible
    if (emptyState && !emptyState.classList.contains('d-none')) {
        emptyState.classList.add('d-none');
    }
    
    // Get next equipment ID
    const existingRows = tableBody.querySelectorAll('.equipment-row');
    const nextId = existingRows.length + 1;
    
    // Create new row
    const newRow = document.createElement('tr');
    newRow.className = 'equipment-row fade-in';
    newRow.innerHTML = `
        <td class="equipment-cell">${nextId}</td>
        <td class="equipment-cell">
            <span class="equipment-name">${equipmentName}</span>
        </td>
        <td class="equipment-cell text-center">
            <button class="btn remove-equipment-btn" data-equipment-id="${nextId}">
                <i class="fas fa-minus"></i>
            </button>
        </td>
    `;
    
    // Add to table
    tableBody.appendChild(newRow);
    
    // Initialize remove button for new row
    const removeBtn = newRow.querySelector('.remove-equipment-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            const equipmentId = this.getAttribute('data-equipment-id');
            handleRemoveEquipment(equipmentId, this);
        });
    }
    
    // Update table responsiveness for mobile
    updateMobileTableLabels();
}

// Handle Remove Equipment
function handleRemoveEquipment(equipmentId, buttonElement) {
    // Add loading state
    addButtonLoading(buttonElement);
    
    // Simulate API call
    setTimeout(() => {
        const row = buttonElement.closest('.equipment-row');
        if (row) {
            // Add fade out animation
            row.style.opacity = '0';
            row.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                row.remove();
                updateEquipmentNumbers();
                checkEmptyState();
                updateMobileTableLabels();
                showNotification('Equipment removed successfully', 'success');
            }, 300);
        }
    }, 500);
}

// Update Equipment Numbers
function updateEquipmentNumbers() {
    const rows = document.querySelectorAll('.equipment-row');
    rows.forEach((row, index) => {
        const numberCell = row.querySelector('.equipment-cell:first-child');
        const removeBtn = row.querySelector('.remove-equipment-btn');
        
        if (numberCell) {
            numberCell.textContent = index + 1;
        }
        
        if (removeBtn) {
            removeBtn.setAttribute('data-equipment-id', index + 1);
        }
    });
}

// Check Empty State
function checkEmptyState() {
    const tableBody = document.getElementById('equipmentTableBody');
    const emptyState = document.getElementById('emptyEquipment');
    
    if (!tableBody || !emptyState) return;
    
    const rows = tableBody.querySelectorAll('.equipment-row');
    
    if (rows.length === 0) {
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
    }
}

// Update Mobile Table Labels
function updateMobileTableLabels() {
    const cells = document.querySelectorAll('.equipment-cell');
    cells.forEach(cell => {
        const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);
        switch(cellIndex) {
            case 0:
                cell.setAttribute('data-label', '#');
                break;
            case 1:
                cell.setAttribute('data-label', 'Equipment');
                break;
            case 2:
                cell.setAttribute('data-label', 'Action');
                break;
        }
    });
}

// Action Buttons
function initializeActionButtons() {
    const editBtn = document.querySelector('.booking-edit-btn');
    const downloadBtn = document.querySelector('.booking-download-btn');
    const cancelBtn = document.querySelector('.booking-cancel-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            handleEditBooking();
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            handleDownloadReport();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            handleCancelBooking();
        });
    }
}

// Handle Edit Booking
function handleEditBooking() {
    addButtonLoading(document.querySelector('.booking-edit-btn'));
    
    setTimeout(() => {
        showNotification('Redirecting to edit page...', 'info');
        // Simulate redirect
        setTimeout(() => {
            showNotification('Edit functionality coming soon', 'info');
            removeButtonLoading(document.querySelector('.booking-edit-btn'));
        }, 1500);
    }, 500);
}

// Handle Download Report
function handleDownloadReport() {
    const downloadBtn = document.querySelector('.booking-download-btn');
    addButtonLoading(downloadBtn);
    
    setTimeout(() => {
        // Simulate file download
        const bookingData = getBookingData();
        generateReport(bookingData);
        removeButtonLoading(downloadBtn);
        showNotification('Report downloaded successfully', 'success');
    }, 1500);
}

// Handle Cancel Booking
function handleCancelBooking() {
    const modalHTML = `
        <div class="modal fade" id="cancelBookingModal" tabindex="-1" aria-labelledby="cancelBookingModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--interactive-error-red); color: var(--secondary-white);">
                        <h5 class="modal-title" id="cancelBookingModalLabel">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Cancel Booking
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            <strong>Warning:</strong> This action cannot be undone.
                        </div>
                        <p>Are you sure you want to cancel this booking? This will:</p>
                        <ul>
                            <li>Remove the booking from the system</li>
                            <li>Notify the client and photographer</li>
                            <li>Process any applicable refunds</li>
                            <li>Update equipment availability</li>
                        </ul>
                        <div class="mt-3">
                            <label for="cancellationReason" class="form-label">Reason for Cancellation (Optional)</label>
                            <textarea class="form-control" id="cancellationReason" rows="3" placeholder="Enter reason for cancellation..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keep Booking</button>
                        <button type="button" class="btn btn-danger" id="confirmCancelBtn">
                            <i class="fas fa-times me-1"></i>
                            Confirm Cancellation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    showModal(modalHTML, 'cancelBookingModal');
    
    // Handle confirm cancellation
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmCancelBtn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                confirmBookingCancellation();
            });
        }
    }, 100);
}

// Confirm Booking Cancellation
function confirmBookingCancellation() {
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const reason = document.getElementById('cancellationReason')?.value || '';
    
    addButtonLoading(confirmBtn);
    
    setTimeout(() => {
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('cancelBookingModal'));
        if (modal) {
            modal.hide();
        }
        
        showNotification('Booking cancelled successfully', 'success');
        
        // Simulate redirect to bookings list
        setTimeout(() => {
            showNotification('Redirecting to bookings list...', 'info');
        }, 1500);
    }, 2000);
}

// Get Booking Data
function getBookingData() {
    return {
        bookingId: 'Booking #001',
        createdDate: 'July 15, 2024',
        eventType: 'Wedding',
        eventDate: 'August 24, 2024',
        eventTime: '4:00 PM',
        eventLocation: 'The Grand Ballroom, City Center',
        clientName: 'Sophia Clark',
        clientEmail: 'sophia.clark@email.com',
        clientPhone: '(555) 123-4567',
        packageName: 'Premium Wedding Package',
        packagePrice: '$3,500',
        photographer: 'Ethan Bennett',
        equipment: getEquipmentList()
    };
}

// Get Equipment List
function getEquipmentList() {
    const equipmentRows = document.querySelectorAll('.equipment-row');
    const equipment = [];
    
    equipmentRows.forEach(row => {
        const equipmentName = row.querySelector('.equipment-name')?.textContent.trim();
        if (equipmentName) {
            equipment.push(equipmentName);
        }
    });
    
    return equipment;
}

// Generate Report
function generateReport(data) {
    // Simulate report generation
    console.log('Generating report with data:', data);
    
    // In a real application, this would generate and download a PDF
    // For now, we'll just simulate the download
    const reportContent = `
        Booking Report
        =============
        
        Booking ID: ${data.bookingId}
        Created: ${data.createdDate}
        
        Event Details:
        - Type: ${data.eventType}
        - Date: ${data.eventDate}
        - Time: ${data.eventTime}
        - Location: ${data.eventLocation}
        
        Client Information:
        - Name: ${data.clientName}
        - Email: ${data.clientEmail}
        - Phone: ${data.clientPhone}
        
        Package Details:
        - Package: ${data.packageName}
        - Price: ${data.packagePrice}
        
        Photographer: ${data.photographer}
        
        Equipment:
        ${data.equipment.map(item => `- ${item}`).join('\n')}
    `;
    
    // Create and download blob (simplified simulation)
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-001-report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Handle Navigation
function handleNavigation(target) {
    console.log('Navigating to:', target);
    
    switch(target) {
        case 'events':
            showNotification('Redirecting to Events...', 'info');
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
            break;
        case 'profile':
            showNotification('Profile section coming soon', 'info');
            break;
        case 'albums':
            showNotification('Albums section coming soon', 'info');
            break;
        default:
            console.log('Unknown navigation target:', target);
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
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
    
    // Clean up
    document.getElementById(modalId).addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Loading States
function addButtonLoading(button) {
    if (!button) return;
    
    button.classList.add('loading');
    button.disabled = true;
    
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
}

function removeButtonLoading(button) {
    if (!button) return;
    
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
    const detailsCards = document.querySelectorAll('.details-card');
    
    // Add fade-in animation with stagger
    detailsCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    detailsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show booking-notification`;
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
        initializeBookingDetails,
        handleAddEquipment,
        handleRemoveEquipment,
        showNotification,
        formatDate
    };
}