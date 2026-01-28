/**
 * ULTRIQ TRA — Official Engine 2026
 * Czysty JS dla wysokiej wydajności
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. NAWIGACJA I MENU MOBILNE ---
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  const toggleMenu = () => {
      burger.classList.toggle('burger--active');
      mobileMenu.classList.toggle('mobile-menu--open');
      // Blokada scrolla przy otwartym menu
      document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
  };

  if (burger) {
      burger.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (mobileMenu.classList.contains('mobile-menu--open')) toggleMenu();
      });
  });

  // Zmiana headera przy scrollu
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('header--scrolled');
      } else {
          header.classList.remove('header--scrolled');
      }
  });


  // --- 2. ANIMACJA POJAWIANIA SIĘ (SCROLL REVEAL) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('reveal--active');
              revealObserver.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- 3. INTERAKTYWNA SEKCJA HERO (PARALLAX) ---
  const hero = document.querySelector('.hero');
  const heroVisual = document.querySelector('.hero__visual');

  if (hero && heroVisual && window.innerWidth > 1024) {
      hero.addEventListener('mousemove', (e) => {
          const x = (window.innerWidth / 2 - e.pageX) / 45;
          const y = (window.innerHeight / 2 - e.pageY) / 45;
          heroVisual.style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
  }


  // --- 4. PŁYNNY SCROLL DO KOTWIC ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          e.preventDefault();
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              const headerOffset = 80;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });


  // --- 5. FORMULARZ KONTAKTOWY I CAPTCHA ---
  const contactForm = document.getElementById('main-form');
  if (contactForm) {
      const phoneInput = document.getElementById('phone-input');
      const captchaQuestion = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha-answer');
      let captchaResult;

      // Generowanie prostego przykładu matematycznego
      const generateCaptcha = () => {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          captchaResult = a + b;
          captchaQuestion.textContent = `${a} + ${b}`;
      };

      generateCaptcha();

      // Walidacja telefonu (tylko cyfry)
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
      });

      // Obsługa wysyłki (Mock AJAX)
      contactForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const successMsg = document.getElementById('form-success');
          const errorMsg = document.getElementById('form-error');
          const submitBtn = document.getElementById('submit-btn');

          // Reset komunikatów
          successMsg.style.display = 'none';
          errorMsg.style.display = 'none';

          // Sprawdzenie captcha
          if (parseInt(captchaInput.value) !== captchaResult) {
              errorMsg.textContent = 'Błędny wynik captcha. Spróbuj ponownie.';
              errorMsg.style.display = 'block';
              generateCaptcha();
              captchaInput.value = '';
              return;
          }

          // Imitacja ładowania
          const originalBtnText = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>Wysyłanie...</span>';

          setTimeout(() => {
              // Ukrywamy przycisk, pokazujemy sukces
              submitBtn.style.display = 'none';
              successMsg.style.display = 'block';
              contactForm.reset();
              console.log("Dane formularza wysłane pomyślnie (imitacja)");
          }, 1800);
      });
  }


  // --- 6. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const cookieAccept = document.getElementById('cookie-accept');

  if (cookiePopup && cookieAccept) {
      // Sprawdzamy, czy zgoda została już udzielona
      if (!localStorage.getItem('ultriq_cookies_accepted')) {
          setTimeout(() => {
              cookiePopup.classList.add('cookie-popup--show');
          }, 3000);
      }

      cookieAccept.addEventListener('click', () => {
          localStorage.setItem('ultriq_cookies_accepted', 'true');
          cookiePopup.classList.remove('cookie-popup--show');
      });
  }

});