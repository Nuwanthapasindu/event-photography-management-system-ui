// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation active state management
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // View button functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const bookingId = row.querySelector('.booking-id').textContent;
            
            // Redirect to booking details page (you can modify this URL as needed)
            window.location.href = `booking-details.html?id=${bookingId}`;
        });
    });

    // Notification button functionality
    const notificationBtn = document.querySelector('.notification-btn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Add notification functionality here
            console.log('Notifications clicked');
            // You can add a dropdown or modal for notifications
        });
    }

    // Mobile sidebar toggle (for future mobile menu implementation)
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('show');
    }

    // Add mobile menu button if needed
    function addMobileMenuButton() {
        if (window.innerWidth <= 1024) {
            // Mobile menu implementation can be added here
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        addMobileMenuButton();
    });

    // Initial check for mobile
    addMobileMenuButton();

    // Table row hover effects (already handled by CSS, but can be enhanced with JS)
    const tableRows = document.querySelectorAll('.bookings-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            // Can add additional hover effects here if needed
        });
    });

    // Search functionality (can be added later)
    function initializeSearch() {
        // Search implementation can be added here
        // For filtering the bookings table
    }

    // Status filter functionality (can be added later)
    function initializeFilters() {
        // Filter implementation can be added here
        // For filtering by status, category, etc.
    }

    // Initialize additional features
    initializeSearch();
    initializeFilters();
});

// Utility function to format dates (for future use)
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Utility function to capitalize text
function capitalizeText(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}