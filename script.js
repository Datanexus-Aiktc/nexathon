/* Nexathon — generated homepage — simple vanilla HTML/CSS/JS */

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- FAQ ACCORDION ---
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const answer = document.getElementById(toggle.getAttribute('aria-controls'));
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', !isExpanded);
            answer.hidden = isExpanded;
        });
    });

    // --- SMOOTH SCROLLING FOR ANCHOR LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- REVEAL ON SCROLL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        root: null, // relative to the viewport
        threshold: 0.1 // 10% of the item must be visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- TIMELINE STATUS AUTO SWITCH ---
    function setStatus(el, state) {
      el.classList.remove('online', 'offline', 'ended');
      el.classList.add(state);

      if (state === 'online') {
        el.innerHTML = '<span class="dot"></span> Online';
      } else if (state === 'offline') {
        el.innerHTML = '<span class="dot"></span> Offline';
      } else {
        el.innerHTML = '<span class="dot"></span> Ended';
      }
    }

    const timelineCards = document.querySelectorAll('.timeline-card');
    let latestOnlineIndex = -1;

    timelineCards.forEach((card, index) => {
      const dateStr = card.getAttribute('data-date');
      if (!dateStr) return;

      const eventDate = new Date(dateStr);
      const now = new Date();
      const status = card.querySelector('.status-pill');

      if (now < eventDate) {
        setStatus(status, 'offline');
      } else {
        setStatus(status, 'online');
        latestOnlineIndex = index; // track the most recent active event
      }
    });

    // Mark all earlier than latest as ended
    if (latestOnlineIndex > -1) {
      for (let i = 0; i < latestOnlineIndex; i++) {
        const prevStatus = timelineCards[i].querySelector('.status-pill');
        setStatus(prevStatus, 'ended');
      }
    }


});

// --- DOMAINS INTERACTIVITY - COMPLETE MOBILE FIX ---
function initDomains() {
    const domainCards = document.querySelectorAll('.domain-card');
    const domainModal = document.getElementById('domain-modal');
    const modalTitle = document.getElementById('modal-domain-title');
    const domainContent = document.getElementById('domain-content');
    const closeModal = document.getElementById('close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    const domainDescriptions = {
        healthcare: {
            title: "Healthcare Domain",
            description: "Revolutionize healthcare with data-driven solutions that improve patient care, streamline operations, and enhance medical research.",
            features: [
                "<strong>Medical Imaging:</strong> AI-assisted analysis of X-rays, MRIs, and CT scans",
                "<strong>Predictive Care:</strong> Disease forecasting and early detection models",
                "<strong>Personalized Medicine:</strong> Data-driven treatment recommendations",
                "<strong>Healthcare Analytics:</strong> Optimizing hospital workflows and resources"
            ]
        },
        fintech: {
            title: "Fintech Domain",
            description: "Transform finance with AI and technology. Build solutions for secure transactions, smarter investments, and inclusive financial services.",
            features: [
                "<strong>Fraud Detection:</strong> Real-time anomaly detection in transactions",
                "<strong>Trading Algorithms:</strong> AI-driven investment strategies",
                "<strong>Credit Scoring:</strong> Using alternative and behavioral data",
                "<strong>Blockchain:</strong> Secure, transparent digital financial systems"
            ]
        },
        education: {
            title: "Education Domain",
            description: "Reimagine learning using data and AI to make education more personalized, accessible, and impactful for all learners.",
            features: [
                "<strong>Adaptive Learning:</strong> AI-powered personalized education platforms",
                "<strong>Learning Analytics:</strong> Student performance prediction & insights",
                "<strong>Virtual Classrooms:</strong> Enhanced digital and interactive learning",
                "<strong>EdTech Solutions:</strong> Bridging gaps in global education access"
            ]
        },
        agriculture: {
            title: "Agriculture Domain",
            description: "Harness technology to make agriculture smarter, more sustainable, and resilient to climate challenges.",
            features: [
                "<strong>Precision Farming:</strong> Data-driven crop monitoring and yield prediction",
                "<strong>Smart Irrigation:</strong> Optimizing water use with IoT and sensors",
                "<strong>Pest Detection:</strong> AI-based plant disease and pest recognition",
                "<strong>Sustainable Practices:</strong> Reducing waste and increasing efficiency"
            ]
        },
        innovation: {
            title: "Open Innovation Domain",
            description: "Think beyond boundaries. Design groundbreaking, cross-disciplinary solutions that address the world's toughest challenges.",
            features: [
                "<strong>Sustainability:</strong> Green energy and eco-innovation projects",
                "<strong>Smart Cities:</strong> Data solutions for traffic, waste, and urban living",
                "<strong>Social Impact:</strong> Tech for community development and equality",
                "<strong>Future Tech:</strong> Exploring unexplored AI, IoT, and robotics ideas"
            ]
        }
    };

    // Enhanced click event with animation
    domainCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const domain = this.getAttribute('data-domain');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                showDomainInfo(domain);
            }, 150);
        });
    });

    // Smooth modal controls
    closeModal.addEventListener('click', closeDomainModal);
    modalOverlay.addEventListener('click', closeDomainModal);

    // Enhanced keyboard controls
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && domainModal.classList.contains('active')) {
            closeDomainModal();
        }
    });

    function showDomainInfo(domain) {
        const info = domainDescriptions[domain];
        if (!info) return;

        // Add body class to prevent background scrolling
        document.body.classList.add('domain-modal-open');
        
        // Animate modal appearance
        domainModal.style.display = 'flex';
        setTimeout(() => {
            domainModal.classList.add('active');
        }, 10);

        // Set content
        modalTitle.textContent = info.title;
        domainContent.innerHTML = `
            <div class="domain-description">${info.description}</div>
            <h4 style="color: var(--tertiary); text-align: center; margin-bottom: var(--space-md);">Key Focus Areas</h4>
            <ul class="domain-features">
                ${info.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div style="text-align:center; margin-top: var(--space-lg);">
                <a href="https://forms.gle/ZiBoX2UBFCsjp9uf7" class="btn btn-primary">Register Now</a>
            </div>
        `;

        // Force redraw for iOS
        setTimeout(() => {
            const modalBody = document.querySelector('.modal-body');
            if (modalBody) {
                modalBody.style.overflowY = 'auto';
            }
        }, 100);
    }

    function closeDomainModal() {
        domainModal.classList.remove('active');
        
        setTimeout(() => {
            domainModal.style.display = 'none';
            
            // Remove body class to restore scrolling
            document.body.classList.remove('domain-modal-open');
        }, 300);
    }

    // Touch event handler for better mobile experience
    let startY = 0;
    let initialScroll = 0;

    domainModal.addEventListener('touchstart', function(e) {
        const modalBody = this.querySelector('.modal-body');
        if (modalBody) {
            startY = e.touches[0].clientY;
            initialScroll = modalBody.scrollTop;
        }
    }, { passive: true });

    domainModal.addEventListener('touchmove', function(e) {
        const modalBody = this.querySelector('.modal-body');
        if (!modalBody) return;

        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;

        // If at top and pulling down, or at bottom and pulling up, allow page scroll
        if ((modalBody.scrollTop === 0 && deltaY > 0) || 
            (modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight && deltaY < 0)) {
            e.stopPropagation();
        }
    }, { passive: false });
}

document.addEventListener("DOMContentLoaded", () => {
    initDomains();
});
