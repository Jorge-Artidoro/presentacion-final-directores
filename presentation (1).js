/**
 * Presentation Controller
 * Maneja la navegación, temas y efectos de las diapositivas
 */

class PresentationController {
  constructor() {
    this.currentSlide = 0;
    this.slides = document.querySelectorAll('.slide');
    this.totalSlides = this.slides.length;
    this.theme = 'vibrant'; // 'vibrant' o 'minimalist'
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.showSlide(0);
    this.updateProgressBar();
    this.updateSlideCounter();
    
    // Inicializar tema
    this.setTheme('vibrant');
  }

  cacheElements() {
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.slideCounter = document.getElementById('slide-counter');
    this.progressBar = document.getElementById('progress-bar-fill');
    this.fullscreenBtn = document.getElementById('fullscreen-btn');
    this.themeVibrant = document.getElementById('theme-opt-vibrant');
    this.themeMinimalist = document.getElementById('theme-opt-minimalist');
    this.body = document.body;
  }

  attachEventListeners() {
    // Navigation
    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));

    // Fullscreen
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Theme selection
    this.themeVibrant.addEventListener('click', () => this.setTheme('vibrant'));
    this.themeMinimalist.addEventListener('click', () => this.setTheme('minimalist'));

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.slides[0].parentElement.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    });

    this.slides[0].parentElement.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      if (startX - endX > 50) this.nextSlide();
      if (endX - startX > 50) this.previousSlide();
    });
  }

  showSlide(n) {
    // Ensure within bounds
    if (n >= this.totalSlides) {
      this.currentSlide = this.totalSlides - 1;
    } else if (n < 0) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = n;
    }

    // Remove active class from all slides
    this.slides.forEach((slide) => slide.classList.remove('active'));

    // Add active class to current slide
    this.slides[this.currentSlide].classList.add('active');

    // Reinitialize MagicRings if on slide 10
    if (this.currentSlide === this.totalSlides - 1) {
      this.initMagicRingsForSlide10();
    }

    this.updateProgressBar();
    this.updateSlideCounter();
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  previousSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  handleKeyPress(e) {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        this.nextSlide();
        break;
      case 'ArrowLeft':
        this.previousSlide();
        break;
      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;
      case '1':
        this.setTheme('vibrant');
        break;
      case '2':
        this.setTheme('minimalist');
        break;
    }
  }

  updateProgressBar() {
    const progress = ((this.currentSlide + 1) / this.totalSlides) * 100;
    this.progressBar.style.width = progress + '%';
  }

  updateSlideCounter() {
    this.slideCounter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;
  }

  setTheme(themeName) {
    this.theme = themeName;

    // Update body class
    this.body.classList.remove('theme-vibrant', 'theme-minimalist');
    this.body.classList.add(`theme-${themeName}`);

    // Update theme button states
    this.themeVibrant.classList.remove('active');
    this.themeMinimalist.classList.remove('active');

    if (themeName === 'vibrant') {
      this.themeVibrant.classList.add('active');
    } else {
      this.themeMinimalist.classList.add('active');
    }

    // Save preference
    localStorage.setItem('presentationTheme', themeName);
  }

  toggleFullscreen() {
    const elem = document.documentElement;

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }

  initMagicRingsForSlide10() {
    // Verify MagicRings class exists
    if (typeof MagicRings === 'undefined') {
      console.warn('MagicRings class not found');
      return;
    }

    const mount = document.getElementById('magic-rings-mount');
    
    // Clear previous canvas if exists
    if (mount && mount.hasChildNodes()) {
      // Canvas already initialized
      return;
    }

    if (mount && !mount.hasChildNodes()) {
      try {
        const magicRings = new MagicRings(mount, {
          color: '#A855F7',
          colorTwo: '#6366F1',
          ringCount: 6,
          speed: 1,
          attenuation: 10,
          lineThickness: 2,
          baseRadius: 0.35,
          radiusStep: 0.1,
          scaleRate: 0.1,
          opacity: 1,
          blur: 0,
          noiseAmount: 0.1,
          rotation: 0,
          ringGap: 1.5,
          fadeIn: 0.7,
          fadeOut: 0.5,
          followMouse: false,
          mouseInfluence: 0.2,
          hoverScale: 1.2,
          parallax: 0.05,
          clickBurst: false
        });
      } catch (error) {
        console.error('Error initializing MagicRings:', error);
      }
    }
  }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const presentation = new PresentationController();

  // Load saved theme preference
  const savedTheme = localStorage.getItem('presentationTheme');
  if (savedTheme) {
    presentation.setTheme(savedTheme);
  }
});

// Handle window resize for MagicRings responsive behavior
window.addEventListener('resize', () => {
  const mount = document.getElementById('magic-rings-mount');
  if (mount && mount.hasChildNodes()) {
    // MagicRings will handle resize internally through its event listeners
  }
});
