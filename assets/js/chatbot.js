// WhatsApp Order Chatbot for Portillos Restaurant
class PortillosChatbot {
    constructor() {
        this.isOpen = false;
        this.currentStep = 'welcome';
        this.order = {
            items: [],
            total: 0
        };
        this.menuData = this.getMenuData();
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
    }

    createWidget() {
        // Create chatbot container
        const chatbotHTML = `
            <div id="chatbot-widget" class="chatbot-widget">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="chatbot-info">
                        <h4>Portillos Assistant</h4>
                        <span class="status">En línea</span>
                    </div>
                    <button class="chatbot-close" id="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chatbot-body" id="chatbot-body">
                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-content">
                                <i class="fas fa-robot"></i>
                                <p>¡Hola! 👋 Soy el asistente de Portillos. ¿En qué puedo ayudarte hoy?</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chatbot-input-area" id="chatbot-input-area">
                        <div class="welcome-options" id="welcome-options">
                            <button class="option-btn" data-action="order">🍽️ Hacer pedido</button>
                            <button class="option-btn" data-action="menu">📋 Ver menú</button>
                            <button class="option-btn" data-action="info">ℹ️ Información</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="chatbot-toggle" id="chatbot-toggle">
                <i class="fas fa-robot"></i>
                <span class="notification-badge" id="notification-badge">1</span>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const widget = document.getElementById('chatbot-widget');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!widget.contains(e.target) && !toggle.contains(e.target) && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        const widget = document.getElementById('chatbot-widget');
        const toggle = document.getElementById('chatbot-toggle');
        const badge = document.getElementById('notification-badge');

        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const widget = document.getElementById('chatbot-widget');
        const toggle = document.getElementById('chatbot-toggle');
        const badge = document.getElementById('notification-badge');

        widget.classList.add('open');
        toggle.classList.add('active');
        badge.style.display = 'none';
        this.isOpen = true;
        
        // Update toggle icon
        toggle.innerHTML = '<i class="fas fa-times"></i>';
    }

    closeChat() {
        const widget = document.getElementById('chatbot-widget');
        const toggle = document.getElementById('chatbot-toggle');

        widget.classList.remove('open');
        toggle.classList.remove('active');
        this.isOpen = false;
        
        // Update toggle icon
        toggle.innerHTML = '<i class="fab fa-whatsapp"></i>';
    }

    addMessage(content, isBot = true) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        const icon = isBot ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${icon}
                <div class="message-text">${content}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showOptions(options) {
        const inputArea = document.getElementById('chatbot-input-area');
        inputArea.innerHTML = '<div class="chatbot-options"></div>';
        
        const optionsContainer = inputArea.querySelector('.chatbot-options');
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.innerHTML = option.text;
            button.dataset.action = option.action;
            button.dataset.value = option.value || '';
            
            if (option.price) {
                button.innerHTML += ` <span class="price">$${option.price}</span>`;
            }
            
            button.addEventListener('click', (e) => {
                this.handleOptionClick(e.target.dataset.action, e.target.dataset.value);
            });
            
            optionsContainer.appendChild(button);
        });
    }

    handleOptionClick(action, value) {
        switch(action) {
            case 'order':
                this.startOrder();
                break;
            case 'menu':
                this.showMenu();
                break;
            case 'info':
                this.showInfo();
                break;
            case 'category':
                this.showCategoryItems(value);
                break;
            case 'add-item':
                this.addItemToOrder(value);
                break;
            case 'view-cart':
                this.showCart();
                break;
            case 'confirm-order':
                this.confirmOrder();
                break;
            case 'clear-cart':
                this.clearCart();
                break;
            case 'back':
                this.goBack();
                break;
        }
    }

    startOrder() {
        this.currentStep = 'category';
        this.addMessage('¡Perfecto! Te ayudo a hacer tu pedido. ¿Qué te gustaría ordenar hoy?');
        this.showCategoryOptions();
    }

    showCategoryOptions() {
        const categories = [
            { text: '🌅 Desayunos', action: 'category', value: 'desayunos' },
            { text: '🌶️ Antojitos', action: 'category', value: 'antojitos' },
            { text: '🍽️ Comida', action: 'category', value: 'comida' },
            { text: '🐟 Mariscos', action: 'category', value: 'mariscos' },
            { text: '🍲 Sopas', action: 'category', value: 'sopas' },
            { text: '🥤 Bebidas', action: 'category', value: 'bebidas' }
        ];
        
        this.showOptions(categories);
    }

    showCategoryItems(category) {
        const categoryItems = this.menuData[category] || [];
        this.addMessage(`Aquí tienes nuestros ${category}:`);
        
        const options = categoryItems.map(item => ({
            text: `${item.name} - ${item.description}`,
            action: 'add-item',
            value: item.id,
            price: item.price
        }));
        
        // Add navigation options
        options.push(
            { text: '🛒 Ver mi pedido', action: 'view-cart', value: '' },
            { text: '← Volver a categorías', action: 'category', value: '' }
        );
        
        this.showOptions(options);
    }

    addItemToOrder(itemId) {
        const item = this.findItemById(itemId);
        if (item) {
            this.order.items.push(item);
            this.order.total += item.price;
            
            this.addMessage(`✅ Agregado: ${item.name} - $${item.price}`);
            this.addMessage(`¿Quieres agregar algo más?`);
            
            const options = [
                { text: '🛒 Ver mi pedido', action: 'view-cart', value: '' },
                { text: '📋 Ver más categorías', action: 'category', value: '' },
                { text: '✅ Confirmar pedido', action: 'confirm-order', value: '' }
            ];
            
            this.showOptions(options);
        }
    }

    showCart() {
        if (this.order.items.length === 0) {
            this.addMessage('Tu pedido está vacío. ¿Te gustaría agregar algo?');
            this.showCategoryOptions();
            return;
        }

        let cartMessage = '🛒 **Tu pedido:**\n\n';
        this.order.items.forEach((item, index) => {
            cartMessage += `${index + 1}. ${item.name} - $${item.price}\n`;
        });
        cartMessage += `\n**Total: $${this.order.total}**`;

        this.addMessage(cartMessage);

        const options = [
            { text: '✅ Confirmar pedido', action: 'confirm-order', value: '' },
            { text: '➕ Agregar más', action: 'category', value: '' },
            { text: '🗑️ Limpiar pedido', action: 'clear-cart', value: '' }
        ];

        this.showOptions(options);
    }

    confirmOrder() {
        if (this.order.items.length === 0) {
            this.addMessage('Tu pedido está vacío. ¿Te gustaría agregar algo?');
            this.showCategoryOptions();
            return;
        }

        this.addMessage('¡Excelente! Tu pedido está listo. Te voy a enviar a WhatsApp para que completes tu pedido.');

        // Generate WhatsApp message
        let whatsappMessage = `🍽️ *PEDIDO PARA PORTILLOS RESTAURANT* 🍽️\n\n`;
        whatsappMessage += `📋 *Mi pedido:*\n`;
        
        this.order.items.forEach((item, index) => {
            whatsappMessage += `${index + 1}. ${item.name} - $${item.price}\n`;
        });
        
        whatsappMessage += `\n💰 *Total: $${this.order.total}*\n\n`;
        whatsappMessage += `📍 *Dirección de entrega:*\n`;
        whatsappMessage += `📞 *Teléfono:*\n`;
        whatsappMessage += `⏰ *Hora preferida:*\n\n`;
        whatsappMessage += `¡Gracias! 🙏`;

        // Encode message for WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/529981234567?text=${encodedMessage}`;

        // Show WhatsApp button
        const options = [
            { text: '📱 Continuar en WhatsApp', action: 'whatsapp', value: whatsappUrl }
        ];

        this.showOptions(options);
        
        // Add click handler for WhatsApp
        setTimeout(() => {
            const whatsappBtn = document.querySelector('[data-action="whatsapp"]');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    window.open(whatsappBtn.dataset.value, '_blank');
                    this.clearCart();
                    this.addMessage('¡Perfecto! Te redirigí a WhatsApp. ¡Que disfrutes tu comida! 🍽️');
                    this.showWelcomeOptions();
                });
            }
        }, 100);
    }

    clearCart() {
        this.order = { items: [], total: 0 };
        this.addMessage('Pedido limpiado. ¿Te gustaría hacer un nuevo pedido?');
        this.showCategoryOptions();
    }

    showMenu() {
        this.addMessage('📋 Aquí tienes nuestro menú completo:');
        this.addMessage('🌅 **Desayunos** - Huevos, chilaquiles, molletes\n🌶️ **Antojitos** - Tacos, quesadillas, flautas\n🍽️ **Comida** - Carnes, pollo, pescado\n🐟 **Mariscos** - Ceviche, camarones, pescado\n🍲 **Sopas** - Caldo de pollo, pozole\n🥤 **Bebidas** - Refrescos, jugos, aguas frescas');
        
        const options = [
            { text: '🍽️ Hacer pedido', action: 'order', value: '' },
            { text: 'ℹ️ Más información', action: 'info', value: '' }
        ];
        
        this.showOptions(options);
    }

    showInfo() {
        this.addMessage('ℹ️ **Información de Portillos:**\n\n📍 **Dirección:** Av. José López Portillo L16 n-ext 25, 77524 Cancún, Q.R.\n⏰ **Horario:** 10:00 AM - 10:00 PM\n📞 **Teléfono:** (998) 123-4567\n🚚 **Delivery:** Disponible\n💳 **Pagos:** Efectivo, tarjeta');
        
        const options = [
            { text: '🍽️ Hacer pedido', action: 'order', value: '' },
            { text: '📋 Ver menú', action: 'menu', value: '' }
        ];
        
        this.showOptions(options);
    }

    showWelcomeOptions() {
        const options = [
            { text: '🍽️ Hacer pedido', action: 'order', value: '' },
            { text: '📋 Ver menú', action: 'menu', value: '' },
            { text: 'ℹ️ Información', action: 'info', value: '' }
        ];
        
        this.showOptions(options);
    }

    findItemById(itemId) {
        for (const category in this.menuData) {
            const item = this.menuData[category].find(item => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    getMenuData() {
        return {
            desayunos: [
                { id: 'huevo-jamon', name: 'Huevo con jamón', description: 'Huevos revueltos con jamón', price: 69 },
                { id: 'chilaquiles', name: 'Chilaquiles', description: 'Tortillas en salsa verde o roja', price: 89 },
                { id: 'molletes', name: 'Molletes', description: 'Pan tostado con frijoles y queso', price: 79 }
            ],
            antojitos: [
                { id: 'tacos-al-pastor', name: 'Tacos al Pastor', description: 'Tacos de cerdo marinado', price: 45 },
                { id: 'quesadillas', name: 'Quesadillas', description: 'Tortilla con queso y ingredientes', price: 65 },
                { id: 'flautas', name: 'Flautas', description: 'Tortillas enrolladas y fritas', price: 75 }
            ],
            comida: [
                { id: 'arrachera', name: 'Arrachera', description: 'Corte de res a la parrilla', price: 189 },
                { id: 'pollo-asadero', name: 'Pollo Asadero', description: 'Pollo marinado y asado', price: 149 },
                { id: 'pescado-empapizado', name: 'Pescado Empapizado', description: 'Pescado fresco con especias', price: 169 }
            ],
            mariscos: [
                { id: 'ceviche', name: 'Ceviche de Camarón', description: 'Camarón marinado en limón', price: 129 },
                { id: 'camarones-al-mojo', name: 'Camarones al Mojo de Ajo', description: 'Camarones con ajo y mantequilla', price: 159 },
                { id: 'pescado-frito', name: 'Pescado Frito', description: 'Pescado fresco frito', price: 139 }
            ],
            sopas: [
                { id: 'caldo-pollo', name: 'Caldo de Pollo', description: 'Caldo tradicional con pollo', price: 89 },
                { id: 'pozole', name: 'Pozole', description: 'Sopa tradicional con maíz', price: 99 },
                { id: 'sopa-tortilla', name: 'Sopa de Tortilla', description: 'Sopa con tortilla frita', price: 79 }
            ],
            bebidas: [
                { id: 'refrescos', name: 'Refrescos', description: 'Coca-Cola, Sprite, Fanta', price: 25 },
                { id: 'aguas-frescas', name: 'Aguas Frescas', description: 'Horchata, jamaica, limón', price: 35 },
                { id: 'jugos', name: 'Jugos Naturales', description: 'Naranja, manzana, piña', price: 45 }
            ]
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortillosChatbot();
});
