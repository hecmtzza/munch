// WhatsApp Integration for Munch & Sip Website

// Configuration - REPLACE WITH YOUR ACTUAL BUSINESS PHONE NUMBER
const WHATSAPP_BUSINESS_NUMBER = '+525649393198'; // Use international format with country code

// Utility function to open WhatsApp chat
function openWhatsAppChat(message = '', phone = WHATSAPP_BUSINESS_NUMBER) {
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp Web/Mobile deep link
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
}

// Create WhatsApp Float Widget
function createWhatsAppWidget() {
    const widget = document.createElement('div');
    widget.id = 'whatsapp-widget';
    widget.innerHTML = `
        <style>
            #whatsapp-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            #whatsapp-float-btn {
                background-color: #25D366;
                color: white;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            #whatsapp-float-btn:hover {
                transform: scale(1.1);
                background-color: #128C7E;
            }
            #whatsapp-float-btn i {
                font-size: 30px;
            }
        </style>
        <div id="whatsapp-float-btn">
            <i class="fab fa-whatsapp"></i>
        </div>
    `;
    
    document.body.appendChild(widget);
    
    // Add event listener
    document.getElementById('whatsapp-float-btn').addEventListener('click', () => {
        openWhatsAppChat('Hola, me gustaría más información sobre sus servicios.');
    });
}

// Enhance Service Card CTA Buttons with WhatsApp Messaging
function enhanceServiceButtons() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceName = card.querySelector('h3').textContent;
        const servicePrice = card.querySelector('.price').textContent;
        const ctaButton = card.querySelector('.service-cta');
        
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const message = `Hola, estoy interesado en su servicio de ${serviceName}. ${servicePrice}. ¿Podrían proporcionarme más detalles?`;
            
            openWhatsAppChat(message);
        });
    });
}

// Initialize WhatsApp Integrations
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically load Font Awesome for WhatsApp icon
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(faLink);
    
    createWhatsAppWidget();
    enhanceServiceButtons();
    addWhatsAppToFormSubmit();
});

// Optional: Add WhatsApp link to contact form submission
function addWhatsAppToFormSubmit() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const name = formData.get('nombre');
        const email = formData.get('email');
        const eventType = formData.get('tipoEvento');
        const message = formData.get('mensaje');
        
        // Construct WhatsApp message
        const whatsappMessage = `
Nuevo contacto desde el sitio web:

Nombre: ${name}
Email: ${email}
Tipo de Evento: ${eventType}

Mensaje:
${message}
        `.trim();
        
        // Open WhatsApp with form details
        openWhatsAppChat(whatsappMessage);
        
        // Optional: You might want to still submit the form or show a success message
        alert('¡Gracias! Te redirigiremos a WhatsApp para completar tu solicitud.');
    });
}