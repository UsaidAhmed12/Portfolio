document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypewriter();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initStatCounters();
  initSkillBars();
  initCursorGlow();
  initContactForm();
  initAvatarUpload();
  initCertUploads();
});

// ===== Particle Background =====
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor(window.innerWidth / 15));
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== Typewriter Effect =====
function initTypewriter() {
  const el = document.getElementById('typewriter');
  const texts = [
    'AI & Machine Learning Engineer',
    'Data Science Enthusiast',
    'Deep Learning Researcher',
    'Python Developer'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }
  type();
}

// ===== Navbar Scroll =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  const links = menu.querySelectorAll('a');

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// ===== Scroll Reveal =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.section-reveal');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
  timelineItems.forEach(el => observer.observe(el));
}

// ===== Stat Counters =====
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target);
          let current = 0;
          const increment = target / 40;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 40);
        });
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
}

// ===== Skill Bars =====
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

// ===== Cursor Glow =====
function initCursorGlow() {
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
}

// ===== Contact Form (EmailJS) =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  emailjs.init('qRHE4m5b-qjAKX_9q');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    emailjs.sendForm('service_agq0e4m', 'template_16wlj5u', form)
      .then(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22C55E, #22D3EE)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      })
      .catch(() => {
        btn.textContent = 'Failed. Try again.';
        btn.style.background = 'linear-gradient(135deg, #EF4444, #F97316)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      });
  });
}

// ===== Avatar Upload with Crop =====
function initAvatarUpload() {
  const wrapper = document.getElementById('avatar-wrapper');
  const input = document.getElementById('avatar-input');
  const placeholder = document.getElementById('avatar-placeholder');
  const img = document.getElementById('avatar-img');

  // Check if avatar already exists - make it static
  const saved = localStorage.getItem('portfolio-avatar');
  if (saved) {
    img.src = saved;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    wrapper.style.cursor = 'default';
    wrapper.title = '';
    return;
  }

  // Only allow upload if no image exists
  wrapper.addEventListener('click', () => input.click());

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      openCropModal(ev.target.result, (croppedData) => {
        img.src = croppedData;
        img.style.display = 'block';
        placeholder.style.display = 'none';
        localStorage.setItem('portfolio-avatar', croppedData);
        wrapper.style.cursor = 'default';
        wrapper.title = '';
        const newWrapper = wrapper.cloneNode(true);
        wrapper.parentNode.replaceChild(newWrapper, wrapper);
      });
    };
    reader.readAsDataURL(file);
  });
}

function openCropModal(imageSrc, onSave) {
  const modal = document.createElement('div');
  modal.className = 'crop-modal';

  const container = document.createElement('div');
  container.className = 'crop-container';

  const cropImg = document.createElement('img');
  cropImg.src = imageSrc;

  const grid = document.createElement('div');
  grid.className = 'crop-grid';
  grid.innerHTML = `
    <div class="crop-grid-line horizontal" style="top:33.33%"></div>
    <div class="crop-grid-line horizontal" style="top:66.66%"></div>
    <div class="crop-grid-line vertical" style="left:33.33%"></div>
    <div class="crop-grid-line vertical" style="left:66.66%"></div>
  `;

  container.appendChild(cropImg);
  container.appendChild(grid);

  const hint = document.createElement('p');
  hint.className = 'crop-hint';
  hint.textContent = 'Drag image up/down to adjust position';

  const controls = document.createElement('div');
  controls.className = 'crop-controls';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'crop-btn crop-btn-save';
  saveBtn.textContent = 'Save';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'crop-btn crop-btn-cancel';
  cancelBtn.textContent = 'Cancel';

  controls.appendChild(cancelBtn);
  controls.appendChild(saveBtn);

  modal.appendChild(container);
  modal.appendChild(hint);
  modal.appendChild(controls);
  document.body.appendChild(modal);

  let offsetY = 0;
  let startY = 0;
  let dragging = false;
  let imgHeight = 0;
  const containerSize = 300;

  cropImg.onload = () => {
    const ratio = containerSize / cropImg.naturalWidth;
    imgHeight = cropImg.naturalHeight * ratio;
    cropImg.style.width = '100%';
    cropImg.style.height = imgHeight + 'px';
    offsetY = -(imgHeight - containerSize) / 2;
    cropImg.style.top = offsetY + 'px';
  };

  const onPointerDown = (e) => {
    dragging = true;
    startY = e.clientY || e.touches[0].clientY;
    e.preventDefault();
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    const clientY = e.clientY || e.touches[0].clientY;
    const delta = clientY - startY;
    startY = clientY;
    offsetY += delta;
    const minY = -(imgHeight - containerSize);
    const maxY = 0;
    offsetY = Math.max(minY, Math.min(maxY, offsetY));
    cropImg.style.top = offsetY + 'px';
  };
  const onPointerUp = () => { dragging = false; };

  cropImg.addEventListener('mousedown', onPointerDown);
  cropImg.addEventListener('touchstart', onPointerDown);
  document.addEventListener('mousemove', onPointerMove);
  document.addEventListener('touchmove', onPointerMove);
  document.addEventListener('mouseup', onPointerUp);
  document.addEventListener('touchend', onPointerUp);

  cancelBtn.addEventListener('click', () => {
    cleanup();
    document.body.removeChild(modal);
  });

  saveBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = containerSize;
    canvas.height = containerSize;
    const ctx = canvas.getContext('2d');

    const scale = cropImg.naturalWidth / containerSize;
    const sourceX = 0;
    const sourceY = -offsetY * scale;
    const sourceSize = cropImg.naturalWidth;

    ctx.beginPath();
    ctx.arc(containerSize / 2, containerSize / 2, containerSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(cropImg, sourceX, sourceY, sourceSize, sourceSize, 0, 0, containerSize, containerSize);

    const croppedData = canvas.toDataURL('image/jpeg', 0.9);
    cleanup();
    document.body.removeChild(modal);
    onSave(croppedData);
  });

  function cleanup() {
    document.removeEventListener('mousemove', onPointerMove);
    document.removeEventListener('touchmove', onPointerMove);
    document.removeEventListener('mouseup', onPointerUp);
    document.removeEventListener('touchend', onPointerUp);
  }
}

// ===== Certificate Image Uploads =====
function initCertUploads() {
  const cards = document.querySelectorAll('.cert-card');
  cards.forEach((card, index) => {
    const wrapper = card.querySelector('.cert-image-wrapper');
    const input = card.querySelector('.cert-file-input');
    const img = card.querySelector('.cert-img');
    const placeholder = card.querySelector('.cert-placeholder');
    const magnify = card.querySelector('.cert-magnify');
    if (!wrapper || !input) return;

    const saved = localStorage.getItem('portfolio-cert-' + index);
    if (saved) {
      img.src = saved;
      img.style.display = 'block';
      placeholder.style.display = 'none';
      if (magnify) magnify.classList.add('active');
    }

    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('.cert-magnify')) {
        const src = img.src || localStorage.getItem('portfolio-cert-' + index);
        if (src) openCertLightbox(src);
        return;
      }
      input.click();
    });

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        compressCertImage(ev.target.result, (compressed) => {
          img.src = compressed;
          img.style.display = 'block';
          placeholder.style.display = 'none';
          if (magnify) magnify.classList.add('active');
          try {
            localStorage.setItem('portfolio-cert-' + index, compressed);
          } catch (e) {
            console.warn('localStorage full, image shown but not saved');
          }
        });
      };
      reader.readAsDataURL(file);
    });
  });
}

function openCertLightbox(src) {
  const lightbox = document.createElement('div');
  lightbox.className = 'cert-lightbox';

  const closeBtn = document.createElement('div');
  closeBtn.className = 'cert-lightbox-close';
  closeBtn.innerHTML = '<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';

  const fullImg = document.createElement('img');
  fullImg.src = src;

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(fullImg);
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.removeChild(lightbox);
  });
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape' && document.body.contains(lightbox)) {
      document.body.removeChild(lightbox);
      document.removeEventListener('keydown', handler);
    }
  });
}

function compressCertImage(dataUrl, callback) {
  const tempImg = new Image();
  tempImg.onload = () => {
    const canvas = document.createElement('canvas');
    const maxWidth = 400;
    const scale = Math.min(maxWidth / tempImg.width, 1);
    canvas.width = tempImg.width * scale;
    canvas.height = tempImg.height * scale;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);
    callback(canvas.toDataURL('image/jpeg', 0.6));
  };
  tempImg.src = dataUrl;
}
