// Payment Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment details page
    initPaymentDetailsPage();
});

function initPaymentDetailsPage() {
    // Setup interactive functionality
    setupActionButtons();
    animateCards();
}

function setupActionButtons() {
    // Download button functionality
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            downloadReceipt();
        });
    }

    // Send email button functionality
    const sendEmailBtn = document.querySelector('.send-email-btn');
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener('click', function() {
            sendPaymentEmail();
        });
    }
}

function animateCards() {
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.details-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

// Status Update Function
function updatePaymentStatus() {
    const statusSelect = document.getElementById('paymentStatusSelect');
    const selectedStatus = statusSelect.value;
    
    // Update the status badge in the overview card
    const statusBadge = document.querySelector('.status-badge');
    if (statusBadge) {
        // Remove all status classes
        statusBadge.className = statusBadge.className.replace(/status-\w+/g, '');
        // Add new status class
        statusBadge.classList.add(`status-${selectedStatus}`);
        statusBadge.textContent = selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
    }
    
    // Show success message
    showSuccessMessage(`Payment status updated to ${selectedStatus}`);
    
    // In a real application, you would make an API call here
    console.log(`Payment status updated to: ${selectedStatus}`);
}

// Image Modal Function
function openImageModal() {
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

// Action Functions
function downloadReceipt() {
    // Show loading state
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    downloadBtn.disabled = true;

    // Simulate download process
    setTimeout(() => {
        // Reset button
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Receipt downloaded successfully!');
        
        // In a real application, you would trigger the actual download here
        console.log('Downloading receipt for payment PAY-2024-001');
    }, 2000);
}

function sendPaymentEmail() {
    // Show loading state
    const emailBtn = document.querySelector('.send-email-btn');
    const originalText = emailBtn.innerHTML;
    emailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    emailBtn.disabled = true;

    // Simulate email sending
    setTimeout(() => {
        // Reset button
        emailBtn.innerHTML = originalText;
        emailBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Payment email sent successfully!');
        
        // In a real application, you would make an API call here
        console.log('Sending payment email to sophia.carter@email.com');
    }, 1500);
}

// Utility Functions
function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--interactive-success-green)' : 'var(--interactive-error-red)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Export functions for external use
window.PaymentDetails = {
    updatePaymentStatus,
    openImageModal,
    downloadReceipt,
    sendPaymentEmail
};