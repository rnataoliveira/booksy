// ===== REUSABLE COMPONENTS =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initNotificationSystem();
    initModalSystem();
    initTooltips();
    initDropdowns();
    initTabs();
    initAccordions();
    initCarousels();
    
    console.log('Components initialized successfully!');
});

// ===== NOTIFICATION SYSTEM =====
function initNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Add notification styles
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }
            
            .notification, .auth-notification {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                margin-bottom: 12px;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                pointer-events: auto;
                border-left: 4px solid var(--primary-color);
            }
            
            .notification.show, .auth-notification.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .notification--success, .auth-notification--success {
                border-left-color: var(--success-color);
            }
            
            .notification--error, .auth-notification--error {
                border-left-color: var(--error-color);
            }
            
            .notification--warning, .auth-notification--warning {
                border-left-color: var(--warning-color);
            }
            
            .notification--info, .auth-notification--info {
                border-left-color: var(--info-color);
            }
            
            .notification__content, .auth-notification__content {
                display: flex;
                align-items: center;
                padding: 16px 20px;
                gap: 12px;
            }
            
            .notification__icon, .auth-notification__icon {
                font-size: 20px;
                flex-shrink: 0;
            }
            
            .notification__message, .auth-notification__message {
                flex: 1;
                font-size: 14px;
                color: var(--gray-700);
                line-height: 1.4;
            }
            
            .notification__close, .auth-notification__close {
                background: none;
                border: none;
                font-size: 18px;
                color: var(--gray-400);
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .notification__close:hover, .auth-notification__close:hover {
                background-color: var(--gray-100);
                color: var(--gray-600);
            }
            
            .password-strength {
                margin-top: 8px;
            }
            
            .password-strength__bar {
                height: 4px;
                background-color: var(--gray-200);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 4px;
            }
            
            .password-strength__fill {
                height: 100%;
                transition: all 0.3s ease;
            }
            
            .password-strength__text {
                font-size: 12px;
                font-weight: 500;
            }
            
            .field-error {
                color: var(--error-color);
                font-size: 12px;
                margin-top: 4px;
                display: block;
            }
            
            .form__input.error,
            .form__select.error,
            .form__textarea.error {
                border-color: var(--error-color);
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            
            @media (max-width: 768px) {
                .notification-container {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                }
                
                .notification, .auth-notification {
                    max-width: none;
                    margin-bottom: 8px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== MODAL SYSTEM =====
function initModalSystem() {
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal__close, [data-modal-close]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.active');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    
    // Focus first focusable element
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
        focusableElements[0].focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        element.addEventListener('focus', function() {
            showTooltip(this);
        });
        
        element.addEventListener('blur', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element) {
    const text = element.getAttribute('data-tooltip');
    const position = element.getAttribute('data-tooltip-position') || 'top';
    
    // Remove existing tooltip
    hideTooltip();
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip--${position}`;
    tooltip.textContent = text;
    tooltip.id = 'active-tooltip';
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let top, left;
    
    switch (position) {
        case 'bottom':
            top = rect.bottom + 8;
            left = rect.left + (rect.width - tooltipRect.width) / 2;
            break;
        case 'left':
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.left - tooltipRect.width - 8;
            break;
        case 'right':
            top = rect.top + (rect.height - tooltipRect.height) / 2;
            left = rect.right + 8;
            break;
        default: // top
            top = rect.top - tooltipRect.height - 8;
            left = rect.left + (rect.width - tooltipRect.width) / 2;
    }
    
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    
    // Show tooltip
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
}

function hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ===== DROPDOWNS =====
function initDropdowns() {
    const dropdownTriggers = document.querySelectorAll('[data-dropdown]');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownId = this.getAttribute('data-dropdown');
            const dropdown = document.getElementById(dropdownId);
            
            if (dropdown) {
                toggleDropdown(dropdown);
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        const openDropdowns = document.querySelectorAll('.dropdown.active');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

function toggleDropdown(dropdown) {
    // Close other dropdowns
    const otherDropdowns = document.querySelectorAll('.dropdown.active');
    otherDropdowns.forEach(other => {
        if (other !== dropdown) {
            other.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('active');
}

// ===== TABS =====
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab__button');
        const tabPanels = container.querySelectorAll('.tab__panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-tab');
                const targetPanel = container.querySelector(`#${targetId}`);
                
                if (targetPanel) {
                    // Remove active class from all buttons and panels
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabPanels.forEach(panel => panel.classList.remove('active'));
                    
                    // Add active class to clicked button and target panel
                    this.classList.add('active');
                    targetPanel.classList.add('active');
                }
            });
        });
    });
}

// ===== ACCORDIONS =====
function initAccordions() {
    const accordionItems = document.querySelectorAll('.accordion__item');
    
    accordionItems.forEach(item => {
        const trigger = item.querySelector('.accordion__trigger');
        const content = item.querySelector('.accordion__content');
        
        if (trigger && content) {
            trigger.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items (if single-open behavior is desired)
                const accordion = item.closest('.accordion');
                if (accordion && accordion.hasAttribute('data-single')) {
                    const allItems = accordion.querySelectorAll('.accordion__item');
                    allItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                }
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ===== CAROUSELS =====
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel__track');
        const slides = carousel.querySelectorAll('.carousel__slide');
        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        const indicators = carousel.querySelectorAll('.carousel__indicator');
        
        if (!track || slides.length === 0) return;
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // Auto-play functionality
        const autoPlay = carousel.hasAttribute('data-autoplay');
        const autoPlayInterval = parseInt(carousel.getAttribute('data-autoplay-interval')) || 5000;
        let autoPlayTimer;
        
        function goToSlide(index) {
            currentIndex = index;
            const translateX = -currentIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
            
            // Update button states
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === totalSlides - 1;
        }
        
        function nextSlide() {
            if (currentIndex < totalSlides - 1) {
                goToSlide(currentIndex + 1);
            } else if (autoPlay) {
                goToSlide(0); // Loop back to first slide
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        
        function startAutoPlay() {
            if (autoPlay) {
                autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
            }
        }
        
        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
            }
        }
        
        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
            });
        });
        
        // Pause auto-play on hover
        if (autoPlay) {
            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });
        
        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
        });
        
        // Initialize
        goToSlide(0);
        startAutoPlay();
    });
}

// ===== UTILITY FUNCTIONS =====

// Create notification
function createNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('.notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${icons[type] || icons.info}</span>
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide
    setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Close button
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    return notification;
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Format date
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    return new Intl.DateTimeFormat('pt-BR', formatOptions).format(date);
}

// Format currency
function formatCurrency(amount, currency = 'BRL') {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).then(() => {
            createNotification('Copiado para a área de transferência!', 'success');
        }).catch(() => {
            createNotification('Erro ao copiar para a área de transferência.', 'error');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            createNotification('Copiado para a área de transferência!', 'success');
        } catch (err) {
            createNotification('Erro ao copiar para a área de transferência.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// Generate unique ID
function generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Export utility functions for global use
window.BooksyUtils = {
    createNotification,
    hideNotification,
    formatDate,
    formatCurrency,
    debounce,
    throttle,
    copyToClipboard,
    generateId,
    isInViewport,
    scrollToElement,
    openModal,
    closeModal
};
