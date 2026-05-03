/* Navigation Toggle */
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

if (navToggle && nav) {
    // Toggle navigation when clicking hamburger button
    navToggle.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        nav.classList.toggle("show");
    });

    // Close navigation when clicking on a navigation link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });

    // Close navigation when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('show') &&
            !nav.contains(e.target) &&
            !navToggle.contains(e.target)) {
            nav.classList.remove('show');
        }
    });
}

/* Hero Slider Logic */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlideIndex = 0;
let slideInterval;

if (slides.length > 0) {
    // Auto-advance slides
    function startSlideShow() {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    // Change slide function
    function changeSlide(direction) {
        if (slides.length === 0) return;
        slides[currentSlideIndex].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.remove('active');
        }

        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;

        slides[currentSlideIndex].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.add('active');
        }

        // Reset interval when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Go to specific slide
    function currentSlide(index) {
        slides[currentSlideIndex].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.remove('active');
        }

        currentSlideIndex = index;

        slides[currentSlideIndex].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlideIndex].classList.add('active');
        }

        // Reset interval when manually changing slides
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Make functions global so they can be called from HTML onclick
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;

    // Start the slideshow
    startSlideShow();
}

/* Lyntica.com Popup Logic */
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("lyntica-popup");
    const closeBtn = document.getElementById("closePopup");

    if (popup) {
        // Check if user has already dismissed the popup in this session
        const isDismissed = localStorage.getItem("lynticaPopupDismissed");

        if (!isDismissed) {
            // Show popup after 5 seconds
            setTimeout(() => {
                popup.classList.add("show");
            }, 5000);
        }

        // Close popup logic
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popup.classList.remove("show");
                // Remember dismissal for the session
                localStorage.setItem("lynticaPopupDismissed", "true");
            });
        }

        // Close when clicking outside content
        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.classList.remove("show");
                localStorage.setItem("lynticaPopupDismissed", "true");
            }
        });
    }
});
