// --- Mobile Menu Toggle Logic ---
        const menu = document.querySelector('#mobile-menu');
        const menuLinks = document.querySelector('.nav-links');

        menu.addEventListener('click', () => {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });

        menuLinks.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menu.classList.remove('is-active');
                menuLinks.classList.remove('active');
            }
        });

        // --- Scroll Spy & Smooth Scroll ---
        const sections = document.querySelectorAll('section');
        const navLi = document.querySelectorAll('nav .container ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLi.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${current}`) {
                    a.classList.add('active');
                }
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // --- Scroll Reveal Animation ---
        function revealElements() {
            const reveals = document.querySelectorAll('.reveal');
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;

                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        }
        window.addEventListener('scroll', revealElements);
        revealElements(); // Trigger on load

        // --- Dynamic Typing Effect ---
        const typingText = document.querySelector('.typing-text');
        const roles = [
            "Senior Data Analyst", 
            "Manufacturing Analytics Expert", 
            "Data-Driven Problem Solver",
            "Process Optimization Specialist"
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            // Typing speeds
            let typeSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing effect on load
        setTimeout(type, 1000);
