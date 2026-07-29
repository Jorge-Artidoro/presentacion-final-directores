/**
 * MagicRings - Efecto de anillos radiantes con Three.js
 * Parámetros configurables para personalización del efecto
 */
class MagicRings {
  constructor(container, params = {}) {
    this.container = container;
    
    // Parámetros por defecto
    this.params = {
      color: params.color || '#A855F7',
      colorTwo: params.colorTwo || '#6366F1',
      ringCount: params.ringCount || 6,
      speed: params.speed || 1,
      attenuation: params.attenuation || 10,
      lineThickness: params.lineThickness || 2,
      baseRadius: params.baseRadius || 0.35,
      radiusStep: params.radiusStep || 0.1,
      scaleRate: params.scaleRate || 0.1,
      opacity: params.opacity || 1,
      blur: params.blur || 0,
      noiseAmount: params.noiseAmount || 0.1,
      rotation: params.rotation || 0,
      ringGap: params.ringGap || 1.5,
      fadeIn: params.fadeIn || 0.7,
      fadeOut: params.fadeOut || 0.5,
      followMouse: params.followMouse || false,
      mouseInfluence: params.mouseInfluence || 0.2,
      hoverScale: params.hoverScale || 1.2,
      parallax: params.parallax || 0.05,
      clickBurst: params.clickBurst || false
    };

    this.init();
  }

  init() {
    // Crear escena Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: 'highp'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Crear anillos
    this.rings = [];
    this.createRings();

    // Variables para animación
    this.time = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.hoverState = 1;

    // Event listeners
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('click', (e) => this.onMouseClick(e));
    window.addEventListener('resize', () => this.onWindowResize());

    // Iniciar animación
    this.animate();
  }

  createRings() {
    for (let i = 0; i < this.params.ringCount; i++) {
      const radius = this.params.baseRadius + (i * this.params.radiusStep);
      const geometry = new THREE.BufferGeometry();
      
      const points = [];
      const segments = 128;
      
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        points.push(new THREE.Vector3(x, y, 0));
      }
      
      geometry.setFromPoints(points);

      // Crear material con gradiente de color
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? this.params.color : this.params.colorTwo,
        linewidth: this.params.lineThickness,
        transparent: true,
        opacity: this.params.opacity * (1 - (i / this.params.ringCount) * 0.5),
        fog: false
      });

      const line = new THREE.Line(geometry, material);
      this.scene.add(line);

      this.rings.push({
        line: line,
        radius: radius,
        index: i,
        material: material,
        baseOpacity: this.params.opacity * (1 - (i / this.params.ringCount) * 0.5)
      });
    }
  }

  onMouseMove(event) {
    if (this.params.followMouse) {
      const rect = this.container.getBoundingClientRect();
      this.mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      this.hoverState = 1.1;
    }
  }

  onMouseClick(event) {
    if (this.params.clickBurst) {
      this.burstAnimation = true;
      setTimeout(() => {
        this.burstAnimation = false;
      }, 500);
    }
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    this.time += this.params.speed * 0.01;
    
    this.rings.forEach((ring, index) => {
      // Rotación
      ring.line.rotation.z += 0.001 * this.params.speed * (index % 2 === 0 ? 1 : -1);
      
      // Escala pulsante
      const scale = 1 + Math.sin(this.time * this.params.speed + index * 0.3) * this.params.scaleRate;
      ring.line.scale.set(scale, scale, scale);
      
      // Opacidad animada
      const opacity = ring.baseOpacity * (0.5 + 0.5 * Math.sin(this.time * this.params.speed * 2 + index * 0.5));
      ring.material.opacity = opacity;
      
      // Efecto hover
      if (this.params.followMouse) {
        ring.line.position.x = this.mouseX * this.params.mouseInfluence;
        ring.line.position.y = this.mouseY * this.params.mouseInfluence;
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Exportar para uso como módulo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MagicRings;
}
