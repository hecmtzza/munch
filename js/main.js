// Variables
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const form = document.getElementById('contactForm');

// Toggle menú móvil
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animar las barras del menú
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Cambiar estilo del header al hacer scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Añadir sombra al header cuando se hace scroll
    if (currentScroll > 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Animación de entrada para las secciones
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Manejar envío del formulario
/* form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Recoger datos del formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        // Aquí iría la lógica para enviar los datos al servidor
        console.log('Datos del formulario:', data);
        
        // Simular envío exitoso
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        form.reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
}); */

 // Galería lightbox simplificado
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                lightbox.remove();
            }
        });
    });
});

// Validación de formulario en tiempo real
const inputs = form.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
});

function validateInput(e) {
    const input = e.target;
    
    if (input.required && !input.value) {
        input.classList.add('error');
    } else {
        input.classList.remove('error');
    }

    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }

    if (input.type === 'tel') {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    }
}
const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

function removeBalloons() {
  balloonContainer.style.opacity = 0;
  setTimeout(() => {
    balloonContainer.remove()
  }, 500)
}

window.addEventListener("load", () => {
  createBalloons(30)
});

