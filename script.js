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