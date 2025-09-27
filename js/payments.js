// Payments Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize payments page
    initPaymentsPage();
});

function initPaymentsPage() {
    // Add any interactive functionality here
    setupTableInteractions();
    setupResponsiveFeatures();
}

function setupTableInteractions() {
    const tableRows = document.querySelectorAll('.payments-table tbody tr');
    
    tableRows.forEach(row => {
        // Add click functionality to rows if needed
        row.addEventListener('click', function() {
            // You can add functionality to handle row clicks here
            // For example, showing payment details in a modal
            console.log('Payment row clicked:', this);
        });
    });
}

function setupResponsiveFeatures() {
    // Handle responsive table behavior
    const table = document.querySelector('.payments-table');
    const container = document.querySelector('.payments-table-container');
    
    if (table && container) {
        // Add scroll indicators or other responsive features
        checkTableOverflow();
        
        // Listen for window resize
        window.addEventListener('resize', checkTableOverflow);
    }
}

function checkTableOverflow() {
    const container = document.querySelector('.table-responsive');
    if (container) {
        const isOverflowing = container.scrollWidth > container.clientWidth;
        
        if (isOverflowing) {
            container.classList.add('has-scroll');
        } else {
            container.classList.remove('has-scroll');
        }
    }
}

// Utility functions for payments
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(dateString));
}

// Filter and search functionality (can be extended)
function filterPayments(filterType, filterValue) {
    const rows = document.querySelectorAll('.payments-table tbody tr');
    
    rows.forEach(row => {
        let shouldShow = true;
        
        if (filterType === 'status') {
            const statusBadge = row.querySelector('.status-badge');
            if (statusBadge && !statusBadge.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
                shouldShow = false;
            }
        } else if (filterType === 'paymentType') {
            const paymentType = row.querySelector('.payment-type');
            if (paymentType && !paymentType.textContent.toLowerCase().includes(filterValue.toLowerCase())) {
                shouldShow = false;
            }
        }
        
        row.style.display = shouldShow ? '' : 'none';
    });
}

// Export functions for potential use in other scripts
window.PaymentsPage = {
    filterPayments,
    formatCurrency,
    formatDate
};