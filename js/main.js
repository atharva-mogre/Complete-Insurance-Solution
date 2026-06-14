document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Sticky Navbar
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Mobile Hamburger Menu
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            navCta.classList.toggle('nav-active');
        });
        
        // Close menu when a link is clicked
        const navItems = document.querySelectorAll('.nav-links a, .nav-cta a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                navCta.classList.remove('nav-active');
            });
        });
    }

    /* ==========================================================================
       Animated Counters (Facts & Figures)
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');
    let started = false;

    const startCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            // Determine increment step based on target size
            const increment = target / 50; 
            
            const updateCounter = () => {
                const c = +counter.innerText;
                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 40);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
        });
    };

    // Intersection Observer to trigger counting when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started) {
            startCounters();
            started = true;
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    /* ==========================================================================
       Felicitation Gallery Carousel
       ========================================================================== */
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    
    if (slides.length > 0) {
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        let autoPlayInterval;

        // Arrange the slides next to one another
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide, targetIndex) => {
            if (!targetSlide) return;
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentIndex = targetIndex;
        };

        // Manual Navigation
        const moveToNextSlide = () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            moveToSlide(track, slides[currentIndex], slides[nextIndex], nextIndex);
        };

        const moveToPrevSlide = () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            moveToSlide(track, slides[currentIndex], slides[prevIndex], prevIndex);
        };

        nextButton.addEventListener('click', moveToNextSlide);
        prevButton.addEventListener('click', moveToPrevSlide);

        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                moveToPrevSlide();
            } else if (e.key === 'ArrowRight') {
                moveToNextSlide();
            }
        });

        // Handle window resize for carousel width
        window.addEventListener('resize', () => {
            const newSlideWidth = slides[0].getBoundingClientRect().width;
            slides.forEach((slide, index) => {
                slide.style.left = newSlideWidth * index + 'px';
            });
            track.style.transition = 'none';
            track.style.transform = 'translateX(-' + slides[currentIndex].style.left + ')';
            // Force reflow
            void track.offsetWidth;
            track.style.transition = 'transform 0.5s ease-in-out';
        });
    }

    /* ==========================================================================
       Contact Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                Name: document.getElementById('name').value,
                Email: document.getElementById('email').value,
                Phone: document.getElementById('phone').value,
                InsuranceType: document.getElementById('insuranceType').value,
                Message: document.getElementById('message').value
            };

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            formMessage.innerText = '';
            
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    formMessage.innerText = 'Thank you! Your message has been sent successfully.';
                    formMessage.style.color = 'green';
                    contactForm.reset();
                } else {
                    formMessage.innerText = data.error || 'Failed to send message. Please try again.';
                    formMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Submission error:', error);
                formMessage.innerText = 'An error occurred. Please check your connection and try again.';
                formMessage.style.color = 'red';
            } finally {
                submitBtn.innerText = 'Send Message';
                submitBtn.disabled = false;
            }
        });
    }

    /* ==========================================================================
       Interactive Star Rating Logic
       ========================================================================== */
    const stars = document.querySelectorAll('.star-rating .star');
    const ratingInput = document.getElementById('reviewRating');
    let currentRating = 0;

    if (stars.length > 0) {
        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseenter', function() {
                const hoverValue = parseInt(this.getAttribute('data-value'));
                stars.forEach(s => {
                    if (parseInt(s.getAttribute('data-value')) <= hoverValue) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            // Remove hover effect when leaving the star
            star.addEventListener('mouseleave', function() {
                stars.forEach(s => s.classList.remove('hover'));
            });

            // Click effect to lock in rating
            star.addEventListener('click', function() {
                currentRating = parseInt(this.getAttribute('data-value'));
                ratingInput.value = currentRating;
                
                stars.forEach(s => {
                    if (parseInt(s.getAttribute('data-value')) <= currentRating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });

        // Ensure hover is cleared when leaving the container
        const starContainer = document.getElementById('starRating');
        if (starContainer) {
            starContainer.addEventListener('mouseleave', () => {
                stars.forEach(s => s.classList.remove('hover'));
            });
        }
    }

    /* ==========================================================================
       Review Form Submission
       ========================================================================== */
    const reviewForm = document.getElementById('reviewForm');
    const reviewFormMessage = document.getElementById('reviewFormMessage');
    const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!ratingInput.value) {
                reviewFormMessage.innerText = 'Please select a star rating.';
                reviewFormMessage.style.color = 'red';
                return;
            }
            
            const formData = {
                Type: 'Review',
                Name: document.getElementById('reviewName').value,
                Email: document.getElementById('reviewEmail').value,
                Rating: ratingInput.value,
                Message: document.getElementById('reviewText').value
            };

            reviewSubmitBtn.innerText = 'Submitting...';
            reviewSubmitBtn.disabled = true;
            reviewFormMessage.innerText = '';
            
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    reviewFormMessage.innerText = 'Thank you for your feedback!';
                    reviewFormMessage.style.color = 'green';
                    reviewForm.reset();
                    currentRating = 0;
                    ratingInput.value = '';
                    stars.forEach(s => s.classList.remove('active', 'hover'));
                } else {
                    reviewFormMessage.innerText = data.error || 'Failed to submit review. Please try again.';
                    reviewFormMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Submission error:', error);
                reviewFormMessage.innerText = 'An error occurred. Please check your connection and try again.';
                reviewFormMessage.style.color = 'red';
            } finally {
                reviewSubmitBtn.innerText = 'Submit Review';
                reviewSubmitBtn.disabled = false;
            }
        });
    }
});
