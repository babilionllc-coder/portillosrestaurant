// Booking System JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initBookingForm();
    initDateRestrictions();
});

function initBookingForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleBookingSubmission();
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function initDateRestrictions() {
    const dateInput = document.getElementById('fecha');
    if (!dateInput) return;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Disable past dates and dates more than 3 months away
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);

        if (selectedDate < today) {
            showFieldError(this, 'No puedes seleccionar una fecha pasada');
            this.value = today.toISOString().split('T')[0];
        } else if (selectedDate > maxDate) {
            showFieldError(this, 'No puedes reservar con más de 3 meses de anticipación');
            this.value = maxDate.toISOString().split('T')[0];
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);

    switch (fieldName) {
        case 'nombre':
            if (value.length < 2) {
                showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            break;

        case 'telefono':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Ingresa un número de teléfono válido');
                return false;
            }
            break;

        case 'fecha':
            if (!value) {
                showFieldError(field, 'Selecciona una fecha');
                return false;
            }
            const selectedDate = new Date(value);
            const today = new Date();
            if (selectedDate < today) {
                showFieldError(field, 'No puedes seleccionar una fecha pasada');
                return false;
            }
            break;

        case 'hora':
            if (!value) {
                showFieldError(field, 'Selecciona una hora');
                return false;
            }
            break;

        case 'personas':
            if (!value) {
                showFieldError(field, 'Selecciona el número de personas');
                return false;
            }
            break;

        case 'terminos':
            if (!field.checked) {
                showFieldError(field, 'Debes aceptar los términos y condiciones');
                return false;
            }
            break;
    }

    return true;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    field.classList.remove('error');
}

function handleBookingSubmission() {
    const form = document.getElementById('reservationForm');
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    // Validate all required fields
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Por favor, corrige los errores en el formulario', 'error');
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const reservationData = {
        nombre: formData.get('nombre'),
        telefono: formData.get('telefono'),
        fecha: formData.get('fecha'),
        hora: formData.get('hora'),
        personas: formData.get('personas'),
        ocasion: formData.get('ocasion') || 'No especificada',
        comentarios: formData.get('comentarios') || ''
    };

    // Format date for display
    const fechaFormatted = formatDateForDisplay(reservationData.fecha);
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage(reservationData, fechaFormatted);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/529981668821?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Show success notification
    showNotification('Redirigiendo a WhatsApp para confirmar tu reserva...', 'success');

    // Reset form after a delay
    setTimeout(() => {
        form.reset();
        clearAllErrors();
    }, 2000);
}

function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

function createWhatsAppMessage(data, fechaFormatted) {
    return `🍽️ *SOLICITUD DE RESERVA - PORTILLOS RESTAURANTE*

👤 *Nombre:* ${data.nombre}
📞 *Teléfono:* ${data.telefono}
📅 *Fecha:* ${fechaFormatted}
🕐 *Hora:* ${data.hora}
👥 *Personas:* ${data.personas}
🎉 *Ocasión:* ${data.ocasion}

📝 *Comentarios adicionales:*
${data.comentarios || 'Ninguno'}

Por favor, confirma la disponibilidad para esta reserva.

¡Gracias! 🙏`;
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });

    const errorFields = document.querySelectorAll('.form-input.error, .form-select.error, .form-textarea.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide and remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Utility functions for time validation
function isRestaurantOpen(date, time) {
    const selectedDate = new Date(date + 'T' + time);
    const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = selectedDate.getHours();
    
    // Restaurant is open every day from 10 AM to 10 PM
    return hour >= 10 && hour < 22;
}

function getAvailableTimes(date) {
    const times = [
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
        '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ];

    const selectedDate = new Date(date);
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    if (isToday) {
        return times.filter(time => {
            const [hour, minute] = time.split(':').map(Number);
            const timeInMinutes = hour * 60 + minute;
            const currentTimeInMinutes = currentHour * 60 + currentMinute;
            
            // Only show times that are at least 2 hours in the future
            return timeInMinutes > currentTimeInMinutes + 120;
        });
    }

    return times;
}
