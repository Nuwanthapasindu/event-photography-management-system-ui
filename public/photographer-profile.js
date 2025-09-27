// Photographer Profile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Profile form handling
    const profileForm = document.querySelector('.profile-form');
    const passwordForm = document.querySelector('.password-form');

    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                experience: document.getElementById('experience').value,
                specialization: document.getElementById('specialization').value
            };

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            if (!isValidEmail(formData.email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate API call
            saveProfile(formData);
        });
    }

    // Password form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate password fields
            if (!currentPassword || !newPassword || !confirmPassword) {
                showAlert('Please fill in all password fields.', 'error');
                return;
            }

            if (newPassword !== confirmPassword) {
                showAlert('New password and confirm password do not match.', 'error');
                return;
            }

            if (newPassword.length < 8) {
                showAlert('Password must be at least 8 characters long.', 'error');
                return;
            }

            // Simulate API call
            changePassword(currentPassword, newPassword);
        });
    }

    // Load existing profile data
    loadProfileData();
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    // Insert at top of main content
    const mainContent = document.querySelector('.main-content .container');
    mainContent.insertBefore(alertDiv, mainContent.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// API simulation functions
function saveProfile(profileData) {
    // Simulate loading state
    const saveBtn = document.querySelector('.save-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;

        // Show success message
        showAlert('Profile updated successfully!', 'success');
        
        console.log('Profile saved:', profileData);
    }, 1500);
}

function changePassword(currentPassword, newPassword) {
    // Simulate loading state
    const changeBtn = document.querySelector('.change-password-btn');
    const originalText = changeBtn.textContent;
    changeBtn.textContent = 'Changing...';
    changeBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        changeBtn.textContent = originalText;
        changeBtn.disabled = false;

        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';

        // Show success message
        showAlert('Password changed successfully!', 'success');
        
        console.log('Password changed successfully');
    }, 1500);
}

function loadProfileData() {
    // Simulate loading existing profile data
    // In a real application, this would fetch data from an API
    const mockData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '0112-123-1313-31',
        experience: '5',
        specialization: 'Wedding Photography'
    };

    // Populate form fields
    setTimeout(() => {
        Object.keys(mockData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = mockData[key];
            }
        });
    }, 500);
}