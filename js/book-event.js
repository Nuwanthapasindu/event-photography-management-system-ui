// Book Event Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('bookEventForm');
    const uploadArea = document.getElementById('uploadArea');
    const uploadInput = document.getElementById('paymentSlip');
    const uploadBtn = document.querySelector('.upload-btn');
    const uploadedFile = document.getElementById('uploadedFile');
    const removeFileBtn = document.getElementById('removeFile');
    const submitBtn = document.querySelector('.submit-btn');

    // File upload handling
    if (uploadArea && uploadInput) {
        // Click to upload
        uploadArea.addEventListener('click', function(e) {
            if (e.target !== uploadInput) {
                uploadInput.click();
            }
        });

        uploadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            uploadInput.click();
        });

        // File input change
        uploadInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelection(e.target.files[0]);
            }
        });

        // Remove file functionality
        removeFileBtn.addEventListener('click', function() {
            clearFileSelection();
        });
    }

    // Package selection handling
    const packageRadios = document.querySelectorAll('input[name="selectedPackage"]');
    packageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updatePackageSelection();
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    // Initialize
    updatePackageSelection();

    // File handling functions
    function handleFileSelection(file) {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            showAlert('Please select a valid file type (PNG, JPG, or PDF)', 'error');
            return;
        }

        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            showAlert('File size must be less than 10MB', 'error');
            return;
        }

        // Display uploaded file
        const fileName = file.name;
        const fileNameSpan = uploadedFile.querySelector('.file-name');
        fileNameSpan.textContent = fileName;
        
        uploadArea.style.display = 'none';
        uploadedFile.style.display = 'flex';
    }

    function clearFileSelection() {
        uploadInput.value = '';
        uploadArea.style.display = 'block';
        uploadedFile.style.display = 'none';
    }

    function updatePackageSelection() {
        const packageItems = document.querySelectorAll('.package-item');
        packageItems.forEach(item => {
            const radio = item.querySelector('input[type="radio"]');
            if (radio && radio.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    function handleFormSubmission() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        
        // Validate required fields
        if (!validateForm()) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            return;
        }

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success message
            showAlert('Event booking submitted successfully! We will contact you soon.', 'success');
            
            // Optionally redirect to booking confirmation page
            // window.location.href = 'booking-confirmation.html';
        }, 2000);
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        // Validate package selection
        const selectedPackage = form.querySelector('input[name="selectedPackage"]:checked');
        if (!selectedPackage) {
            showAlert('Please select a package', 'error');
            isValid = false;
        }

        // Validate event type selection
        const eventTypeSelect = form.querySelector('#eventType');
        if (!eventTypeSelect.value) {
            eventTypeSelect.classList.add('is-invalid');
            showAlert('Please select an event type', 'error');
            isValid = false;
        } else {
            eventTypeSelect.classList.remove('is-invalid');
            eventTypeSelect.classList.add('is-valid');
        }

        if (!isValid) {
            showAlert('Please fill in all required fields', 'error');
        }

        return isValid;
    }

    function showAlert(message, type = 'info') {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show`;
        alert.style.position = 'fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.style.minWidth = '300px';
        
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    // Real-time validation
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required')) {
                if (this.tagName === 'SELECT') {
                    // Handle select dropdown validation
                    if (!this.value) {
                        this.classList.add('is-invalid');
                        this.classList.remove('is-valid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                } else {
                    // Handle text input validation
                    if (!this.value.trim()) {
                        this.classList.add('is-invalid');
                        this.classList.remove('is-valid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                }
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        // Handle change event for select elements
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                if (this.classList.contains('is-invalid') && this.value) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        }
    });

    // Time validation (end time should be after start time)
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    
    if (startTimeInput && endTimeInput) {
        function validateTimeRange() {
            const startTime = startTimeInput.value;
            const endTime = endTimeInput.value;
            
            if (startTime && endTime) {
                if (endTime <= startTime) {
                    endTimeInput.classList.add('is-invalid');
                    endTimeInput.classList.remove('is-valid');
                    showAlert('End time must be after start time', 'error');
                } else {
                    endTimeInput.classList.remove('is-invalid');
                    endTimeInput.classList.add('is-valid');
                }
            }
        }
        
        startTimeInput.addEventListener('change', validateTimeRange);
        endTimeInput.addEventListener('change', validateTimeRange);
    }

    // Date validation (event date should be in the future)
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        eventDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
                showAlert('Event date must be in the future', 'error');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    }
});