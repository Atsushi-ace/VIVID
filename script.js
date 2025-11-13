// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderDotsContainer = document.getElementById('sliderDots');

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderDotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
}

// Navigation buttons
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

// Auto-advance slides
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Menu Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Page Top Button
const pageTopBtn = document.getElementById('pageTop');

if (pageTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            pageTopBtn.classList.add('visible');
        } else {
            pageTopBtn.classList.remove('visible');
        }
    });

    pageTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.topic-card, .flavor-card, .menu-item, .interior-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add animation delay to cards
document.querySelectorAll('.topic-card').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.flavor-card').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
});

// Sister stores tabs (simple toggle for demo)
const storeTabs = document.querySelectorAll('.store-tab');
storeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        storeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Beverage Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Category toggles
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const categoryId = header.getAttribute('data-category');
            const content = document.getElementById(categoryId);
            const icon = header.querySelector('.toggle-icon');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                header.classList.remove('active');
            } else {
                content.classList.add('active');
                header.classList.add('active');
            }
        });
    });

    // Subcategory toggles
    const subcategoryHeaders = document.querySelectorAll('.subcategory-header');
    subcategoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const subcategoryId = header.getAttribute('data-subcategory');
            const content = document.getElementById(subcategoryId);
            const icon = header.querySelector('.toggle-icon');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                header.classList.remove('active');
            } else {
                content.classList.add('active');
                header.classList.add('active');
            }
        });
    });
});

// Topics Slider
let currentTopicsSlide = 0;
const topicsSlider = document.querySelector('.topics-slider');
const topicsCards = document.querySelectorAll('.topic-card');
const topicsPrevBtn = document.getElementById('topicsPrevBtn');
const topicsNextBtn = document.getElementById('topicsNextBtn');
const topicsDotsContainer = document.getElementById('topicsDots');

if (topicsSlider && topicsCards.length > 0) {
    // Create dots
    topicsCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('topics-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTopicsSlide(index));
        topicsDotsContainer.appendChild(dot);
    });

    const topicsDots = document.querySelectorAll('.topics-dot');

    function showTopicsSlide(n) {
        topicsDots.forEach(dot => dot.classList.remove('active'));
        topicsDots[n].classList.add('active');
        
        const slideWidth = topicsCards[0].offsetWidth + 32; // card width + gap
        topicsSlider.style.transform = `translateX(-${n * slideWidth}px)`;
        currentTopicsSlide = n;
    }

    function nextTopicsSlide() {
        const nextSlide = (currentTopicsSlide + 1) % topicsCards.length;
        showTopicsSlide(nextSlide);
    }

    function prevTopicsSlide() {
        const prevSlide = (currentTopicsSlide - 1 + topicsCards.length) % topicsCards.length;
        showTopicsSlide(prevSlide);
    }

    function goToTopicsSlide(n) {
        showTopicsSlide(n);
    }

    // Navigation buttons
    if (topicsPrevBtn) {
        topicsPrevBtn.addEventListener('click', prevTopicsSlide);
    }

    if (topicsNextBtn) {
        topicsNextBtn.addEventListener('click', nextTopicsSlide);
    }

    // Auto-advance topics slides
    let topicsSlideInterval = setInterval(nextTopicsSlide, 4000);

    // Pause auto-advance on hover
    const topicsSliderContainer = document.querySelector('.topics-slider-container');
    if (topicsSliderContainer) {
        topicsSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(topicsSlideInterval);
        });

        topicsSliderContainer.addEventListener('mouseleave', () => {
            topicsSlideInterval = setInterval(nextTopicsSlide, 4000);
        });
    }
}

// Brand Tabs for Flavors Page
const brandTabs = document.querySelectorAll('.brand-tab');
const brandContents = document.querySelectorAll('.brand-content');

brandTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetBrand = tab.getAttribute('data-brand');
        
        // Remove active class from all tabs and contents
        brandTabs.forEach(t => t.classList.remove('active'));
        brandContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(targetBrand);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

console.log('Mazaj Tokyo - Website loaded successfully! 🌿');
