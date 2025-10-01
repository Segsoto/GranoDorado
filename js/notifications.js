// Sistema de Notificaciones - Grano Dorado
class NotificationSystem {
    constructor() {
        this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
        this.permission = 'default';
        this.notifications = [];
        this.preferences = this.loadPreferences();
        
        this.init();
    }

    async init() {
        if (!this.isSupported) {
            console.log('Las notificaciones no son soportadas en este navegador');
            return;
        }

        // Verificar permiso actual
        this.permission = Notification.permission;
        
        // Cargar notificaciones guardadas
        this.loadStoredNotifications();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Mostrar panel de notificaciones si hay nuevas
        this.showNotificationPanel();
    }

    async requestPermission() {
        if (!this.isSupported) return false;
        
        try {
            this.permission = await Notification.requestPermission();
            return this.permission === 'granted';
        } catch (error) {
            console.error('Error al solicitar permisos de notificación:', error);
            return false;
        }
    }

    // Crear notificación
    createNotification(type, title, message, data = {}) {
        const notification = {
            id: Date.now(),
            type,
            title,
            message,
            data,
            timestamp: new Date(),
            read: false,
            priority: data.priority || 'normal'
        };

        this.notifications.unshift(notification);
        this.saveNotifications();
        
        // Mostrar notificación del navegador si está permitido
        if (this.permission === 'granted' && this.preferences.browserNotifications) {
            this.showBrowserNotification(notification);
        }
        
        // Actualizar badge de notificaciones
        this.updateNotificationBadge();
        
        // Mostrar en el panel interno
        this.addNotificationToPanel(notification);
        
        return notification;
    }

    // Notificaciones específicas para el negocio
    notifyNewProduct(productName, price) {
        return this.createNotification(
            'new_product',
            '☕ ¡Nuevo Café Disponible!',
            `${productName} ya está disponible por $${price}`,
            { productName, price, priority: 'high' }
        );
    }

    notifyLowStock(productName) {
        return this.createNotification(
            'low_stock',
            '⚠️ ¡Últimas unidades!',
            `Solo quedan pocas unidades de ${productName}. ¡Ordena ahora!`,
            { productName, priority: 'high' }
        );
    }

    notifyReorderReminder(productName, lastOrderDate) {
        const daysSince = Math.floor((new Date() - new Date(lastOrderDate)) / (1000 * 60 * 60 * 24));
        return this.createNotification(
            'reorder_reminder',
            '🔄 ¡Hora de reordenar!',
            `Han pasado ${daysSince} días desde tu último pedido de ${productName}`,
            { productName, daysSince }
        );
    }

    notifyOrderStatus(orderNumber, status, estimatedDelivery = null) {
        const statusMessages = {
            'confirmed': '✅ Pedido confirmado',
            'preparing': '👨‍🍳 Preparando tu pedido',
            'shipped': '🚚 Pedido en camino',
            'delivered': '📦 ¡Pedido entregado!'
        };

        let message = `Tu pedido #${orderNumber} ha sido ${statusMessages[status] || status}`;
        if (estimatedDelivery && status === 'shipped') {
            message += `. Llegada estimada: ${estimatedDelivery}`;
        }

        return this.createNotification(
            'order_status',
            statusMessages[status] || 'Actualización de pedido',
            message,
            { orderNumber, status, estimatedDelivery, priority: 'high' }
        );
    }

    notifySpecialOffer(offerTitle, discount, validUntil) {
        return this.createNotification(
            'special_offer',
            '🎉 ¡Oferta Especial!',
            `${offerTitle} - ${discount}% de descuento hasta ${validUntil}`,
            { offerTitle, discount, validUntil, priority: 'normal' }
        );
    }

    // Mostrar notificación del navegador
    showBrowserNotification(notification) {
        if (this.permission !== 'granted') return;

        const options = {
            body: notification.message,
            icon: '/images/logo-grano-dorado.png',
            badge: '/images/logo-grano-dorado.png',
            tag: notification.type,
            requireInteraction: notification.priority === 'high',
            actions: [
                {
                    action: 'view',
                    title: 'Ver detalles'
                },
                {
                    action: 'dismiss',
                    title: 'Cerrar'
                }
            ]
        };

        const browserNotification = new Notification(notification.title, options);
        
        browserNotification.onclick = () => {
            this.handleNotificationClick(notification);
            browserNotification.close();
        };

        // Auto-cerrar después de 5 segundos para notificaciones normales
        if (notification.priority !== 'high') {
            setTimeout(() => {
                browserNotification.close();
            }, 5000);
        }
    }

    // Manejar click en notificación
    handleNotificationClick(notification) {
        this.markAsRead(notification.id);
        
        switch (notification.type) {
            case 'new_product':
            case 'low_stock':
                // Redirigir a página de productos (cuando esté disponible)
                window.location.href = '#productos';
                break;
            case 'order_status':
                // Mostrar detalles del pedido
                this.showOrderDetails(notification.data.orderNumber);
                break;
            case 'special_offer':
                // Mostrar ofertas
                window.location.href = '#ofertas';
                break;
            case 'reorder_reminder':
                // Abrir WhatsApp con mensaje pre-llenado
                const message = `Hola, me gustaría reordenar ${notification.data.productName}`;
                window.open(`https://wa.me/50687104694?text=${encodeURIComponent(message)}`, '_blank');
                break;
        }
    }

    // Panel de notificaciones en la página
    createNotificationPanel() {
        const panel = document.createElement('div');
        panel.id = 'notification-panel';
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notificaciones</h3>
                <button class="close-panel" onclick="notificationSystem.closePanel()">×</button>
            </div>
            <div class="notification-list" id="notification-list">
                <!-- Las notificaciones se cargarán aquí -->
            </div>
            <div class="notification-footer">
                <button onclick="notificationSystem.markAllAsRead()">Marcar todas como leídas</button>
                <button onclick="notificationSystem.showPreferences()">Configurar</button>
            </div>
        `;
        
        document.body.appendChild(panel);
        return panel;
    }

    // Botón flotante de notificaciones
    createNotificationButton() {
        // Verificar si ya existe
        const existingButton = document.getElementById('notification-button');
        if (existingButton) {
            console.log('Botón de notificaciones ya existe');
            return existingButton;
        }

        const button = document.createElement('button');
        button.id = 'notification-button';
        button.className = 'notification-float-button';
        button.innerHTML = `
            <i class="fas fa-bell"></i>
            <span class="notification-badge" id="notification-badge">0</span>
        `;
        button.onclick = () => this.togglePanel();
        
        document.body.appendChild(button);
        console.log('Botón de notificaciones creado');
        
        // Forzar que sea visible
        button.style.display = 'flex';
        button.style.position = 'fixed';
        button.style.zIndex = '1001';
        
        return button;
    }

    // Actualizar badge de notificaciones
    updateNotificationBadge() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // Agregar notificación al panel
    addNotificationToPanel(notification) {
        const list = document.getElementById('notification-list');
        if (!list) return;

        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? 'read' : 'unread'} priority-${notification.priority}`;
        item.innerHTML = `
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <small>${this.formatTimestamp(notification.timestamp)}</small>
            </div>
            <div class="notification-actions">
                <button onclick="notificationSystem.markAsRead(${notification.id})">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="notificationSystem.deleteNotification(${notification.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        list.insertBefore(item, list.firstChild);
    }

    // Funciones de utilidad
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationBadge();
            this.refreshPanel();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.refreshPanel();
    }

    deleteNotification(notificationId) {
        this.notifications = this.notifications.filter(n => n.id !== notificationId);
        this.saveNotifications();
        this.updateNotificationBadge();
        this.refreshPanel();
    }

    togglePanel() {
        const panel = document.getElementById('notification-panel') || this.createNotificationPanel();
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            this.refreshPanel();
        }
    }

    closePanel() {
        const panel = document.getElementById('notification-panel');
        if (panel) {
            panel.classList.remove('active');
        }
    }

    refreshPanel() {
        const list = document.getElementById('notification-list');
        if (list) {
            list.innerHTML = '';
            this.notifications.forEach(notification => {
                this.addNotificationToPanel(notification);
            });
        }
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffMinutes = Math.floor((now - notificationTime) / (1000 * 60));
        
        if (diffMinutes < 1) return 'Ahora mismo';
        if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
        if (diffMinutes < 1440) return `Hace ${Math.floor(diffMinutes / 60)} horas`;
        return `Hace ${Math.floor(diffMinutes / 1440)} días`;
    }

    // Almacenamiento local
    saveNotifications() {
        localStorage.setItem('grano_dorado_notifications', JSON.stringify(this.notifications));
    }

    loadStoredNotifications() {
        const stored = localStorage.getItem('grano_dorado_notifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
        }
    }

    loadPreferences() {
        const stored = localStorage.getItem('grano_dorado_notification_preferences');
        return stored ? JSON.parse(stored) : {
            browserNotifications: true,
            emailNotifications: true,
            orderUpdates: true,
            productAlerts: true,
            promotions: true
        };
    }

    savePreferences() {
        localStorage.setItem('grano_dorado_notification_preferences', JSON.stringify(this.preferences));
    }

    setupEventListeners() {
        // Crear botón flotante si no existe
        setTimeout(() => {
            if (!document.getElementById('notification-button')) {
                this.createNotificationButton();
            }
        }, 100);
        
        // Escuchar eventos personalizados
        document.addEventListener('grano-dorado-notification', (e) => {
            const { type, title, message, data } = e.detail;
            this.createNotification(type, title, message, data);
        });
    }

    showNotificationPanel() {
        this.updateNotificationBadge();
        
        // Verificar que el botón esté presente
        if (!document.getElementById('notification-button')) {
            this.createNotificationButton();
        }
    }

    // API pública para simular eventos del negocio
    simulateBusinessEvents() {
        // Simular notificaciones de ejemplo (remover en producción)
        setTimeout(() => {
            this.notifyNewProduct('Café Geisha Premium', '45.99');
        }, 2000);

        setTimeout(() => {
            this.notifyLowStock('Café Tarrazú Honey');
        }, 5000);

        setTimeout(() => {
            this.notifySpecialOffer('Descuento de Temporada', 20, '15 de octubre');
        }, 8000);
    }
}

// Inicializar sistema de notificaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.notificationSystem = new NotificationSystem();
    
    // Solo para demostración - remover en producción
    // window.notificationSystem.simulateBusinessEvents();
});

// Función global para crear notificaciones desde cualquier parte
function createNotification(type, title, message, data) {
    if (window.notificationSystem) {
        return window.notificationSystem.createNotification(type, title, message, data);
    }
}