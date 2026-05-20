// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentSlide = 0;

    // Function to change slide
    function showSlide(index) {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Calculate next index loop
        currentSlide = (index + slides.length) % slides.length;
        
        // Add active class to the target slide
        slides[currentSlide].classList.add('active');
    }

    // Event Listeners for buttons
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });

        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }

    // Optional: Auto play carousel every 5 seconds
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
});

// --- FORM VALIDATION LOGIC (NO REGEX) ---
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('clanRegisterForm');
    const errorContainer = document.getElementById('errorContainer');
    const successContainer = document.getElementById('successContainer');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            // Stop form submission behavior
            event.preventDefault();

            // Clear previous alert states
            errorContainer.style.display = 'none';
            errorContainer.innerHTML = '';
            successContainer.style.display = 'none';
            successContainer.innerText = '';

            // Fetch input values and trim white space
            const nameValue = document.getElementById('fullName').value.trim();
            const emailValue = document.getElementById('emailAddress').value.trim();
            const ageValue = document.getElementById('userAge').value;
            const favTroopValue = document.getElementById('favTroop').value;
            const reasonValue = document.getElementById('joinReason').value.trim();
            
            // Handle Radio input value fetch
            const genderOptions = document.getElementsByName('gender');
            let genderValue = '';
            for (let i = 0; i < genderOptions.length; i++) {
                if (genderOptions[i].checked) {
                    genderValue = genderOptions[i].value;
                    break;
                }
            }

            // Array to record validation error logs
            let errorLogs = [];

            // 1. Validation for Name (Required & Character Length)
            if (nameValue === '') {
                errorLogs.push('Full Name field cannot be left blank.');
            } else if (nameValue.length < 3) {
                errorLogs.push('Full Name must consist of at least 3 characters.');
            }

            // 2. Pure JavaScript Email Validation (Manual String Checking - NO REGEX)
            if (emailValue === '') {
                errorLogs.push('Email Address field cannot be left blank.');
            } else {
                const atSignIndex = emailValue.indexOf('@');
                const lastDotIndex = emailValue.lastIndexOf('.');

                // Check basic positional rules of '@' and '.' signs
                if (atSignIndex < 1 || lastDotIndex === -1 || lastDotIndex <= atSignIndex + 1 || lastDotIndex === emailValue.length - 1) {
                    errorLogs.push('Please enter a valid email format (e.g., player@domain.com).');
                }
            }

            // 3. Validation for Gender selection
            if (genderValue === '') {
                errorLogs.push('Please select your gender identity.');
            }

            // 4. Validation for Age Range (Anti-Negative Check)
            if (ageValue === '') {
                errorLogs.push('Age field cannot be left blank.');
            } else {
                const numericAge = parseInt(ageValue, 10);
                if (numericAge < 0) {
                    errorLogs.push('Age cannot be a negative value.');
                } else if (numericAge < 10 || numericAge > 100) {
                    errorLogs.push('Age requirement must sit comfortably between 10 and 100 years old.');
                }
            }

            // 5. Validation for Dropdown selection
            if (favTroopValue === '') {
                errorLogs.push('Please select one favorite Dark Troop from the option archives.');
            }

            // 6. Validation for Reason to Join
            if (reasonValue === '') {
                errorLogs.push('Please write a short reason regarding why you want to join our clan.');
            }

            // Check final validation result
            if (errorLogs.length > 0) {
                // If errors exist, render them inside a bulleted list layout
                let alertHtml = '<strong>Registration failed due to the following reasons:</strong><ul style="margin-top: 5px; padding-left: 20px;">';
                for (let j = 0; j < errorLogs.length; j++) {
                    alertHtml += '<li>' + errorLogs[j] + '</li>';
                }
                alertHtml += '</ul>';
                
                errorContainer.innerHTML = alertHtml;
                errorContainer.style.display = 'block';
                
                // Scroll page smoothly to error alerts banner
                errorContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If every input passes validation checkpoints successfully
                successContainer.innerText = 'Success! Your clan registration application has been submitted successfully.';
                successContainer.style.display = 'block';
                
                // Reset form fields completely
                registrationForm.reset();
                successContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});