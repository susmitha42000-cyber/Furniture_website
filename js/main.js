let testimonialIndex = 0;
let heroSlideIndex = 0;
let heroSliderTimer = null;
let aosResizeTimer = null;
const AUTO_REVEAL_SELECTORS = [
  '.hero-home-copy .eyebrow',
  '.hero-home-copy h1',
  '.hero-home-copy p',
  '.hero-actions',
  '.hero-slider-ui',
  '.page-banner .container > *',
  '.footer-grid > *',
  '.best-seller-points > *',
  '.newsletter-form > *',
  '.auth-form-panel > *',
  '.auth-form-panel-signup > *',
];
const SHADOW_REVEAL_SELECTORS = [
  '.category-card',
  '.product-card',
  '.value-card',
  '.service-card',
  '.team-card',
  '.info-card',
  '.contact-card',
  '.contact-form',
  '.sidebar-card',
  '.shop-sidebar .filter-card',
  '.map-card',
  '.faq-card',
  '.auth-card',
  '.newsletter-panel',
  '.summary-card',
  '.cart-item-card',
  '.drawer-panel',
  '.testimonial-card',
  '.page-card',
  '.section-heading',
  '.best-seller-media',
  '.best-seller-copy',
  '.site-footer .footer-grid > *',
  '.hero-home-copy',
  '.hero-slider-controls',
  '.dashboard-sidebar-panel',
  '.dashboard-panel',
  '.dashboard-hero-card',
  '.dashboard-detail-rail',
];

function renderShell() {
  const headerTarget = document.getElementById('siteHeader');
  const footerTarget = document.getElementById('siteFooter');
  const page = document.body.dataset.page;
  const homeLink = APP.root === '.' ? 'index.html' : '../index.html';
  const links = [
    { key: 'home', label: 'Home', href: homeLink },
    { key: 'shop', label: 'Shop', href: `${APP.root}/pages/shop.html` },
    { key: 'about', label: 'About', href: `${APP.root}/pages/about.html` },
    { key: 'services', label: 'Services', href: `${APP.root}/pages/services.html` },
    { key: 'blog', label: 'Blog', href: `${APP.root}/pages/blog.html` },
    { key: 'contact', label: 'Contact', href: `${APP.root}/pages/contact.html` },
  ];

  if (headerTarget) {
    headerTarget.innerHTML = `
      <div class="site-loader" id="siteLoader">
        <div class="loader-mark">
          <div class="loader-ring"></div>
          <img class="brand-logo brand-logo-loader" src="${APP.logo}" alt="${APP.siteName} logo">
        </div>
      </div>

      <header class="site-header scroll-reveal" id="stickyHeader">
        <div class="container">
          <div class="nav-shell">
            <a class="brand" href="${homeLink}">
              <img class="brand-logo brand-logo-header" src="${APP.logo}" alt="${APP.siteName} logo">
            </a>

            <ul class="nav-links">
              ${links.map((link) => `<li><a class="${page === link.key ? 'is-active' : ''}" href="${link.href}">${link.label}</a></li>`).join('')}
            </ul>

            <div class="nav-actions">
              <button class="icon-button" type="button" onclick="openDrawer('wishlistDrawer')" aria-label="Open wishlist">
                <i class="ri-heart-3-line"></i>
                <span class="count-badge" id="wishlistCount">0</span>
              </button>
              <button class="icon-button" type="button" onclick="openDrawer('cartDrawer')" aria-label="Open cart">
                <i class="ri-shopping-bag-3-line"></i>
                <span class="count-badge" id="cartCount">0</span>
              </button>
              <div class="auth-links">
                <a class="auth-link" href="${APP.root}/pages/login.html" data-login-loader-link>Login</a>
                <a class="auth-link signup" href="${APP.root}/pages/signup.html">Signup</a>
              </div>
              <button class="menu-toggle" type="button" id="menuToggle" aria-label="Open menu">
                <i class="ri-menu-3-line"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <aside class="mobile-menu" id="mobileMenu">
        <nav>
          ${links.map((link) => `<a class="${page === link.key ? 'is-active' : ''}" href="${link.href}">${link.label}</a>`).join('')}
          <a href="${APP.root}/pages/login.html" data-login-loader-link>Login</a>
          <a href="${APP.root}/pages/signup.html">Signup</a>
          <a href="${APP.root}/pages/wishlist.html">Wishlist</a>
          <a href="${APP.root}/pages/cart.html">Cart</a>
        </nav>
      </aside>

      <aside class="drawer" id="cartDrawer">
        <div class="drawer-panel">
          <div class="drawer-header">
            <h3>Your Cart</h3>
            <button class="icon-button" type="button" onclick="closeDrawer('cartDrawer')"><i class="ri-close-line"></i></button>
          </div>
          <div class="drawer-body" id="cartDrawerBody"></div>
          <div class="drawer-footer">
            <strong id="cartDrawerTotal">${formatPrice(0)}</strong>
            <a class="button button-primary" href="${APP.root}/pages/cart.html">View Cart</a>
          </div>
        </div>
      </aside>

      <aside class="drawer" id="wishlistDrawer">
        <div class="drawer-panel">
          <div class="drawer-header">
            <h3>Your Wishlist</h3>
            <button class="icon-button" type="button" onclick="closeDrawer('wishlistDrawer')"><i class="ri-close-line"></i></button>
          </div>
          <div class="drawer-body" id="wishlistDrawerBody"></div>
          <div class="drawer-footer">
            <span>Saved favorites</span>
            <a class="button button-secondary" href="${APP.root}/pages/wishlist.html">Open Wishlist</a>
          </div>
        </div>
      </aside>

      <div class="toast-stack" id="toastStack"></div>
      <button class="scroll-top" id="scrollTopButton" type="button" aria-label="Scroll to top">
        <i class="ri-arrow-up-line"></i>
      </button>
      <nav class="bottom-nav">
        <a class="${page === 'home' ? 'is-active' : ''}" href="${homeLink}"><i class="ri-home-5-line"></i><span>Home</span></a>
        <a class="${page === 'shop' || page === 'details' ? 'is-active' : ''}" href="${APP.root}/pages/shop.html"><i class="ri-store-2-line"></i><span>Shop</span></a>
        <a class="${page === 'wishlist' ? 'is-active' : ''}" href="${APP.root}/pages/wishlist.html"><i class="ri-heart-3-line"></i><span>Wishlist</span></a>
        <a class="${page === 'cart' ? 'is-active' : ''}" href="${APP.root}/pages/cart.html"><i class="ri-shopping-bag-3-line"></i><span>Cart</span></a>
        <a class="${page === 'login' || page === 'signup' || page === 'dashboard' ? 'is-active' : ''}" href="${APP.root}/pages/login.html"><i class="ri-user-3-line"></i><span>Account</span></a>
      </nav>
    `;
  }

  if (footerTarget) {
    footerTarget.innerHTML = `
      <footer class="site-footer scroll-reveal">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a class="brand" href="${homeLink}" aria-label="Go to home page">
                <img class="brand-logo brand-logo-footer" src="${APP.logo}" alt="${APP.siteName} logo">
              </a>
              <p>Luxury Scandinavian furniture for warm, balanced interiors shaped by timeless materials and elegant simplicity.</p>
              <div class="social-row">
                <a class="icon-button" href="${APP.root}/pages/404.html" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
                <a class="icon-button" href="${APP.root}/pages/404.html" aria-label="Pinterest"><i class="ri-pinterest-line"></i></a>
                <a class="icon-button" href="${APP.root}/pages/404.html" aria-label="Facebook"><i class="ri-facebook-circle-line"></i></a>
                <a class="icon-button" href="${APP.root}/pages/404.html" aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>
              </div>
            </div>
            <div class="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="${homeLink}">Home</a></li>
                <li><a href="${APP.root}/pages/shop.html">Shop</a></li>
                <li><a href="${APP.root}/pages/about.html">About</a></li>
                <li><a href="${APP.root}/pages/services.html">Services</a></li>
                <li><a href="${APP.root}/pages/blog.html">Blog</a></li>
                <li><a href="${APP.root}/pages/contact.html">Contact</a></li>
              </ul>
            </div>
            <div class="footer-links">
              <h3>Services</h3>
              <ul>
                <li><a href="${APP.root}/pages/404.html">Consultation</a></li>
                <li><a href="${APP.root}/pages/404.html">Custom Design</a></li>
                <li><a href="${APP.root}/pages/404.html">Installation</a></li>
                <li><a href="${APP.root}/pages/404.html">Support</a></li>
              </ul>
            </div>
            <div class="footer-meta">
              <h3>Newsletter</h3>
              <form id="footerNewsletterForm" class="footer-newsletter" novalidate>
                <label class="visually-hidden" for="footerNewsletterEmail">Email address</label>
                <input id="footerNewsletterEmail" class="input-field" type="email" name="email" placeholder="Your email address" required>
                <button type="submit" class="button button-primary">Join</button>
              </form>
              <p>hello@lunera-interiors.com</p>
              <p>182 Mercer Street, New York</p>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© 2026 Lunera Furniture. All rights reserved.</span>
            <span>Designed for calm modern living.</span>
          </div>
        </div>
      </footer>
    `;
  }
}

function updateBadgeCounts() {
  const cartCount = document.getElementById('cartCount');
  const wishlistCount = document.getElementById('wishlistCount');
  if (cartCount) cartCount.textContent = String(getCartCount());
  if (wishlistCount) wishlistCount.textContent = String(getWishlistItems().length);
}

function showToast(message, type = 'success') {
  const stack = document.getElementById('toastStack');
  if (!stack) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
}

function openDrawer(id) {
  document.getElementById(id)?.classList.add('is-open');
  document.body.classList.add('drawer-open');
  if (id === 'cartDrawer') renderCartDrawer();
  if (id === 'wishlistDrawer') renderWishlistDrawer();
}

function closeDrawer(id) {
  document.getElementById(id)?.classList.remove('is-open');
  if (!document.querySelector('.drawer.is-open')) {
    document.body.classList.remove('drawer-open');
  }
}

function setupMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', menu.classList.contains('is-open'));
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }
  });
}

function setupHeaderScroll() {
  const header = document.getElementById('stickyHeader');
  const topButton = document.getElementById('scrollTopButton');
  if (!header || !topButton) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    topButton.classList.toggle('is-visible', window.scrollY > 400);
  };

  topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupScrollReveal() {
  refreshAOS();
}

function setupLoader() {
  const loader = document.getElementById('siteLoader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 320);
  });
}

function showLoaderThenNavigate(href, delay = 2000, replace = false) {
  const loader = document.getElementById('siteLoader');
  if (loader) {
    loader.classList.remove('is-hidden');
    loader.setAttribute('aria-hidden', 'false');
  }
  window.setTimeout(() => {
    if (replace) {
      window.location.replace(href);
      return;
    }
    window.location.href = href;
  }, delay);
}

function bindLoaderLinks() {
  document.querySelectorAll('[data-loader-link], [data-login-loader-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      if (link.dataset.loaderLoading === 'true') return;
      link.dataset.loaderLoading = 'true';
      link.setAttribute('aria-disabled', 'true');
      const delay = Number(link.dataset.loaderDelay || 2000);
      showLoaderThenNavigate(link.href, delay);
    });
  });
}

function decorateAOSTargets(root = document) {
  AUTO_REVEAL_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((element) => {
      element.classList.add('scroll-reveal');
    });
  });

  SHADOW_REVEAL_SELECTORS.forEach((selector) => {
    root.querySelectorAll(selector).forEach((element) => {
      element.classList.add('reveal-shadow');
    });
  });
}

function getAOSStaggerDelay(element, step) {
  const staggerParent = element.closest('.value-grid, .service-grid, .product-grid, .blog-grid, .team-grid, .gallery-grid, .contact-info-stack, .dashboard-product-gallery, .dashboard-compact-stats, .stats-grid, .dual-card-grid, .hero-home-copy, .footer-grid, .best-seller-points, .newsletter-form, .page-banner .container');
  if (!staggerParent) return 0;

  const siblings = Array.from(staggerParent.children).filter((child) => child.classList.contains('scroll-reveal'));
  const siblingIndex = siblings.indexOf(element);
  if (siblingIndex < 0) return 0;
  return Math.min(siblingIndex * step, step * 5);
}

function getAOSConfig(element) {
  const isMobile = window.innerWidth < 768;
  const baseDuration = isMobile ? 620 : 820;
  const staggerStep = isMobile ? 45 : 80;
  let animation = 'fade-up';
  let duration = baseDuration;
  let delay = getAOSStaggerDelay(element, staggerStep);

  if (element.matches('.site-header')) {
    animation = 'fade-down';
    duration = 560;
    delay = 40;
  } else if (element.matches('.hero-home-copy .eyebrow')) {
    animation = 'fade-down';
    duration = isMobile ? 560 : 620;
  } else if (element.matches('.hero-home-copy h1')) {
    animation = 'fade-up';
    duration = isMobile ? 620 : 760;
  } else if (element.matches('.hero-home-copy p, .hero-actions, .hero-slider-ui')) {
    animation = isMobile ? 'fade-up' : 'zoom-in-up';
    duration = isMobile ? 600 : 700;
  } else if (element.matches('.site-footer, .newsletter-panel')) {
    animation = 'fade-up';
    duration = baseDuration + 40;
  } else if (element.matches('.page-banner .container, .page-banner .container > *, .section-heading, .footer-grid > *')) {
    animation = 'fade-up';
    duration = isMobile ? 600 : 700;
    delay = 20;
  } else if (element.matches('.best-seller-media, .image-card, .detail-gallery, .contact-map-rich, .map-card')) {
    animation = isMobile ? 'fade-up' : 'fade-right';
  } else if (element.matches('.best-seller-copy, .detail-panel, .contact-form-rich, .faq-card, .blog-intro-card, .blog-cta-card, .shop-toolbar')) {
    animation = isMobile ? 'fade-up' : 'fade-left';
  } else if (element.matches('.best-seller-points > *, .newsletter-form > *, .auth-form-panel > *, .auth-form-panel-signup > *')) {
    animation = 'fade-up';
    duration = isMobile ? 580 : 660;
  } else if (element.matches('.category-card, .product-card, .blog-card, .value-card, .service-card, .team-card, .gallery-card, .testimonial-card, .contact-card-rich')) {
    animation = isMobile ? 'fade-up' : 'zoom-in';
  } else if (element.matches('.info-card')) {
    animation = isMobile ? 'fade-up' : 'flip-left';
    duration = isMobile ? 620 : 760;
  } else if (element.matches('.stats-grid')) {
    animation = 'zoom-out';
    delay = 0;
  } else if (element.matches('.dashboard-app-sidebar')) {
    animation = isMobile ? 'fade-up' : 'fade-right';
    delay = 0;
  } else if (element.matches('.dashboard-detail-rail')) {
    animation = isMobile ? 'fade-up' : 'fade-left';
    delay = 40;
  } else if (element.matches('.dashboard-topbar')) {
    animation = 'fade-down';
    duration = 640;
    delay = 30;
  } else if (element.matches('.dashboard-showcase-card')) {
    animation = 'zoom-in';
    duration = isMobile ? 620 : 760;
    delay = 50;
  } else if (element.matches('.dashboard-chip-row')) {
    animation = 'fade-up';
    duration = 640;
  } else if (element.matches('.dashboard-arrivals, .dashboard-bottom-row, .sidebar-card, .services-process-card')) {
    animation = 'fade-up';
  } else if (element.matches('.dashboard-mini-product, .dashboard-compact-stat')) {
    animation = isMobile ? 'fade-up' : 'zoom-in-up';
    duration = isMobile ? 600 : 720;
  } else if (element.matches('.auth-card, .auth-showcase, .not-found-card')) {
    animation = 'zoom-in';
    duration = 620;
    delay = 20;
  }

  return { animation, duration, delay };
}

function applyAOSAttributes(root = document) {
  decorateAOSTargets(root);
  root.querySelectorAll('.scroll-reveal').forEach((element) => {
    const { animation, duration, delay } = getAOSConfig(element);
    element.dataset.aos = element.dataset.aos || animation;
    element.dataset.aosDelay = element.dataset.aosDelay || String(delay);
    element.dataset.aosDuration = element.dataset.aosDuration || String(duration);
    element.dataset.aosEasing = element.dataset.aosEasing || 'ease-out-cubic';
    element.dataset.aosOnce = element.dataset.aosOnce || 'true';
    element.dataset.aosAnchorPlacement = element.dataset.aosAnchorPlacement || 'top-bottom';

    if (!window.AOS || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-visible');
    }
  });
}

function refreshAOS(root = document) {
  applyAOSAttributes(root);
  if (!window.AOS) return;

  if (!document.body.dataset.aosInitialized) {
    window.AOS.init({
      once: true,
      offset: window.innerWidth < 768 ? 44 : 72,
      duration: window.innerWidth < 768 ? 620 : 820,
      easing: 'ease-out-cubic',
      mirror: false,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      debounceDelay: 50,
      throttleDelay: 80,
    });
    document.body.dataset.aosInitialized = 'true';
    if (!document.body.dataset.aosResizeBound) {
      window.addEventListener('resize', () => {
        window.clearTimeout(aosResizeTimer);
        aosResizeTimer = window.setTimeout(() => refreshAOS(), 140);
      }, { passive: true });
      document.body.dataset.aosResizeBound = 'true';
    }
    return;
  }

  window.AOS.refreshHard();
}

function updateHeroSlider(slides, dots) {
  slides.forEach((slide, index) => {
    const isActive = index === heroSlideIndex;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));

    slide.querySelectorAll('a').forEach((link) => {
      link.tabIndex = isActive ? 0 : -1;
    });
  });

  dots.forEach((dot, index) => {
    const isActive = index === heroSlideIndex;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function moveHeroSlide(step, slides, dots) {
  heroSlideIndex = (heroSlideIndex + step + slides.length) % slides.length;
  updateHeroSlider(slides, dots);
}

function startHeroSlider(slides, dots) {
  if (heroSliderTimer || slides.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  heroSliderTimer = window.setInterval(() => {
    moveHeroSlide(1, slides, dots);
  }, 5000);
}

function stopHeroSlider() {
  if (!heroSliderTimer) return;
  window.clearInterval(heroSliderTimer);
  heroSliderTimer = null;
}

function setupHeroSlider() {
  const hero = document.getElementById('heroHome');
  const dotsContainer = document.getElementById('heroSliderDots');
  const prevButton = document.getElementById('heroPrevButton');
  const nextButton = document.getElementById('heroNextButton');
  const slides = Array.from(document.querySelectorAll('[data-hero-slide]'));

  if (!hero || !dotsContainer || !prevButton || !nextButton || !slides.length) return;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'hero-slider-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => {
      heroSlideIndex = index;
      updateHeroSlider(slides, dots);
      stopHeroSlider();
      startHeroSlider(slides, dots);
    });
    dotsContainer.appendChild(dot);
    return dot;
  });

  prevButton.addEventListener('click', () => {
    moveHeroSlide(-1, slides, dots);
    stopHeroSlider();
    startHeroSlider(slides, dots);
  });

  nextButton.addEventListener('click', () => {
    moveHeroSlide(1, slides, dots);
    stopHeroSlider();
    startHeroSlider(slides, dots);
  });

  hero.addEventListener('mouseenter', stopHeroSlider);
  hero.addEventListener('mouseleave', () => startHeroSlider(slides, dots));
  hero.addEventListener('focusin', stopHeroSlider);
  hero.addEventListener('focusout', () => startHeroSlider(slides, dots));

  updateHeroSlider(slides, dots);
  startHeroSlider(slides, dots);
}

function clearFieldError(field) {
  field.classList.remove('field-error');
  field.removeAttribute('aria-invalid');
  field.removeAttribute('aria-describedby');
  const container = field.closest('.password-field') || field.parentElement;
  const message = container?.parentElement?.querySelector(`.field-error-message[data-error-for="${field.name}"]`)
    || container?.querySelector(`.field-error-message[data-error-for="${field.name}"]`);
  if (message) message.remove();
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.classList.add('field-error');
  field.setAttribute('aria-invalid', 'true');
  const error = document.createElement('p');
  const errorId = `${field.id || field.name}-error`;
  field.setAttribute('aria-describedby', errorId);
  error.id = errorId;
  error.className = 'field-error-message';
  error.dataset.errorFor = field.name;
  error.setAttribute('role', 'alert');
  error.setAttribute('aria-live', 'polite');
  error.textContent = message;
  const container = field.closest('.password-field');
  if (container) {
    container.insertAdjacentElement('afterend', error);
    return;
  }
  field.insertAdjacentElement('afterend', error);
}

function getFieldValidationMessage(field, form) {
  const value = field.value.trim();
  if (!value) return 'This field is required.';
  if (field.type === 'email' && !validateEmail(value)) return 'Enter a valid email address.';
  if (field.type === 'tel' && !validatePhone(value)) return 'Enter a valid phone number.';
  if (field.name === 'password' && !validatePassword(value)) return 'Use at least 8 characters with letters and numbers.';
  if (field.name === 'confirmPassword') {
    const password = form.querySelector('[name="password"]')?.value || '';
    if (!validatePassword(value)) return 'Use at least 8 characters with letters and numbers.';
    if (value !== password) return 'Passwords do not match.';
  }
  return '';
}

function validateForm(form) {
  let valid = true;
  let firstInvalidField = null;
  form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
    const message = getFieldValidationMessage(field, form);
    if (message) {
      showFieldError(field, message);
      if (!firstInvalidField) firstInvalidField = field;
      valid = false;
      return;
    }
    clearFieldError(field);
  });
  if (firstInvalidField) {
    firstInvalidField.removeAttribute('readonly');
    firstInvalidField.focus();
  }
  return valid;
}

function bindFieldValidation(form) {
  form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
    field.addEventListener('input', () => {
      if (!field.classList.contains('field-error')) return;
      const message = getFieldValidationMessage(field, form);
      if (message) {
        showFieldError(field, message);
        return;
      }
      clearFieldError(field);
    });
  });
}

function bindPasswordToggles(scope = document) {
  scope.querySelectorAll('[data-password-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const field = button.parentElement?.querySelector('input');
      if (!field) return;
      const isVisible = field.type === 'text';
      field.type = isVisible ? 'password' : 'text';
      button.setAttribute('aria-pressed', String(!isVisible));
      button.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
      button.innerHTML = isVisible
        ? '<i class="ri-eye-line" aria-hidden="true"></i>'
        : '<i class="ri-eye-off-line" aria-hidden="true"></i>';
    });
  });
}

function enforceAuthPageAccess() {
  const page = document.body.dataset.page;
  const user = getAuthUser();

  if (page === 'dashboard' && !user) {
    window.location.replace(`${APP.root}/pages/login.html`);
    return false;
  }

  return true;
}

const ROLE_DASHBOARD_CONFIG = {
  admin: {
    label: 'Admin',
    eyebrow: 'Admin dashboard',
    title: `${APP.siteName} admin overview`,
    description: 'Manage products, categories, customers, and orders from one complete furniture dashboard.',
    defaultView: 'dashboard',
    views: ['dashboard', 'main-category', 'category', 'product', 'customer-management', 'order-management', 'refund-cancellation'],
  },
  user: {
    label: 'User',
    eyebrow: 'User dashboard',
    title: `${APP.siteName} customer overview`,
    description: 'See your saved furniture, orders, and account activity in a simpler personal dashboard.',
    defaultView: 'customer-management',
    views: ['customer-management', 'order-management', 'review-rating', 'help-support'],
  },
};

function getRoleConfig(role) {
  return ROLE_DASHBOARD_CONFIG[role] || ROLE_DASHBOARD_CONFIG.admin;
}

function bindForms() {
  ['newsletterForm', 'footerNewsletterForm'].forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;
    bindFieldValidation(form);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(form)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      form.reset();
      showToast('You are now subscribed to Lunera updates.', 'success');
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    bindFieldValidation(contactForm);
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(contactForm)) {
        showToast('Please complete the form correctly.', 'error');
        return;
      }
      contactForm.reset();
      showToast('Your message has been sent.', 'success');
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    bindFieldValidation(loginForm);
    loginForm.dataset.formStart = String(Date.now());
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const submitButton = loginForm.querySelector('[data-login-submit]');
      const submitLabel = submitButton?.querySelector('.button-label');
      const honeypot = loginForm.querySelector('[name="website"]');
      const startedAt = Number(loginForm.dataset.formStart || 0);
      if (submitButton?.disabled || submitButton?.classList.contains('is-loading')) return;
      if ((honeypot?.value || '').trim() || (startedAt && Date.now() - startedAt < 1200)) {
        showToast('Login request blocked. Please try again.', 'error');
        loginForm.dataset.formStart = String(Date.now());
        return;
      }
      if (!validateForm(loginForm)) {
        showToast('Use a valid email, choose a furniture role, and enter a password with at least 8 characters including letters and numbers.', 'error');
        return;
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        submitButton.setAttribute('aria-busy', 'true');
      }
      if (submitLabel) submitLabel.textContent = 'Logging in...';
      const email = loginForm.querySelector('[name="email"]')?.value.trim() || '';
      const role = loginForm.querySelector('[name="role"]')?.value || 'user';
      const roleConfig = getRoleConfig(role);
      setAuthUser({
        email,
        name: email.split('@')[0] || 'Guest',
        role,
        roleLabel: roleConfig.label,
        loggedInAt: new Date().toISOString(),
      });
      showToast('Login successful.', 'success');
      showLoaderThenNavigate(`${APP.root}/pages/dashboard.html?view=${encodeURIComponent(roleConfig.defaultView)}`, 2000, true);
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    bindFieldValidation(signupForm);
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(signupForm)) {
        showToast('Use a valid email and a password with at least 8 characters, including letters and numbers.', 'error');
        return;
      }
      signupForm.reset();
      showToast('Account created successfully.', 'success');
      showLoaderThenNavigate(`${APP.root}/pages/login.html`, 2000);
    });
  }
}

function renderTestimonials() {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  track.innerHTML = `<div class="testimonial-rail" id="testimonialRail">${TESTIMONIALS.map((item) => `
    <article class="testimonial-card scroll-reveal">
      <span class="eyebrow">Client review</span>
      <p>"${escapeHtml(item.quote)}"</p>
      <strong>${escapeHtml(item.name)}</strong>
      <span>${escapeHtml(item.role)}</span>
    </article>
  `).join('')}</div>`;
  refreshAOS(track);
  updateTestimonialRail();
}

function updateTestimonialRail() {
  const rail = document.getElementById('testimonialRail');
  if (!rail) return;
  rail.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

function moveTestimonial(step) {
  testimonialIndex = (testimonialIndex + step + TESTIMONIALS.length) % TESTIMONIALS.length;
  updateTestimonialRail();
}

function startTestimonialAuto() {
  if (!document.getElementById('testimonialTrack')) return;
  setInterval(() => moveTestimonial(1), 5000);
}

function renderFAQ() {
  const container = document.getElementById('faqAccordion');
  if (!container) return;
  container.innerHTML = FAQS.map((item, index) => `
    <div class="faq-item ${index === 0 ? 'is-open' : ''}">
      <button class="faq-question" type="button">
        <span>${escapeHtml(item.question)}</span>
        <i class="ri-add-line"></i>
      </button>
      <div class="faq-answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </div>
  `).join('');

  container.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-question');
    if (!button) return;
    const item = button.parentElement;
    item.classList.toggle('is-open');
  });
}

function startCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count || 0);
      const suffix = target === 96 ? '%' : target >= 1000 ? '+' : '';
      const duration = 1000;
      const startTime = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const current = Math.floor(progress * target);
        element.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

let currentDashboardView = 'dashboard';

function getDashboardContext(user) {
  const roleConfig = getRoleConfig(user.role);
  const displayName = user.name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  const cartItems = getCartItems();
  const cartCount = getCartCount();
  const wishlistItems = getWishlistItems();
  const wishlistCount = wishlistItems.length;
  const totalSavedValue = wishlistItems
    .map((item) => getProductById(item.id))
    .filter(Boolean)
    .reduce((sum, product) => sum + product.price, 0);
  const subtotal = getCartSubtotal();
  const shipping = cartItems.length ? 120 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const profileStrength = Math.min(96, 68 + wishlistCount * 6 + Math.min(cartCount, 3) * 5);
  const roomShare = [
    { label: 'Living', value: 46, color: '#b47a53' },
    { label: 'Dining', value: 24, color: '#d7a46f' },
    { label: 'Bedroom', value: 18, color: '#8f643e' },
    { label: 'Decor', value: 12, color: '#e7c9a7' },
  ];
  const roomGradient = roomShare.map((segment, index) => {
    const start = roomShare.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const end = start + segment.value;
    return `${segment.color} ${start}% ${end}%`;
  }).join(', ');

  return {
    user,
    roleConfig,
    displayName: displayName || 'Guest',
    initials: (displayName || user.name || 'G')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(''),
    cartItems,
    cartCount,
    wishlistCount,
    totalSavedValue,
    subtotal,
    shipping,
    tax,
    total,
    profileStrength,
    roomShare,
    roomGradient,
    heroProduct: PRODUCTS[1] || PRODUCTS[0],
    detailProduct: PRODUCTS[0],
    recentProducts: PRODUCTS.slice(0, 4),
    suggestedProducts: PRODUCTS.slice(2, 5),
    categories: ['All', ...getCategories().slice(0, 5)],
  };
}

function renderDashboardNav(view, roleConfig) {
  const items = [
    { key: 'dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { key: 'main-category', icon: 'ri-stack-line', label: 'Main Category' },
    { key: 'category', icon: 'ri-list-check-2', label: 'Category' },
    { key: 'sub-category', icon: 'ri-node-tree', label: 'Sub- Category' },
    { key: 'product-variant', icon: 'ri-layout-grid-line', label: 'Product Variant' },
    { key: 'product', icon: 'ri-shopping-bag-2-line', label: 'Product' },
    { key: 'customer-management', icon: 'ri-user-settings-line', label: 'Customer Management' },
    { key: 'order-management', icon: 'ri-file-list-3-line', label: 'Order Management' },
    { key: 'refund-cancellation', icon: 'ri-arrow-go-back-line', label: 'Refund & Cancellation' },
    { key: 'review-rating', icon: 'ri-star-line', label: 'Review & Rating' },
    { key: 'help-support', icon: 'ri-question-answer-line', label: 'Help & Support' },
    { key: 'cms', icon: 'ri-window-line', label: 'CMS' },
  ];

  return items
    .filter((item) => roleConfig.views.includes(item.key))
    .map((item) => `
    <button class="${view === item.key ? 'is-active' : ''}" type="button" data-dashboard-view="${item.key}" aria-current="${view === item.key ? 'page' : 'false'}">
      <i class="${item.icon}"></i>
      <span>${item.label}</span>
    </button>
  `).join('');
}

function renderDashboardTopbar(context) {
  return `
    <div class="dashboard-studio-topbar scroll-reveal">
      <div class="dashboard-studio-topbar-copy">
        <span class="eyebrow">${escapeHtml(context.roleConfig.eyebrow)}</span>
        <h1>${escapeHtml(context.roleConfig.title)}</h1>
        <p>${escapeHtml(context.roleConfig.description)}</p>
      </div>
      <div class="dashboard-studio-topbar-actions">
        <label class="dashboard-studio-search" aria-label="Search dashboard">
          <i class="ri-search-line"></i>
          <input type="search" placeholder="Search products or orders">
        </label>
        <button class="dashboard-studio-icon-button" type="button" aria-label="Notifications">
          <i class="ri-notification-3-line"></i>
        </button>
        <button class="dashboard-studio-logout" type="button" onclick="logoutUser()">
          <i class="ri-logout-box-r-line"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  `;
}

function renderDashboardMetricCards(cards) {
  return `
    <div class="dashboard-studio-summary-grid">
      ${cards.map((card) => `
        <article class="dashboard-studio-summary-card ${card.tone || 'tone-white'} scroll-reveal">
          <div class="dashboard-studio-summary-head">
            <span>${escapeHtml(card.label)}</span>
            <i class="${escapeHtml(card.icon)}"></i>
          </div>
          <strong>${escapeHtml(card.value)}${card.small ? ` <small>${escapeHtml(card.small)}</small>` : ''}</strong>
          <p>${escapeHtml(card.note)}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderDashboardSimplePanel({ eyebrow, title, description, items }) {
  return `
    <section class="dashboard-studio-focus-grid">
      <article class="dashboard-studio-focus-card scroll-reveal">
        <span class="eyebrow">${escapeHtml(eyebrow)}</span>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </article>
      <article class="dashboard-studio-list-card scroll-reveal">
        <div class="dashboard-studio-list">
          ${items.map((item) => `
            <div class="dashboard-studio-list-item">
              <div>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.meta)}</span>
              </div>
              <b>${escapeHtml(item.value)}</b>
            </div>
          `).join('')}
        </div>
      </article>
    </section>
  `;
}

function renderDashboardDataTable({ title, actionLabel, rows, columns }) {
  return `
    <section class="dashboard-studio-table-card scroll-reveal">
      <div class="dashboard-studio-table-head">
        <h3>${escapeHtml(title)}</h3>
        <div class="dashboard-studio-table-actions">
          <button class="dashboard-studio-filter" type="button">
            <span>${escapeHtml(actionLabel)}</span>
            <i class="ri-arrow-down-s-line"></i>
          </button>
        </div>
      </div>
      <div class="dashboard-studio-table-wrap">
        <table class="dashboard-studio-table">
          <thead>
            <tr>
              ${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr>
                ${columns.map((column) => `<td>${row[column.key]}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDashboardOverviewView(context) {
  const trendPoints = [
    { day: '3 Jun', a: 24, b: 10 },
    { day: '4 Jun', a: 18, b: 52 },
    { day: '5 Jun', a: 78, b: 44 },
    { day: '6 Jun', a: 40, b: 84 },
    { day: '7 Jun', a: 76, b: 42 },
    { day: '8 Jun', a: 46, b: 38 },
    { day: '9 Jun', a: 60, b: 16 },
  ];
  const chartWidth = 430;
  const chartHeight = 170;
  const maxValue = 90;
  const buildPath = (key) => trendPoints.map((point, index) => {
    const x = (index / (trendPoints.length - 1)) * chartWidth;
    const y = chartHeight - ((point[key] / maxValue) * chartHeight);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  const tableRows = context.recentProducts.concat(context.suggestedProducts).slice(0, 4).map((product, index) => ({
    id: index + 1,
    image: product.image,
    name: product.name.toUpperCase(),
    price: `$${product.price.toFixed(2)}`,
    sell: [128, 102, 101, 95, 86, 57][index],
    status: index === 1 || index === 4 ? 'Out of stock' : 'Available',
    views: ['12,500', '8,530', '7,600', '4,359', '4,359', '4,359'][index],
    earning: ['$15,265', '$15,265', '$15,265', '$15,265', '$15,265', '$15,265'][index],
  }));

  const metricCards = [
    { label: 'Total Revenue', value: '$4,876.98', small: 'up', note: '+8.26% More earning than usual', icon: 'ri-camera-fill', tone: 'tone-white' },
    { label: 'Total Customer', value: '25,786', small: 'down', note: '-1.32% Less new user than usual', icon: 'ri-user-fill', tone: 'tone-lime' },
    { label: 'Total Orders', value: '15,265', small: 'up', note: '+2.45% More earning than usual', icon: 'ri-shopping-cart-2-fill', tone: 'tone-lilac' },
    { label: 'Total Product', value: '1778', small: 'down', note: '+8.26% More earning than usual', icon: 'ri-briefcase-4-fill', tone: 'tone-blue' },
  ];

  return `
    <div class="dashboard-studio-view dashboard-view-enter">
      <section class="dashboard-studio-overview">
        <div class="dashboard-studio-chart-card scroll-reveal">
          <div class="dashboard-studio-panel-head">
            <div>
              <span>Revenue</span>
              <h2>$4,876.98 <small>(+8.26%)</small></h2>
              <p>Weekly performance across sales and client visits.</p>
            </div>
            <div class="dashboard-studio-legend">
              <span><i class="is-green"></i>Total Earn</span>
              <span><i class="is-lilac"></i>Total Visited</span>
            </div>
          </div>
          <div class="dashboard-studio-chart-shell">
            <div class="dashboard-studio-axis">
              <span>6k</span>
              <span>4k</span>
              <span>2k</span>
              <span>0k</span>
            </div>
            <div class="dashboard-studio-graph">
            <div class="dashboard-studio-gridlines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <svg viewBox="0 0 430 170" aria-hidden="true">
                <path class="line-green" d="${buildPath('a')}"></path>
                <path class="line-lilac" d="${buildPath('b')}"></path>
                ${trendPoints.map((point, index) => {
                  const x = (index / (trendPoints.length - 1)) * chartWidth;
                  const greenY = chartHeight - ((point.a / maxValue) * chartHeight);
                  const lilacY = chartHeight - ((point.b / maxValue) * chartHeight);
                  return `
                    <circle class="dot-green" cx="${x.toFixed(2)}" cy="${greenY.toFixed(2)}" r="3.5"></circle>
                    <circle class="dot-lilac" cx="${x.toFixed(2)}" cy="${lilacY.toFixed(2)}" r="3.5"></circle>
                  `;
                }).join('')}
              </svg>
              <div class="dashboard-studio-xlabels">
                ${trendPoints.map((point) => `<span>${point.day}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        ${renderDashboardMetricCards(metricCards)}
      </section>

      ${renderDashboardDataTable({
        title: 'Products',
        actionLabel: 'Most Sell',
        columns: [
          { key: 'id', label: 'No' },
          { key: 'image', label: 'Image' },
          { key: 'name', label: 'Product Name' },
          { key: 'price', label: 'Price' },
          { key: 'sell', label: 'Sell' },
          { key: 'status', label: 'Status' },
          { key: 'views', label: 'View' },
          { key: 'earning', label: 'Earning' },
        ],
        rows: tableRows.map((row) => ({
          id: row.id,
          image: `<div class="dashboard-studio-product-thumb"><img src="${row.image}" alt="${escapeHtml(row.name)}" loading="lazy"></div>`,
          name: escapeHtml(row.name),
          price: row.price,
          sell: row.sell,
          status: `<span class="dashboard-studio-status ${row.status === 'Available' ? 'is-available' : 'is-out'}">${row.status}</span>`,
          views: row.views,
          earning: row.earning,
        })),
      })}
    </div>
  `;
}

function renderDashboardCollectionView(view) {
  const viewMap = {
    'main-category': {
      eyebrow: 'Main category',
      title: 'Top-level furniture groups shaping the catalog',
      description: 'Monitor the broad collection families that guide navigation, merchandising, and seasonal planning.',
      metrics: [
        { label: 'Live groups', value: '06', note: 'Living, Dining, Bedroom and more', icon: 'ri-stack-fill', tone: 'tone-white' },
        { label: 'Best performer', value: 'Living', note: '42% of total traffic this week', icon: 'ri-home-heart-fill', tone: 'tone-lime' },
        { label: 'Seasonal focus', value: 'Dining', note: 'Autumn edit launches next month', icon: 'ri-restaurant-2-fill', tone: 'tone-lilac' },
        { label: 'Low stock watch', value: '02', note: 'Groups need replenishment planning', icon: 'ri-alarm-warning-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Living Room', meta: 'Traffic share', value: '42%' },
        { title: 'Dining', meta: 'Conversion rate', value: '5.6%' },
        { title: 'Bedroom', meta: 'Products live', value: '38' },
        { title: 'Lighting', meta: 'Restock ETA', value: '4 days' },
      ],
      tableTitle: 'Main Category Summary',
      tableAction: 'This month',
      columns: [
        { key: 'name', label: 'Category' },
        { key: 'products', label: 'Products' },
        { key: 'traffic', label: 'Traffic' },
        { key: 'orders', label: 'Orders' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { name: 'Living Room', products: '48', traffic: '18.4k', orders: '264', status: '<span class="dashboard-studio-status is-available">Strong</span>' },
        { name: 'Dining', products: '29', traffic: '9.8k', orders: '182', status: '<span class="dashboard-studio-status is-available">Growing</span>' },
        { name: 'Bedroom', products: '38', traffic: '8.1k', orders: '133', status: '<span class="dashboard-studio-status is-available">Stable</span>' },
        { name: 'Lighting', products: '17', traffic: '4.9k', orders: '76', status: '<span class="dashboard-studio-status is-out">Watch</span>' },
      ],
    },
    category: {
      eyebrow: 'Category',
      title: 'Track room-specific segments and how shoppers move through them',
      description: 'Use category performance to decide what deserves visibility in homepage modules and campaign slots.',
      metrics: [
        { label: 'Active categories', value: '14', note: 'Mapped across room and function', icon: 'ri-list-check-2', tone: 'tone-white' },
        { label: 'Fastest growth', value: 'Accent Chairs', note: '+18% week over week', icon: 'ri-line-chart-fill', tone: 'tone-lime' },
        { label: 'Highest returns', value: 'Tables', note: 'Needs dimension review', icon: 'ri-loop-left-fill', tone: 'tone-lilac' },
        { label: 'Search demand', value: '1.9k', note: 'Users searched categories this week', icon: 'ri-search-eye-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Accent Chairs', meta: 'Weekly trend', value: '+18%' },
        { title: 'Console Tables', meta: 'Average margin', value: '31%' },
        { title: 'Pendant Lights', meta: 'Backorders', value: '11' },
        { title: 'Beds', meta: 'Saved to wishlist', value: '486' },
      ],
      tableTitle: 'Category Performance',
      tableAction: 'Best conversion',
      columns: [
        { key: 'name', label: 'Category' },
        { key: 'views', label: 'Views' },
        { key: 'conversion', label: 'Conversion' },
        { key: 'avg', label: 'Avg Order' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { name: 'Accent Chairs', views: '6.3k', conversion: '6.1%', avg: '$840', status: '<span class="dashboard-studio-status is-available">Hot</span>' },
        { name: 'Coffee Tables', views: '4.8k', conversion: '4.7%', avg: '$620', status: '<span class="dashboard-studio-status is-available">Stable</span>' },
        { name: 'Beds', views: '3.9k', conversion: '3.8%', avg: '$1,920', status: '<span class="dashboard-studio-status is-available">Premium</span>' },
        { name: 'Floor Lamps', views: '2.7k', conversion: '2.9%', avg: '$410', status: '<span class="dashboard-studio-status is-out">Slow</span>' },
      ],
    },
    'sub-category': {
      eyebrow: 'Sub-category',
      title: 'Refine the assortment with more specific discovery layers',
      description: 'Sub-categories help users narrow quickly and help the team spot small but fast-moving product pockets.',
      metrics: [
        { label: 'Sub-groups live', value: '32', note: 'Granular browsing paths enabled', icon: 'ri-node-tree', tone: 'tone-white' },
        { label: 'Top niche', value: 'Boucle Lounge', note: 'Highest click-through rate', icon: 'ri-focus-3-fill', tone: 'tone-lime' },
        { label: 'Dormant groups', value: '05', note: 'Need refreshed stock or content', icon: 'ri-moon-cloudy-fill', tone: 'tone-lilac' },
        { label: 'Filter usage', value: '68%', note: 'Visitors use sub-category chips', icon: 'ri-equalizer-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Boucle Lounge', meta: 'CTR', value: '8.4%' },
        { title: 'Round Dining', meta: 'Units sold', value: '57' },
        { title: 'Minimal Storage', meta: 'Low stock items', value: '4' },
        { title: 'Task Lighting', meta: 'Search uplift', value: '+11%' },
      ],
      tableTitle: 'Sub-category Breakdown',
      tableAction: 'Refine list',
      columns: [
        { key: 'name', label: 'Sub-category' },
        { key: 'parent', label: 'Parent' },
        { key: 'items', label: 'Items' },
        { key: 'sales', label: 'Sales' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { name: 'Boucle Lounge', parent: 'Living Room', items: '09', sales: '$12.4k', status: '<span class="dashboard-studio-status is-available">Strong</span>' },
        { name: 'Round Dining', parent: 'Dining', items: '07', sales: '$9.1k', status: '<span class="dashboard-studio-status is-available">Stable</span>' },
        { name: 'Task Lighting', parent: 'Lighting', items: '06', sales: '$3.8k', status: '<span class="dashboard-studio-status is-available">Growing</span>' },
        { name: 'Minimal Storage', parent: 'Bedroom', items: '05', sales: '$2.5k', status: '<span class="dashboard-studio-status is-out">Slow</span>' },
      ],
    },
    'product-variant': {
      eyebrow: 'Product variant',
      title: 'Manage finish, color, and size options across the catalog',
      description: 'Variants influence margin, restocking, and which combinations deserve more prominence in merchandising.',
      metrics: [
        { label: 'Variants live', value: '124', note: 'Color and material combinations', icon: 'ri-layout-grid-fill', tone: 'tone-white' },
        { label: 'Top finish', value: 'Natural Oak', note: 'Chosen in 44% of orders', icon: 'ri-palette-fill', tone: 'tone-lime' },
        { label: 'Low stock SKUs', value: '18', note: 'Variant restock planning needed', icon: 'ri-stackshare-fill', tone: 'tone-lilac' },
        { label: 'Custom requests', value: '09', note: 'Awaiting final approval', icon: 'ri-edit-box-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Natural Oak', meta: 'Share of orders', value: '44%' },
        { title: 'Walnut Finish', meta: 'Margin', value: '36%' },
        { title: 'Cream Boucle', meta: 'Backorders', value: '7' },
        { title: 'Matte Black', meta: 'Return rate', value: '1.8%' },
      ],
      tableTitle: 'Variant Inventory',
      tableAction: 'Stock health',
      columns: [
        { key: 'variant', label: 'Variant' },
        { key: 'sku', label: 'SKU' },
        { key: 'stock', label: 'Stock' },
        { key: 'orders', label: 'Orders' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { variant: 'Alden / Natural Oak / Queen', sku: 'ALD-NO-Q', stock: '14', orders: '38', status: '<span class="dashboard-studio-status is-available">Healthy</span>' },
        { variant: 'Mira / Walnut / 6 Seat', sku: 'MIR-WA-6', stock: '08', orders: '25', status: '<span class="dashboard-studio-status is-available">Tight</span>' },
        { variant: 'Elio / Cream Boucle', sku: 'ELI-CB-01', stock: '03', orders: '31', status: '<span class="dashboard-studio-status is-out">Low</span>' },
        { variant: 'Lina / Linen Shade', sku: 'LIN-LS-02', stock: '22', orders: '16', status: '<span class="dashboard-studio-status is-available">Healthy</span>' },
      ],
    },
    product: {
      eyebrow: 'Product',
      title: 'Stay close to hero items, margins, and stock-sensitive pieces',
      description: 'Product-level insight helps prioritize photography updates, ad pushes, and replenishment decisions.',
      metrics: [
        { label: 'Products live', value: `${PRODUCTS.length}`, note: 'Published across the storefront', icon: 'ri-shopping-bag-fill', tone: 'tone-white' },
        { label: 'Best seller', value: 'Isla Sofa', note: 'Highest revenue contribution', icon: 'ri-fire-fill', tone: 'tone-lime' },
        { label: 'Highest ticket', value: '$2,640', note: 'Premium modular seating range', icon: 'ri-money-dollar-circle-fill', tone: 'tone-lilac' },
        { label: 'Wishlist leader', value: 'Elio Chair', note: 'Most saved this week', icon: 'ri-heart-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Isla Modular Sofa', meta: 'Revenue', value: '$18.6k' },
        { title: 'Elio Lounge Chair', meta: 'Wishlists', value: '214' },
        { title: 'Mira Dining Table', meta: 'Margin', value: '33%' },
        { title: 'Lina Floor Lamp', meta: 'Restock ETA', value: '3 days' },
      ],
      tableTitle: 'Product Highlights',
      tableAction: 'Revenue first',
      columns: [
        { key: 'product', label: 'Product' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'saves', label: 'Saves' },
        { key: 'status', label: 'Status' },
      ],
      rows: PRODUCTS.slice(0, 4).map((product, index) => ({
        product: escapeHtml(product.name),
        category: escapeHtml(product.category),
        price: formatPrice(product.price),
        saves: ['214', '198', '162', '133'][index],
        status: `<span class="dashboard-studio-status ${index === 2 ? 'is-out' : 'is-available'}">${index === 2 ? 'Review' : 'Live'}</span>`,
      })),
    },
    'customer-management': {
      eyebrow: 'Customer management',
      title: 'Understand shopper value, retention, and support activity',
      description: 'Customer data here helps prioritize VIP outreach, repeat purchase campaigns, and service recovery.',
      metrics: [
        { label: 'Active customers', value: '2,486', note: 'Purchased in the last 90 days', icon: 'ri-group-fill', tone: 'tone-white' },
        { label: 'Repeat buyers', value: '34%', note: 'Returning customer contribution', icon: 'ri-user-heart-fill', tone: 'tone-lime' },
        { label: 'VIP members', value: '118', note: 'High-value design clients', icon: 'ri-vip-crown-2-fill', tone: 'tone-lilac' },
        { label: 'Open cases', value: '07', note: 'Awaiting service follow-up', icon: 'ri-customer-service-2-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'High-value segment', meta: 'Average order', value: '$2,480' },
        { title: 'Repeat buyers', meta: '30 day growth', value: '+6%' },
        { title: 'Support satisfaction', meta: 'Current score', value: '4.8/5' },
        { title: 'Dormant clients', meta: 'Win-back target', value: '63' },
      ],
      tableTitle: 'Customer Segments',
      tableAction: 'Engagement',
      columns: [
        { key: 'segment', label: 'Segment' },
        { key: 'customers', label: 'Customers' },
        { key: 'avgOrder', label: 'Avg Order' },
        { key: 'repeat', label: 'Repeat Rate' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { segment: 'VIP design clients', customers: '118', avgOrder: '$3,820', repeat: '46%', status: '<span class="dashboard-studio-status is-available">Priority</span>' },
        { segment: 'Repeat homeowners', customers: '584', avgOrder: '$1,460', repeat: '34%', status: '<span class="dashboard-studio-status is-available">Healthy</span>' },
        { segment: 'First-time buyers', customers: '1,122', avgOrder: '$780', repeat: '12%', status: '<span class="dashboard-studio-status is-out">Nurture</span>' },
        { segment: 'Trade accounts', customers: '46', avgOrder: '$4,260', repeat: '52%', status: '<span class="dashboard-studio-status is-available">Strong</span>' },
      ],
    },
    'order-management': {
      eyebrow: 'Order management',
      title: 'Keep fulfillment, delivery, and exceptions moving smoothly',
      description: 'This view highlights active orders, shipment flow, and which tickets need attention before customers feel friction.',
      metrics: [
        { label: 'Orders today', value: '64', note: 'Across storefront and direct inquiries', icon: 'ri-file-list-3-fill', tone: 'tone-white' },
        { label: 'Awaiting dispatch', value: '18', note: 'Needs warehouse release', icon: 'ri-truck-fill', tone: 'tone-lime' },
        { label: 'Delayed', value: '05', note: 'Requires customer update', icon: 'ri-time-fill', tone: 'tone-lilac' },
        { label: 'Completed', value: '212', note: 'Delivered this week', icon: 'ri-checkbox-circle-fill', tone: 'tone-blue' },
      ],
      list: [
        { title: 'Average fulfillment', meta: 'Order to dispatch', value: '1.8 days' },
        { title: 'White-glove deliveries', meta: 'This week', value: '26' },
        { title: 'Delayed shipments', meta: 'Needs outreach', value: '5' },
        { title: 'Refund requests', meta: 'Open', value: '3' },
      ],
      tableTitle: 'Recent Orders',
      tableAction: 'Latest first',
      columns: [
        { key: 'order', label: 'Order ID' },
        { key: 'customer', label: 'Customer' },
        { key: 'value', label: 'Value' },
        { key: 'stage', label: 'Stage' },
        { key: 'status', label: 'Status' },
      ],
      rows: [
        { order: '#ST-2401', customer: 'Clara Jensen', value: '$2,640', stage: 'Dispatch', status: '<span class="dashboard-studio-status is-available">On track</span>' },
        { order: '#ST-2398', customer: 'Evan Morrison', value: '$1,420', stage: 'Packaging', status: '<span class="dashboard-studio-status is-available">Processing</span>' },
        { order: '#ST-2392', customer: 'Naomi Ellis', value: '$540', stage: 'Carrier hold', status: '<span class="dashboard-studio-status is-out">Delayed</span>' },
        { order: '#ST-2387', customer: 'Ava Reed', value: '$3,080', stage: 'Delivered', status: '<span class="dashboard-studio-status is-available">Closed</span>' },
      ],
    },
  };

  const config = viewMap[view];
  if (!config) return '';

  return `
    <div class="dashboard-studio-view dashboard-view-enter">
      ${renderDashboardSimplePanel({
        eyebrow: config.eyebrow,
        title: config.title,
        description: config.description,
        items: config.list,
      })}
      ${renderDashboardMetricCards(config.metrics)}
      ${renderDashboardDataTable({
        title: config.tableTitle,
        actionLabel: config.tableAction,
        rows: config.rows,
        columns: config.columns,
      })}
    </div>
  `;
}

function renderDashboardPlaceholderView(view) {
  const copy = {
    'refund-cancellation': {
      eyebrow: 'Refund and cancellation',
      title: 'Monitor return reasons, cancellation timing, and recovery opportunities',
      description: 'Keep service quality high by spotting patterns in cancellations and making return policy friction visible.',
    },
    'review-rating': {
      eyebrow: 'Review and rating',
      title: 'Understand customer sentiment and which products need attention',
      description: 'Use qualitative feedback to improve product pages, service messaging, and assortment confidence.',
    },
    'help-support': {
      eyebrow: 'Help and support',
      title: 'Track incoming issues, resolution speed, and service quality',
      description: 'A clear support view helps the team respond faster and protect the premium buying experience.',
    },
    cms: {
      eyebrow: 'CMS',
      title: 'Organize homepage stories, campaigns, and editorial content',
      description: 'This section is ready for content planning, hero scheduling, and merchandising modules.',
    },
  }[view];

  if (!copy) return '';

  return `
    <div class="dashboard-studio-view dashboard-view-enter">
      ${renderDashboardSimplePanel({
        eyebrow: copy.eyebrow,
        title: copy.title,
        description: copy.description,
        items: [
          { title: 'Workspace status', meta: 'Current readiness', value: 'Configured' },
          { title: 'Next step', meta: 'Suggested action', value: 'Add live data' },
          { title: 'Priority', meta: 'Implementation level', value: 'Medium' },
          { title: 'Theme match', meta: 'Dashboard styling', value: 'Applied' },
        ],
      })}
    </div>
  `;
}

function renderDashboardView(view, context) {
  if (view === 'dashboard') return renderDashboardOverviewView(context);
  if (['main-category', 'category', 'sub-category', 'product-variant', 'product', 'customer-management', 'order-management'].includes(view)) {
    return renderDashboardCollectionView(view);
  }
  return renderDashboardPlaceholderView(view);
}

function bindDashboardNavigation(target) {
  target.onclick = (event) => {
    const viewButton = event.target.closest('[data-dashboard-view]');
    if (!viewButton) return;
    const nextView = viewButton.dataset.dashboardView;
    if (!nextView || nextView === currentDashboardView) return;
    currentDashboardView = nextView;
    renderDashboardPage(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}

function renderDashboardPage(view = currentDashboardView) {
  const user = getAuthUser();
  if (!user) {
    window.location.replace(`${APP.root}/pages/login.html`);
    return;
  }

  const target = document.getElementById('dashboardView');
  if (!target) return;
  const context = getDashboardContext(user);
  const requestedView = getQueryParam('view') || view;
  const allowedViews = context.roleConfig.views;
  currentDashboardView = allowedViews.includes(requestedView) ? requestedView : context.roleConfig.defaultView;

  target.innerHTML = `
    <section class="section dashboard-studio-section">
      <div class="container">
        <div class="dashboard-studio-shell">
          <aside class="dashboard-studio-sidebar scroll-reveal">
            <div class="dashboard-studio-brand">
              <a class="dashboard-studio-brand-link" href="${APP.root}/index.html" aria-label="Go to home page">
                <img class="dashboard-studio-brand-logo" src="${APP.logo}" alt="${APP.siteName} logo">
              </a>
            </div>
            <div class="dashboard-studio-profile">
              <div class="dashboard-studio-avatar">${context.initials}</div>
              <strong>${escapeHtml(context.displayName)}</strong>
              <span>${escapeHtml(context.user.roleLabel || context.roleConfig.label)}</span>
              <span>${escapeHtml(context.user.email || 'myangelagray@gmail.com')}</span>
            </div>
            <nav class="dashboard-studio-nav">
              ${renderDashboardNav(currentDashboardView, context.roleConfig)}
            </nav>
          </aside>

          <div class="dashboard-studio-main">
            ${renderDashboardTopbar(context)}
            ${renderDashboardView(currentDashboardView, context)}
          </div>
        </div>
      </div>
    </section>
  `;
  bindDashboardNavigation(target);
  refreshAOS(target);
}

function logoutUser() {
  clearAuthUser();
  window.location.replace(`${APP.root}/pages/login.html`);
}

function initPage() {
  const page = document.body.dataset.page;

  if (page === 'home') {
    setupHeroSlider();
    renderCategoryCards();
    renderFeaturedProducts();
    renderTestimonials();
    renderBlogPreview();
    startTestimonialAuto();
  }

  if (page === 'shop') initShopPage();
  if (page === 'details') initProductDetailsPage();
  if (page === 'wishlist') renderWishlistPage();
  if (page === 'cart') renderCartPage();
  if (page === 'blog') initBlogPage();
  if (page === 'contact') renderFAQ();
  if (page === 'dashboard') renderDashboardPage();
  if (page === 'about') startCounters();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!enforceAuthPageAccess()) return;
  renderShell();
  updateBadgeCounts();
  renderCartDrawer();
  renderWishlistDrawer();
  setupMenu();
  setupHeaderScroll();
  bindLoaderLinks();
  bindPasswordToggles();
  bindForms();
  initPage();
  setupScrollReveal();
  setupLoader();
});

window.addEventListener('pageshow', () => {
  enforceAuthPageAccess();
});
