/* ==========================================================================
   JAVASCRIPT PRESENTATION CONTROL SYSTEM - THE COMPLEXITY OF SCHOOL LEADERSHIP
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let currentSlide = 0;
  let activeTheme = 'vibrant'; // Default theme
  
  // Element references
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.getElementById('presentation-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const slideCounter = document.getElementById('slide-counter');
  const progressBarFill = document.getElementById('progress-bar-fill');
  
  const themeOptVibrant = document.getElementById('theme-opt-vibrant');
  const themeOptMinimalist = document.getElementById('theme-opt-minimalist');
  const fullscreenBtn = document.getElementById('fullscreen-btn');

  // Initialize slides
  function initPresentation() {
    // Expose showSlide to global scope so inline scripts can trigger navigation
    window.showSlide = showSlide;

    // Show first slide
    showSlide(0);
    
    // Set size of container to full screen
    resizeSlides();
    window.addEventListener('resize', resizeSlides);
    
    // Set up theme
    setTheme(activeTheme);
    
    // Set up carousel interactivity
    setupCarouselInteractivity();

    // Set up pitch cards interactivity (Slide 4)
    setupPitchCardInteractivity();

    // Set up 3D prism interactivity
    setupPrismInteractivity();

    // Set up Magic Rings
    setupMagicRings();
  }

  // Slide display logic
  function showSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to target slide
    slides[index].classList.add('active');
    currentSlide = index;
    
    // Toggle pitch-deck-mode if we are on Slide 4 onwards (index >= 3)
    if (index >= 3) {
      slidesContainer.classList.add('pitch-deck-mode');
    } else {
      slidesContainer.classList.remove('pitch-deck-mode');
    }

    // Dynamic theme override: slides 4, 6, 8 (indices 3, 5, 7) must appear in minimalist style.
    if (index === 3 || index === 5 || index === 7) {
      document.body.className = 'theme-minimalist';
    } else {
      document.body.className = 'theme-' + activeTheme;
    }
    
    // Update progress controls
    updateControls();
    
    // Set up Magic Rings on current slide if active
    setupMagicRings();
    
    // Trigger custom slide animations
    triggerSlideAnimations(index);
  }

  function nextSlide() {
    if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  }

  // Update counter and progress bar
  function updateControls() {
    // Counter
    slideCounter.innerText = `${currentSlide + 1} / ${slides.length}`;
    
    // Progress bar
    const percent = (currentSlide / (slides.length - 1)) * 100;
    progressBarFill.style.width = `${percent}%`;
    
    // Enable/disable navigation buttons
    prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
    prevBtn.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
    
    nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0.3' : '1';
    nextBtn.style.cursor = currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer';
  }

  // Trigger animations inside specific slides
  function triggerSlideAnimations(slideIndex) {
    // Slide 3 (index 2): Dimension Bars animation (only run if elements are present)
    if (slideIndex === 2) {
      setTimeout(() => {
        const d1 = document.getElementById('bar-d1');
        const d2 = document.getElementById('bar-d2');
        const d3 = document.getElementById('bar-d3');
        const d4 = document.getElementById('bar-d4');
        if (d1) d1.style.width = '50.4%';
        if (d2) d2.style.width = '100%';
        if (d3) d3.style.width = '98.9%';
        if (d4) d4.style.width = '38.5%';
      }, 200);
    } else {
      // Reset bar widths when leaving slide
      const bars = ['bar-d1', 'bar-d2', 'bar-d3', 'bar-d4'];
      bars.forEach(id => {
        const bar = document.getElementById(id);
        if (bar) bar.style.width = '0%';
      });
    }

  }

  // Force slide container to occupy the entire viewport
  function resizeSlides() {
    slidesContainer.style.position = 'absolute';
    slidesContainer.style.left = '0px';
    slidesContainer.style.top = '0px';
    slidesContainer.style.width = '100vw';
    slidesContainer.style.height = '100vh';
    slidesContainer.style.transform = 'none';
  }

  // Theme selector
  function setTheme(theme) {
    activeTheme = theme;
    
    // Override body class for slides 4, 6, 8 (indices 3, 5, 7)
    if (currentSlide === 3 || currentSlide === 5 || currentSlide === 7) {
      document.body.className = 'theme-minimalist';
    } else {
      if (theme === 'vibrant') {
        document.body.className = 'theme-vibrant';
      } else {
        document.body.className = 'theme-minimalist';
      }
    }
    
    if (theme === 'vibrant') {
      themeOptVibrant.classList.add('active');
      themeOptMinimalist.classList.remove('active');
    } else {
      themeOptVibrant.classList.remove('active');
      themeOptMinimalist.classList.add('active');
    }
    // Resize is needed to update layout dimensions
    resizeSlides();
  }

  // Fullscreen support
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error requesting fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Event Listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  themeOptVibrant.addEventListener('click', () => setTheme('vibrant'));
  themeOptMinimalist.addEventListener('click', () => setTheme('minimalist'));
  
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'Space':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 't':
      case 'T':
        // Toggle theme shortcut
        setTheme(activeTheme === 'vibrant' ? 'minimalist' : 'vibrant');
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
    }
  });

  // Touch navigation support (swipes)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
    }
  }

  // Interactivity for Slide 8B (Dimensión 3) Carousel
  function setupCarouselInteractivity() {
    const carouselCards = document.querySelectorAll('.carousel-card');
    carouselCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all cards
        carouselCards.forEach(c => c.classList.remove('active-card'));
        // Add active class to clicked card
        card.classList.add('active-card');
        
        // Smooth scroll to center of container
        const container = card.parentElement;
        if (container) {
          const scrollTarget = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
          container.scrollTo({
            left: scrollTarget,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Interactivity for Slide 4 Pitch Cards
  function setupPitchCardInteractivity() {
    const pitchCards = document.querySelectorAll('#slide-4 .pitch-card');
    pitchCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all cards in Slide 4
        pitchCards.forEach(c => c.classList.remove('active-card'));
        // Add active class to clicked card
        card.classList.add('active-card');
      });
    });
  }

  // Interactivity for Slide 10 3D Prism
  function setupPrismInteractivity() {
    const scene = document.getElementById("slide10-scene");
    const prism = document.getElementById("slide10-prism");
    if (!scene || !prism) return;

    let currentRotateY = 0;
    let currentRotateX = -4;

    scene.addEventListener("mousemove", (event) => {
      const rect = scene.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      currentRotateY = percentX * 180;
      currentRotateX = -4 - percentY * 12;

      prism.style.animation = "none";
      prism.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
    });

    scene.addEventListener("mouseleave", () => {
      prism.style.transform = "rotateY(0deg) rotateX(-4deg)";

      setTimeout(() => {
        if (prism.style.transform === "rotateY(0deg) rotateX(-4deg)") {
          prism.style.animation = "slide10IdleRotate 16s linear infinite";
        }
      }, 400);
    });
  }

  function setupMagicRings() {
    const mount = document.getElementById('magic-rings-mount');
    const activeSlide = document.querySelector('.slide.active');
    const isCampanilSlide = activeSlide?.dataset.magicRings === 'true';

    if (!mount) return;

    if (!isCampanilSlide) {
      mount.innerHTML = '';
      delete mount.dataset.initialized;
      return;
    }

    if (typeof THREE === 'undefined') {
      console.error('Three.js is not loaded');
      return;
    }

    if (mount.dataset.initialized === 'true') {
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setClearColor(0x000000, 0);
    } catch (e) {
      console.error('WebGL init error:', e);
      return;
    }

    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const vertexShader = `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float uTime, uAttenuation, uLineThickness;
      uniform float uBaseRadius, uRadiusStep, uScaleRate;
      uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
      uniform float uFadeIn, uFadeOut;
      uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
      uniform vec2 uResolution, uMouse;
      uniform vec3 uColor, uColorTwo;

      const float HP = 1.5707963;
      const float CYCLE = 3.45;

      float fade(float t) {
        return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
      }

      float ring(vec2 p, float ri, float cut, float t0, float px) {
        float t = mod(uTime + t0, CYCLE);
        float r = ri + t / CYCLE * uScaleRate;
        float d = abs(length(p) - r);
        float a = atan(abs(p.y), abs(p.x)) / HP;
        float th = max(1.0 - a, 0.5) * px * uLineThickness;
        float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
        d += pow(cut * a, 3.0) * r;
        return h * exp(-uAttenuation * d) * fade(t);
      }

      void main() {
        float px = 1.0 / min(uResolution.x, uResolution.y);
        vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
        float cr = cos(uRotation), sr = sin(uRotation);
        p = mat2(cr, -sr, sr, cr) * p;
        p -= uMouse * uMouseInfluence;
        float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
        p /= sc;
        vec3 c = vec3(0.0);
        float rcf = 5.0; // Statically hardcoded for 6 rings (6 - 1)
        for (int i = 0; i < 6; i++) {
          float fi = float(i);
          vec2 pr = p - fi * uParallax * uMouse;
          vec3 rc = mix(uColor, uColorTwo, fi / rcf);
          c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
        }
        c *= 1.0 + uBurst * 2.0;
        float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
        c += (n - 0.5) * uNoiseAmount;
        gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uAttenuation: { value: 10.0 },
      uResolution: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color('#F28C28') }, // Naranjo
      uColorTwo: { value: new THREE.Color('#FF7A1A') }, // Naranjo luminoso
      uLineThickness: { value: 1.8 },
      uBaseRadius: { value: 0.35 },
      uRadiusStep: { value: 0.1 },
      uScaleRate: { value: 0.1 },
      uOpacity: { value: 0.55 },
      uNoiseAmount: { value: 0.12 },
      uRotation: { value: 0.0 },
      uRingGap: { value: 1.5 },
      uFadeIn: { value: 0.7 },
      uFadeOut: { value: 0.5 },
      uMouse: { value: new THREE.Vector2() },
      uMouseInfluence: { value: 0.0 }, // followMouse = false
      uHoverAmount: { value: 0 },
      uHoverScale: { value: 1.2 },
      uParallax: { value: 0.05 },
      uBurst: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });
    
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      // IMPORTANTE: setPixelRatio debe llamarse ANTES de setSize.
      // Si se invierte el orden, three.js calcula el tamaño del canvas
      // con el pixelRatio anterior y el efecto queda mal escalado o
      // directamente no se ve dentro del contenedor.
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(resize);
      ro.observe(mount);
    }

    const mouse = [0, 0];
    const smoothMouse = [0, 0];
    let isHovered = false;
    let hoverAmount = 0;
    let burst = 0;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse[0] = (e.clientX - rect.left) / rect.width - 0.5;
      mouse[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => {
      isHovered = false;
      mouse[0] = 0;
      mouse[1] = 0;
    };
    const onClick = () => { burst = 1.0; };

    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onMouseEnter);
    mount.addEventListener('mouseleave', onMouseLeave);
    mount.addEventListener('click', onClick);

    let frameId;
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);

      // CPU optimization: only render when the campanil slide is active
      const activeSlide = document.querySelector('.slide.active');
      const isCampanilSlide = activeSlide?.dataset.magicRings === 'true';
      if (!isCampanilSlide) {
        return;
      }

      smoothMouse[0] += (mouse[0] - smoothMouse[0]) * 0.08;
      smoothMouse[1] += (mouse[1] - smoothMouse[1]) * 0.08;
      hoverAmount += ((isHovered ? 1 : 0) - hoverAmount) * 0.08;
      uniforms.uTime.value = t * 0.001 * 1.0; // speed = 1.0
      uniforms.uMouse.value.set(smoothMouse[0], smoothMouse[1]);
      uniforms.uHoverAmount.value = hoverAmount;
      uniforms.uBurst.value = burst;

      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error("WebGL render error, stopping loop:", err);
        cancelAnimationFrame(frameId);
      }
    };
    frameId = requestAnimationFrame(animate);
    mount.dataset.initialized = 'true';
  }

  // Initialize
  initPresentation();
});

// ==========================================
// MATRIZ ORBITAL DE ARTICULACIÓN DIRECTIVA (SLIDE 12 V2)
// ==========================================
const orbitalMatrixData = {
  risk: {
    title: "Cinturón de impacto · Riesgo",
    color: "#D6453A",
    function: "Detectar el impacto inicial",
    description: "Capa externa donde los episodios disruptivos comprometen seguridad, bienestar o derechos. La vulneración de derechos activa la protección institucional.",
    concepts: ["Vulneración de derechos", "Seguridad", "Bienestar inmediato"]
  },
  interpretation: {
    title: "Anillo de filtro · Interpretación",
    color: "#F2C14E",
    function: "Convertir el impacto en prioridad",
    description: "Capa donde se clasifican gravedad, riesgo y oportunidad antes de actuar.",
    concepts: ["Gravedad", "Riesgo", "Oportunidad", "Evidencias"]
  },
  decision: {
    title: "Anillo de maniobra · Decisión",
    color: "#F28C28",
    function: "Transformar la prioridad en decisión",
    description: "Capa donde se define el curso de acción: atender, delegar, postergar, reorientar o activar procedimientos.",
    concepts: ["Decidir", "Reorientar", "Plazos legales"]
  },
  articulation: {
    title: "Anillo de despliegue · Articulación",
    color: "#73C7B8",
    function: "Distribuir la respuesta",
    description: "Capa donde se coordinan roles, equipos y liderazgos como UTP, PIE e Inspectoría.",
    concepts: ["Delegación", "Roles", "UTP", "PIE", "Inspectoría"]
  },
  stabilization: {
    title: "Anillo de estabilización · Acuerdos y registro",
    color: "#356B9A",
    function: "Blindar el núcleo y devolver estabilidad",
    description: "Capa donde la respuesta queda respaldada mediante comunicación, acuerdos, actas, correos, llamadas y protocolos.",
    concepts: ["Coordinación", "Acuerdos", "Registro", "Trazabilidad"]
  },
  satellites: {
    rights: {
      title: "Vulneración de derechos",
      orbit: "risk",
      color: "#D6453A",
      function: "Activa la protección institucional",
      description: "Episodio disruptivo que compromete seguridad, bienestar o derechos y obliga a responder con prioridad."
    },
    criteria: {
      title: "Gravedad, riesgo y oportunidad",
      orbit: "interpretation",
      color: "#F2C14E",
      function: "Clasifica la urgencia",
      description: "Permite determinar la magnitud del episodio antes de decidir cómo actuar."
    },
    decision: {
      title: "Decidir y reorientar",
      orbit: "decision",
      color: "#F28C28",
      function: "Define el curso de acción",
      description: "Transforma la prioridad en acciones concretas: atender, delegar, postergar, reorientar o activar procedimientos."
    },
    roles: {
      title: "Delegación y roles",
      orbit: "articulation",
      color: "#73C7B8",
      function: "Distribuye la respuesta",
      description: "Permite coordinar UTP, PIE, Inspectoría y otros liderazgos para que el director no absorba solo el impacto."
    },
    agreements: {
      title: "Coordinación y acuerdos",
      orbit: "stabilization",
      color: "#356B9A",
      function: "Produce acuerdo común",
      description: "Ordena la comunicación y articula decisiones para evitar fracturas institucionales."
    },
    traceability: {
      title: "Registro y trazabilidad",
      orbit: "stabilization",
      color: "#356B9A",
      function: "Respalda la respuesta",
      description: "Llamadas, correos, actas y protocolos sostienen continuidad, protección institucional y transparencia."
    }
  }
};

window.initOrbitalMatrix = function() {
  const container = document.querySelector('.orbital-matrix-container');
  const system = document.getElementById('orbital-matrix-system');
  if (!container || !system) return;

  // 1. Interacción 3D Parallax Mouse
  let isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isReducedMotion && window.innerWidth > 600) {
    let ticking = false;
    
    container.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const percentX = (x - centerX) / centerX;
          const percentY = (y - centerY) / centerY;
          
          // Limits requested: rotateY max ~24deg, rotateX max ~16deg, rotateZ ~2deg
          // Base transform: rotateX(60deg) rotateZ(-10deg)
          const baseRotateX = 60;
          const baseRotateZ = -10;
          
          const addRotateY = percentX * 24;
          const addRotateX = -percentY * 16; 
          const addRotateZ = percentX * 2;
          
          system.style.transform = `rotateX(${baseRotateX + addRotateX}deg) rotateY(${addRotateY}deg) rotateZ(${baseRotateZ + addRotateZ}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    container.addEventListener('mouseleave', () => {
      system.style.transform = `rotateX(60deg) rotateZ(-10deg)`;
    });
  }

  // 2. Interacciones de Hover/Click en Órbitas y Satélites
  const panel = document.getElementById('orbital-reading-panel');
  
  const resetPanel = () => {
    system.classList.remove('hovering-orbit');
    document.querySelectorAll('.matrix-orbit').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.orbiting-node').forEach(el => el.classList.remove('active'));
    
    panel.innerHTML = `
      <strong>Lectura del sistema</strong>
      <p>La urgencia no impacta directamente el núcleo pedagógico: atraviesa capas sucesivas que transforman el riesgo en gobernabilidad cotidiana.</p>
    `;
  };

  const updatePanelWithOrbit = (orbitId) => {
    const data = orbitalMatrixData[orbitId];
    if (!data) return;

    system.classList.add('hovering-orbit');
    
    const tagsHtml = (data.concepts || []).map(c => `<span class="concept-tag" style="border-color: ${data.color}">${c}</span>`).join('');
    
    panel.innerHTML = `
      <strong style="color: ${data.color}">${data.title}</strong>
      <div class="reading-concepts">${tagsHtml}</div>
    `;
  };

  const updatePanelWithSatellite = (satId) => {
    const data = orbitalMatrixData.satellites[satId];
    if (!data) return;

    system.classList.add('hovering-orbit');
    
    panel.innerHTML = `
      <strong style="color: ${data.color}">${data.title}</strong>
      <p style="font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px; opacity:0.7;">Capa: ${data.orbit}</p>
      <p>${data.description}</p>
      <p style="margin-top:8px; font-size:12px; font-weight:600; opacity:0.8;">Función: ${data.function}</p>
    `;
  };

  // Expose highlight methods globally for external navigation triggers (e.g. from Slide 3 subdimensions)
  window.highlightOrbitalSatellite = (satId) => {
    resetPanel();
    const sat = document.querySelector(`.orbiting-node[data-satellite="${satId}"]`);
    if (sat) {
      sat.classList.add('active');
      const data = orbitalMatrixData.satellites[satId];
      if (data) {
        const orbit = document.querySelector(`.matrix-orbit[data-orbit="${data.orbit}"]`);
        if (orbit) orbit.classList.add('active');
        updatePanelWithSatellite(satId);
      }
    }
  };

  window.highlightOrbitalOrbit = (orbitId) => {
    resetPanel();
    const orbit = document.querySelector(`.matrix-orbit[data-orbit="${orbitId}"]`);
    if (orbit) {
      orbit.classList.add('active');
      updatePanelWithOrbit(orbitId);
    }
  };

  // Asignar eventos a las órbitas (líneas)
  document.querySelectorAll('.matrix-orbit').forEach(orbit => {
    orbit.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 600) return;
      orbit.classList.add('active');
      updatePanelWithOrbit(orbit.dataset.orbit);
    });
    
    orbit.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 600) return;
      resetPanel();
    });

    orbit.addEventListener('click', () => {
      orbit.classList.add('active');
      updatePanelWithOrbit(orbit.dataset.orbit);
    });
  });

  // Asignar eventos a los satélites
  document.querySelectorAll('.orbiting-node').forEach(sat => {
    sat.addEventListener('mouseenter', () => {
      if (window.innerWidth <= 600) return;
      sat.classList.add('active');
      
      const satId = sat.dataset.satellite;
      const data = orbitalMatrixData.satellites[satId];
      if (data) {
        document.querySelector(`.orbit-${data.orbit}`).classList.add('active');
        updatePanelWithSatellite(satId);
      }
    });

    sat.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 600) return;
      resetPanel();
    });
    
    sat.addEventListener('click', () => {
      sat.classList.add('active');
      const satId = sat.dataset.satellite;
      const data = orbitalMatrixData.satellites[satId];
      if (data) {
        document.querySelector(`.orbit-${data.orbit}`).classList.add('active');
        updatePanelWithSatellite(satId);
      }
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  if (typeof initOrbitalMatrix === 'function') {
    initOrbitalMatrix();
  }
});
