// ==========================================
// 1. CAROUSEL FUNCTIONALITY
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentSlide = 0;

    // JIKA TIDAK ADA SLIDE DI HALAMAN INI, BERHENTI DI SINI (AGAR TIDAK ERROR DI REGISTER.HTML)
    if (slides.length === 0) {
        console.warn("Carousel slides tidak ditemukan di halaman ini. Melewati fungsi carousel.");
        return; 
    }

    // Function to change slide
    function showSlide(index) {
        // Hapus kelas aktif dari slide saat ini
        slides[currentSlide].classList.remove('active');
        
        // Hitung loop indeks berikutnya
        currentSlide = (index + slides.length) % slides.length;
        
        // Tambahkan kelas aktif ke slide target
        slides[currentSlide].classList.add('active');
    }

    // Event Listeners untuk tombol navigasi carousel
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });

        prevBtn.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }

    // Auto play carousel setiap 5 detik
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
});

// ==========================================
// 2. MODERN STACKABLE TOAST HELPER FUNCTION
// ==========================================
// Fungsi mandiri untuk membuat dan menampilkan box notifikasi melayang
function showToast(message, type = 'error') {
    const container = document.getElementById('toast-container');

    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-box ${type}`;
    toast.innerText = message;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide'); // Memicu animasi fade-out di CSS
        
        // Hapus elemen dari DOM setelah animasi transisi CSS selesai (400ms)
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

// ==========================================
// 3. FORM VALIDATION LOGIC (NO REGEX)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('clanRegisterForm');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            // Stop form submission behavior (Mencegah Error 405 di GitHub Pages)
            event.preventDefault();

            // Fetch input values and trim white space
            const nameValue = document.getElementById('fullName').value.trim();
            const emailValue = document.getElementById('emailAddress').value.trim();
            const ageValue = document.getElementById('userAge').value;
            const favTroopValue = document.getElementById('favTroop').value;
            const reasonValue = document.getElementById('joinReason').value.trim();
            
            // Handle radio input value fetch
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

            // 2. Email validation (Manual String Checking - NO REGEX)
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

            // 4. Validation for Age range (Anti-Negative Check)
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

            // Toast Triggering Logic
            if (errorLogs.length > 0) {
                // Jika ada error, looping array dan tembak masing-masing error menjadi 1 kotak toast tersendiri
                for (let j = 0; j < errorLogs.length; j++) {
                    showToast(errorLogs[j], 'error');
                }
            } else {
                // Jika semua input lolos verifikasi, tembak toast sukses berwarna hijau neon
                showToast('Success! Your clan registration application has been submitted successfully.', 'success');
                
                // Reset form fields secara total
                registrationForm.reset();
            }
        });
    }
});
