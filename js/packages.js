// Packages Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize packages page
    initPackagesPage();
});

function initPackagesPage() {
    // Setup interactive functionality
    setupAddPackageButton();
    animateCards();
    setupCardInteractions();
}

function setupAddPackageButton() {
    const addBtn = document.querySelector('.add-package-btn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            openAddPackageModal();
        });
    }
}

function animateCards() {
    // Add staggered animation to package cards
    const cards = document.querySelectorAll('.package-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${(index % 3 + 1) * 0.1}s`;
    });
}

function setupCardInteractions() {
    const cards = document.querySelectorAll('.package-card');
    
    cards.forEach(card => {
        // Add click functionality for editing packages
        card.addEventListener('click', function() {
            const packageName = this.querySelector('.package-name').textContent;
            const packagePrice = this.querySelector('.price-amount').textContent;
            console.log(`Clicked on ${packageName} package - $${packagePrice}/month`);
            
            // You can add edit functionality here
            // editPackage(packageName, packagePrice);
        });

        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-deep-blue)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#F3F4F6';
        });
    });
}

function openAddPackageModal() {
    // Create a simple modal for adding packages
    // In a real application, you might use Bootstrap modal or custom modal
    const modalHtml = `
        <div class="modal fade" id="addPackageModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add New Package</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addPackageForm">
                            <div class="mb-3">
                                <label for="packageCategory" class="form-label">Category</label>
                                <select class="form-select" id="packageCategory" required>
                                    <option value="">Select Category</option>
                                    <option value="weddings">Weddings</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="parties">Parties</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="packageName" class="form-label">Package Name</label>
                                <input type="text" class="form-control" id="packageName" required>
                            </div>
                            <div class="mb-3">
                                <label for="packagePrice" class="form-label">Price (per month)</label>
                                <input type="number" class="form-control" id="packagePrice" required>
                            </div>
                            <div class="mb-3">
                                <label for="packageFeatures" class="form-label">Features (one per line)</label>
                                <textarea class="form-control" id="packageFeatures" rows="4" required></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveNewPackage()">Add Package</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Check if modal already exists
    let existingModal = document.getElementById('addPackageModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addPackageModal'));
    modal.show();
}

function saveNewPackage() {
    const form = document.getElementById('addPackageForm');
    const formData = new FormData(form);
    
    const packageData = {
        category: document.getElementById('packageCategory').value,
        name: document.getElementById('packageName').value,
        price: document.getElementById('packagePrice').value,
        features: document.getElementById('packageFeatures').value.split('\n').filter(f => f.trim())
    };

    // Validate form
    if (!packageData.category || !packageData.name || !packageData.price || packageData.features.length === 0) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    // Show loading state
    const saveBtn = document.querySelector('#addPackageModal .btn-primary');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    saveBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Add the new package to the appropriate section
        addPackageToGrid(packageData);
        
        // Show success message
        showSuccessMessage('Package added successfully!');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPackageModal'));
        modal.hide();
        
        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }, 1500);
}

function addPackageToGrid(packageData) {
    const section = document.querySelector(`[data-category="${packageData.category}"] .packages-grid`) ||
                   document.querySelector('.packages-grid');
    
    if (!section) return;

    const packageHtml = `
        <div class="package-card">
            <div class="package-header">
                <h3 class="package-name">${packageData.name}</h3>
                <div class="package-price">
                    <span class="price-amount">${packageData.price}</span>
                    <span class="price-period">/ month</span>
                </div>
            </div>
            <div class="package-features">
                ${packageData.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas fa-check feature-icon"></i>
                        <span>${feature.trim()}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    section.insertAdjacentHTML('beforeend', packageHtml);
    
    // Reinitialize card interactions for the new card
    setupCardInteractions();
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
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Export functions for external use
window.PackagesPage = {
    openAddPackageModal,
    saveNewPackage,
    addPackageToGrid
};