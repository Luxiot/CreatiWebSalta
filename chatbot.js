class CreatiWebChatbot {
    constructor() {
        this.isOpen = false;
        this.currentStep = 'main';
        this.userInfo = {};
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.loadChatbot();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container" class="chatbot-container">
                <!-- Chatbot Header -->
                <div class="chatbot-header" id="chatbot-header">
                    <div class="chatbot-avatar">
                        <span>🤖</span>
                    </div>
                    <div class="chatbot-info">
                        <h4>CreatiWebBot</h4>
                        <p>Asistente Virtual</p>
                    </div>
                    <button class="chatbot-toggle" id="chatbot-toggle">
                        <span class="toggle-icon">💬</span>
                        <span class="close-icon">✕</span>
                    </button>
                </div>

                <!-- Chatbot Body -->
                <div class="chatbot-body" id="chatbot-body">
                    <div class="chat-messages" id="chat-messages">
                        <!-- Welcome Message -->
                        <div class="message bot-message">
                            <div class="message-content">
                                <p>¡Hola! Soy CreatiWebBot, tu asistente virtual para desarrollo web. ¿En qué puedo ayudarte hoy?</p>
                                <div class="quick-options">
                                    <button class="quick-option" data-option="servicios">📋 Ver Servicios</button>
                                    <button class="quick-option" data-option="precios">💰 Consultar Precios</button>
                                    <button class="quick-option" data-option="portfolio">🎨 Ver Portfolio</button>
                                    <button class="quick-option" data-option="contacto">📞 Contacto</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Chat Input -->
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Escribe tu pregunta..." maxlength="200">
                        <button id="send-message">📤</button>
                    </div>
                </div>

                <!-- Floating Button -->
                <div class="chatbot-float" id="chatbot-float">
                    <span>💬</span>
                    <span class="notification-dot"></span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        // Toggle chatbot
        document.getElementById('chatbot-toggle').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Floating button
        document.getElementById('chatbot-float').addEventListener('click', () => {
            this.toggleChatbot();
        });

        // Send message
        document.getElementById('send-message').addEventListener('click', () => {
            this.sendMessage();
        });

        // Enter key in input
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Quick options
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-option')) {
                this.handleQuickOption(e.target.dataset.option);
            }
        });
    }

    toggleChatbot() {
        const container = document.getElementById('chatbot-container');
        const body = document.getElementById('chatbot-body');
        const float = document.getElementById('chatbot-float');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            container.classList.add('open');
            body.style.display = 'block';
            float.style.display = 'none';
            document.getElementById('chat-input').focus();
        } else {
            container.classList.remove('open');
            body.style.display = 'none';
            float.style.display = 'flex';
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Process and respond
        this.processMessage(message);
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (sender === 'bot') {
            messageContent.innerHTML = content;
        } else {
            messageContent.textContent = content;
        }
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simulate typing delay
        setTimeout(() => {
            let response = this.generateResponse(lowerMessage);
            this.addMessage(response, 'bot');
        }, 500);
    }

    generateResponse(message) {
        // Servicios
        if (message.includes('servicio') || message.includes('que haces') || message.includes('que ofreces')) {
            return `
                <p>Ofrezco servicios completos de desarrollo web:</p>
                <ul>
                    <li>🚀 <strong>Desarrollo Frontend:</strong> HTML5, CSS3, JavaScript, React, Vue.js</li>
                    <li>⚙️ <strong>Desarrollo Backend:</strong> Node.js, Python, PHP, APIs</li>
                    <li>🌐 <strong>Sitios Web Completos:</strong> Full-stack, e-commerce, corporativos</li>
                    <li>📱 <strong>Diseño Responsivo:</strong> Mobile-first, optimización</li>
                    <li>🔧 <strong>Mantenimiento:</strong> Actualizaciones, seguridad, soporte</li>
                    <li>🎨 <strong>UI/UX Design:</strong> Interfaces intuitivas y atractivas</li>
                </ul>
                <p>¿Te interesa algún servicio en particular?</p>
            `;
        }

        // Precios
        if (message.includes('precio') || message.includes('costo') || message.includes('cuanto cuesta') || message.includes('tarifa')) {
            return `
                <p>Los precios varían de <strong>$100.000 a $300.000</strong> dependiendo de las necesidades específicas de tu proyecto.</p>
                <p><strong>Condiciones de pago:</strong></p>
                <ul>
                    <li>💰 <strong>50% al iniciar:</strong> Se paga la mitad cuando aceptas la creación del proyecto</li>
                    <li>✅ <strong>50% al finalizar:</strong> La otra mitad se paga cuando el proyecto esté completo</li>
                </ul>
                <p>Para evaluar tu proyecto específico y darte un presupuesto exacto, te recomiendo agendar una reunión gratuita.</p>
                <div class="quick-options">
                    <button class="quick-option" data-option="reunion">📅 Agendar Reunión</button>
                    <button class="quick-option" data-option="whatsapp">📱 WhatsApp Directo</button>
                </div>
            `;
        }

        // Portfolio
        if (message.includes('portfolio') || message.includes('trabajos') || message.includes('proyectos') || message.includes('ejemplos')) {
            return `
                <p>¡Claro! He desarrollado varios proyectos exitosos:</p>
                <ul>
                    <li>🛒 <strong>E-commerce Salteño:</strong> React + Node.js + MongoDB</li>
                    <li>🍽️ <strong>Restaurante Gourmet:</strong> Sistema de reservas online</li>
                    <li>🏥 <strong>Clínica Médica:</strong> Portal con agenda y turnos</li>
                    <li>💪 <strong>Gimnasio Fitness:</strong> App progresiva con rutinas</li>
                    <li>👕 <strong>Tienda de Ropa:</strong> E-commerce moderno</li>
                    <li>📍 <strong>App Delivery:</strong> Seguimiento GPS en tiempo real</li>
                </ul>
                <p>¿Te gustaría ver alguno en detalle o tienes un proyecto similar en mente?</p>
            `;
        }

        // Contacto
        if (message.includes('contacto') || message.includes('contactar') || message.includes('hablar') || message.includes('consulta')) {
            return `
                <p>¡Perfecto! Puedes contactarme de varias formas:</p>
                <div class="contact-options">
                    <p>📧 <strong>Email:</strong> luxioage@gmail.com</p>
                    <p>📱 <strong>WhatsApp:</strong> +54 387 484 8712</p>
                </div>
                <p>Para agendar una reunión gratuita y desarrollar tu proyecto, puedes escribir directamente al WhatsApp. ¿Qué prefieres?</p>
                <div class="quick-options">
                    <button class="quick-option" data-option="whatsapp">📱 WhatsApp</button>
                    <button class="quick-option" data-option="email">📧 Email</button>
                    <button class="quick-option" data-option="reunion">📅 Agendar Reunión</button>
                </div>
            `;
        }

        // Tiempo de desarrollo
        if (message.includes('tiempo') || message.includes('duracion') || message.includes('cuanto tarda') || message.includes('plazo')) {
            return `
                <p>Los tiempos de desarrollo dependen del tipo de proyecto:</p>
                <ul>
                    <li>⏱️ <strong>Landing Page:</strong> 1-2 semanas</li>
                    <li>⏱️ <strong>Sitio Corporativo:</strong> 3-4 semanas</li>
                    <li>⏱️ <strong>E-commerce:</strong> 6-8 semanas</li>
                    <li>⏱️ <strong>Aplicación Web:</strong> 8-12 semanas</li>
                </ul>
                <p>¿Tienes alguna fecha específica en mente? Podemos ajustar el cronograma según tus necesidades.</p>
            `;
        }

        // Tecnologías
        if (message.includes('tecnologia') || message.includes('lenguaje') || message.includes('framework') || message.includes('herramienta')) {
            return `
                <p>Uso las tecnologías más modernas y confiables:</p>
                <div class="tech-grid">
                    <div class="tech-category">
                        <h4>Frontend</h4>
                        <p>HTML5, CSS3, JavaScript, React, Vue.js, Next.js</p>
                    </div>
                    <div class="tech-category">
                        <h4>Backend</h4>
                        <p>Node.js, Python, PHP, Express, Django, Laravel</p>
                    </div>
                    <div class="tech-category">
                        <h4>Bases de Datos</h4>
                        <p>MongoDB, MySQL, PostgreSQL, Firebase</p>
                    </div>
                    <div class="tech-category">
                        <h4>Herramientas</h4>
                        <p>Git, Docker, AWS, Vercel, Netlify</p>
                    </div>
                </div>
                <p>¿Hay alguna tecnología específica que te interese?</p>
            `;
        }

        // Mantenimiento
        if (message.includes('mantenimiento') || message.includes('soporte') || message.includes('actualizacion') || message.includes('seguridad')) {
            return `
                <p>Ofrezco servicios completos de mantenimiento:</p>
                <ul>
                    <li>🔒 <strong>Seguridad:</strong> Actualizaciones de seguridad, backups</li>
                    <li>⚡ <strong>Optimización:</strong> Velocidad, SEO, rendimiento</li>
                    <li>📱 <strong>Compatibilidad:</strong> Nuevos navegadores y dispositivos</li>
                    <li>🛠️ <strong>Soporte Técnico:</strong> Resolución de problemas 24/7</li>
                    <li>📊 <strong>Monitoreo:</strong> Uptime, análisis de tráfico</li>
                </ul>
                <p>Los planes de mantenimiento incluyen actualizaciones mensuales. ¿Te interesa conocer más detalles?</p>
            `;
        }

        // Saludos
        if (message.includes('hola') || message.includes('buenos dias') || message.includes('buenas') || message.includes('saludos')) {
            return `
                <p>¡Hola! 👋 Es un placer saludarte. Soy tu asistente virtual para desarrollo web.</p>
                <p>¿En qué puedo ayudarte hoy? Puedo informarte sobre:</p>
                <div class="quick-options">
                    <button class="quick-option" data-option="servicios">📋 Mis Servicios</button>
                    <button class="quick-option" data-option="portfolio">🎨 Mi Portfolio</button>
                    <button class="quick-option" data-option="precios">💰 Precios y Pagos</button>
                    <button class="quick-option" data-option="contacto">📞 Contacto</button>
                </div>
            `;
        }

        // Despedidas
        if (message.includes('chau') || message.includes('adios') || message.includes('hasta luego') || message.includes('gracias')) {
            return `
                <p>¡Ha sido un placer ayudarte! 😊</p>
                <p>Recuerda que puedes contactarme en cualquier momento:</p>
                <p>📧 <strong>Email:</strong> luxioage@gmail.com</p>
                <p>📱 <strong>WhatsApp:</strong> +54 387 484 8712</p>
                <p>¡Que tengas un excelente día!</p>
            `;
        }

        // Respuesta por defecto
        return `
            <p>Interesante pregunta. Déjame ayudarte mejor:</p>
            <p>¿Podrías ser más específico sobre lo que necesitas? Por ejemplo:</p>
            <ul>
                <li>¿Quieres saber sobre mis servicios?</li>
                <li>¿Te interesa conocer precios?</li>
                <li>¿Quieres ver mi portfolio?</li>
                <li>¿Necesitas contactarme?</li>
            </ul>
            <p>O simplemente usa los botones de abajo para navegar más fácilmente.</p>
        `;
    }

    handleQuickOption(option) {
        let response = '';
        
        switch(option) {
            case 'servicios':
                response = this.generateResponse('servicios');
                break;
            case 'precios':
                response = this.generateResponse('precios');
                break;
            case 'portfolio':
                response = this.generateResponse('portfolio');
                break;
            case 'contacto':
                response = this.generateResponse('contacto');
                break;
            case 'consulta':
            case 'reunion':
                response = `
                    <p>¡Excelente idea! Para agendar una reunión gratuita y desarrollar tu proyecto:</p>
                    <p>📱 <strong>WhatsApp:</strong> +54 387 484 8712</p>
                    <p>📧 <strong>Email:</strong> luxioage@gmail.com</p>
                    <p>En la reunión discutiremos:</p>
                    <ul>
                        <li>🎯 Objetivos y alcance de tu proyecto</li>
                        <li>📋 Funcionalidades específicas requeridas</li>
                        <li>⏱️ Cronograma de desarrollo</li>
                        <li>💰 Presupuesto exacto según tus necesidades</li>
                        <li>💳 Condiciones de pago (50% al iniciar, 50% al finalizar)</li>
                    </ul>
                    <p>¡Es completamente gratis y sin compromiso! ¿Te parece bien?</p>
                `;
                break;
            case 'whatsapp':
                window.open('https://wa.me/543874848712', '_blank');
                response = `
                    <p>¡Perfecto! Te abrí WhatsApp. Escribe "Hola" y te responderé en seguida.</p>
                    <p>Mientras tanto, ¿hay algo más en lo que pueda ayudarte?</p>
                `;
                break;
            case 'email':
                window.open('mailto:luxioage@gmail.com', '_blank');
                response = `
                    <p>¡Genial! Te abrí tu cliente de email. Escribe un mensaje y te responderé en menos de 24 horas.</p>
                    <p>¿Necesitas ayuda con algo más?</p>
                `;
                break;
        }
        
        if (response) {
            setTimeout(() => {
                this.addMessage(response, 'bot');
            }, 300);
        }
    }

    loadChatbot() {
        // Add CSS styles
        const styles = `
            .chatbot-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                overflow: hidden;
                transform: translateY(100px) scale(0.8);
                opacity: 0;
                transition: all 0.3s ease;
            }

            .chatbot-container.open {
                transform: translateY(0) scale(1);
                opacity: 1;
            }

            .chatbot-header {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
            }

            .chatbot-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 20px;
            }

            .chatbot-info h4 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
            }

            .chatbot-info p {
                margin: 0;
                font-size: 12px;
                opacity: 0.8;
            }

            .chatbot-toggle {
                margin-left: auto;
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.3s ease;
            }

            .chatbot-toggle:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .close-icon {
                display: none;
            }

            .chatbot-container.open .close-icon {
                display: inline;
            }

            .chatbot-container.open .toggle-icon {
                display: none;
            }

            .chatbot-body {
                display: none;
                height: calc(100% - 70px);
                flex-direction: column;
            }

            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                max-height: 350px;
            }

            .message {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
            }

            .bot-message {
                align-items: flex-start;
            }

            .user-message {
                align-items: flex-end;
            }

            .message-content {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
            }

            .bot-message .message-content {
                background: #f0f2f5;
                color: #1c1e21;
            }

            .user-message .message-content {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }

            .quick-options {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 12px;
            }

            .quick-option {
                background: rgba(102, 126, 234, 0.1);
                border: 1px solid rgba(102, 126, 234, 0.3);
                color: #667eea;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
            }

            .quick-option:hover {
                background: rgba(102, 126, 234, 0.2);
                transform: translateY(-2px);
            }

            .chat-input-container {
                padding: 15px 20px;
                border-top: 1px solid #e4e6ea;
                display: flex;
                gap: 10px;
                align-items: center;
            }

            #chat-input {
                flex: 1;
                border: 1px solid #e4e6ea;
                border-radius: 20px;
                padding: 10px 15px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s ease;
            }

            #chat-input:focus {
                border-color: #667eea;
            }

            #send-message {
                background: linear-gradient(135deg, #667eea, #764ba2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                transition: transform 0.3s ease;
            }

            #send-message:hover {
                transform: scale(1.1);
            }

            .chatbot-float {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                transition: all 0.3s ease;
                z-index: 9999;
            }

            .chatbot-float:hover {
                transform: scale(1.1);
                box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
            }

            .notification-dot {
                position: absolute;
                top: 5px;
                right: 5px;
                width: 12px;
                height: 12px;
                background: #ff6b6b;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }

            .contact-options {
                background: rgba(102, 126, 234, 0.1);
                padding: 15px;
                border-radius: 10px;
                margin: 10px 0;
            }

            .tech-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin: 15px 0;
            }

            .tech-category {
                background: rgba(102, 126, 234, 0.1);
                padding: 10px;
                border-radius: 8px;
                text-align: center;
            }

            .tech-category h4 {
                margin: 0 0 5px 0;
                color: #667eea;
                font-size: 12px;
            }

            .tech-category p {
                margin: 0;
                font-size: 11px;
                color: #666;
            }

            .chatbot-container ul {
                margin: 10px 0;
                padding-left: 20px;
            }

            .chatbot-container li {
                margin: 5px 0;
                font-size: 13px;
            }

            @media (max-width: 768px) {
                .chatbot-container {
                    width: calc(100vw - 40px);
                    height: 60vh;
                    bottom: 10px;
                    right: 20px;
                    left: 20px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new CreatiWebChatbot();
});
