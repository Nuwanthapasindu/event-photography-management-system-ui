// Photographers Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard functionality
    initializeSearch();
    initializeFilters();
    initializeActionButtons();
    initializeMobileMenu();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const tableRows = document.querySelectorAll('.photographers-table tbody tr');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            tableRows.forEach(row => {
                const name = row.querySelector('.photographer-name').textContent.toLowerCase();
                const email = row.querySelector('.photographer-email').textContent.toLowerCase();
                const phone = row.querySelector('.photographer-phone').textContent.toLowerCase();
                
                const isMatch = name.includes(searchTerm) || 
                               email.includes(searchTerm) || 
                               phone.includes(searchTerm);
                
                row.style.display = isMatch ? '' : 'none';
            });
            
            // Show "No results" message if no rows are visible
            updateNoResultsMessage(searchTerm);
        });
    }
}

// Filter functionality
function initializeFilters() {
    const statusFilter = document.querySelector('.filter-select');
    const dateFilter = document.querySelectorAll('.filter-select')[1];
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            console.log('Status filter changed:', e.target.value);
            // Add status filtering logic here when status data is available
        });
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function(e) {
            console.log('Date filter changed:', e.target.value);
            // Add date filtering logic here when date data is available
        });
    }
}

// Action buttons functionality
function initializeActionButtons() {
    // View buttons
    document.querySelectorAll('.view-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const row = e.target.closest('tr');
            const photographerName = row.querySelector('.photographer-name').textContent;
            console.log('Viewing photographer:', photographerName);
            // Add view functionality here
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.edit-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const row = e.target.closest('tr');
            const photographerName = row.querySelector('.photographer-name').textContent;
            console.log('Editing photographer:', photographerName);
            // Add edit functionality here
        });
    });
    
    // Delete buttons
    document.querySelectorAll('.delete-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const row = e.target.closest('tr');
            const photographerName = row.querySelector('.photographer-name').textContent;
            
            if (confirm(`Are you sure you want to delete ${photographerName}?`)) {
                console.log('Deleting photographer:', photographerName);
                // Add delete functionality here
                row.remove();
                showNotification('Photographer deleted successfully', 'success');
            }
        });
    });
    
    // Add photographer button
    const addBtn = document.querySelector('.add-photographer-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add new photographer clicked');
            // Add new photographer functionality here
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    // Add mobile menu toggle if needed
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
}

// Update no results message
function updateNoResultsMessage(searchTerm) {
    const tableBody = document.querySelector('.photographers-table tbody');
    const visibleRows = document.querySelectorAll('.photographers-table tbody tr[style=""], .photographers-table tbody tr:not([style])');
    
    // Remove existing no results message
    const existingMessage = tableBody.querySelector('.no-results-row');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add no results message if no rows are visible and there's a search term
    if (visibleRows.length === 0 && searchTerm) {
        const noResultsRow = document.createElement('tr');
        noResultsRow.className = 'no-results-row';
        noResultsRow.innerHTML = `
            <td colspan="4" class="text-center py-4 text-muted">
                <i class="fas fa-search mb-2"></i>
                <div>No photographers found matching "${searchTerm}"</div>
            </td>
        `;
        tableBody.appendChild(noResultsRow);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Utility functions
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

// Export functions for potential external use
window.PhotographersDashboard = {
    showNotification,
    updateNoResultsMessage
};