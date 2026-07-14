const CORRECT_PASSWORD = "18.07.2025";

const DEFAULT_MOMENTS = [
    'Помнишь наш первый медляк? Когда мы стояли на вытянутых руках и не понимали зачем это все?',
    'Помнишь как нас шиперили, а мы крутили факи стоя в обнимку на очередном медляке и говорили "Мы просто друзья на смену"?',
    'Ты первая предложила поцеловать меня',
    'Помнишь как мы бежали к тебе под дождем а потом я наколдовал букетик цветов?',
    'Помнишь как ты играла в грени, а я засыпал у тебя на плече?',
    'Я пишу это, а время 3.40, скоро рассвет'
];

function initDefaultData() {
    let gallery = JSON.parse(localStorage.getItem('poly_gallery')) || [];
    let moments = JSON.parse(localStorage.getItem('poly_moments')) || [];
    
    if (gallery.length === 0) {
        const defaultGallery = [];
        for (let i = 1; i <= 55; i++) {
            let timestamp;
            if (i <= 4) {
                timestamp = '2026-07-08_15-13-30';
            } else {
                timestamp = '2026-07-08_15-13-31';
            }
            defaultGallery.push(`photos/photo_${i}_${timestamp}.jpg`);
        }
        localStorage.setItem('poly_gallery', JSON.stringify(defaultGallery));
    }
    
    if (moments.length === 0) {
        localStorage.setItem('poly_moments', JSON.stringify(DEFAULT_MOMENTS));
    }
}

function updateDaysCounter() {
    const startDate = new Date(2025, 6, 18);
    const today = new Date();
    
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const counterElement = document.getElementById('days-counter');
    if (counterElement) {
        counterElement.textContent = diffDays >= 0 ? diffDays : 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDefaultData();
    updateDaysCounter();
    renderGallery();
    renderMoments();
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

document.querySelectorAll('.to-menu').forEach(btn => {
    btn.addEventListener('click', () => {
        showScreen('screen-menu');
        updateDaysCounter();
    });
});

const passwordInput = document.getElementById('password-input');
const btnSubmitPassword = document.getElementById('btn-submit-password');

if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2 && value.length <= 4) {
            value = value.slice(0, 2) + '.' + value.slice(2);
        } else if (value.length > 4) {
            value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4, 8);
        }
        e.target.value = value;
    });
}

if (btnSubmitPassword) {
    btnSubmitPassword.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            showScreen('screen-virus');
        } else {
            alert('Ой, кажется дата неверная... Попробуй ещё раз! 🥺');
            passwordInput.value = '';
        }
    });
}

document.getElementById('btn-virus-exit')?.addEventListener('click', () => {
    showScreen('screen-no-trust');
});

document.getElementById('btn-virus-continue')?.addEventListener('click', () => {
    showScreen('screen-trust');
});

document.getElementById('btn-back-from-sad')?.addEventListener('click', () => {
    showScreen('screen-virus');
});

document.getElementById('btn-go-to-menu')?.addEventListener('click', () => {
    showScreen('screen-menu');
});

document.getElementById('nav-gallery')?.addEventListener('click', () => {
    showScreen('screen-gallery');
    renderGallery();
});

document.getElementById('nav-moments')?.addEventListener('click', () => {
    showScreen('screen-moments');
    renderMoments();
});

document.getElementById('nav-surprise')?.addEventListener('click', () => {
    showScreen('screen-surprise');
    setTimeout(initHeartAnimation, 50);
});


function openFullscreen(imageSrc) {
 
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.92);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
        padding: 20px;
    `;
    
 
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        width: 44px;
        height: 44px;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    closeBtn.onmouseover = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        closeBtn.style.transform = 'scale(1.1)';
    };
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1)';
    };
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeFullscreen();
    };
    
 
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 95vw;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        animation: zoomIn 0.4s ease;
        user-select: none;
        -webkit-user-select: none;
    `;
    
 
    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    
 
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            closeFullscreen();
        }
    };
    
  
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    };
    document.addEventListener('keydown', escHandler);
    

    overlay._escHandler = escHandler;
    
   
    if (!document.getElementById('fullscreen-styles')) {
        const style = document.createElement('style');
        style.id = 'fullscreen-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeFullscreen() {
    const overlay = document.querySelector('.fullscreen-overlay');
    if (overlay) {
       
        if (overlay._escHandler) {
            document.removeEventListener('keydown', overlay._escHandler);
        }
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => {
            overlay.remove();
        }, 200);
    }
}

const galleryUpload = document.getElementById('gallery-upload');
const galleryGrid = document.getElementById('gallery-grid');

if (galleryUpload) {
    galleryUpload.addEventListener('change', (e) => {
        const files = e.target.files;
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                compressAndSaveImage(base64Image);
            };
            reader.readAsDataURL(file);
        }
    });
}

function compressAndSaveImage(base64Data) {
    const img = new Image();
    img.src = base64Data;
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
                height = height * MAX_SIZE / width;
                width = MAX_SIZE;
            } else {
                width = width * MAX_SIZE / height;
                height = MAX_SIZE;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        saveImageToStorage(compressed);
    };
}

function saveImageToStorage(base64Data) {
    let images = JSON.parse(localStorage.getItem('poly_gallery')) || [];
    images.push(base64Data);
    try {
        localStorage.setItem('poly_gallery', JSON.stringify(images));
        renderGallery();
        showToast('✅ Фото добавлено!');
    } catch (e) {
        alert('Упс! Фотография слишком большая или память телефона переполнена 💔');
    }
}

function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    let images = JSON.parse(localStorage.getItem('poly_gallery')) || [];
    
    if (images.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 40px; color: #999;';
        emptyMessage.textContent = '📸 Здесь пока пусто. Загрузите ваши совместные фото!';
        galleryGrid.appendChild(emptyMessage);
        return;
    }
    
   
    images.forEach((imgData, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
     
        const imgSrc = imgData;
        
     
        if (index < 20) {
            item.innerHTML = `<img src="${imgData}" alt="Наше фото" loading="lazy">`;
        } else {
            item.innerHTML = `<img src="${imgData}" alt="Наше фото" loading="lazy" style="background: #f0f0f0;">`;
           
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector('img');
                        img.src = imgData;
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(item);
        }
        
    
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                openFullscreen(img.src);
            }
        });
        
        galleryGrid.appendChild(item);
    });
}

window.exportGallery = function() {
    const images = JSON.parse(localStorage.getItem('poly_gallery')) || [];
    if (images.length === 0) {
        showToast('❌ Галерея пуста, нечего сохранять');
        return;
    }
    
    const dataStr = JSON.stringify(images);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `gallery_backup_${new Date().toLocaleDateString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    showToast('💾 Фото сохранены в файл!');
}

window.importGallery = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const images = JSON.parse(event.target.result);
                if (!Array.isArray(images)) {
                    throw new Error('Неверный формат файла');
                }
                
                if (images.length === 0) {
                    showToast('📂 Файл пуст');
                    return;
                }
                
                const currentImages = JSON.parse(localStorage.getItem('poly_gallery')) || [];
                const merged = currentImages.concat(images);
                localStorage.setItem('poly_gallery', JSON.stringify(merged));
                renderGallery();
                showToast(`✅ Загружено ${images.length} фото!`);
            } catch (err) {
                showToast('❌ Ошибка: неверный формат файла');
                console.error(err);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

window.clearGallery = function() {
    if (confirm('🥺 Ты точно хочешь удалить ВСЕ фотографии? Это нельзя будет отменить!')) {
        const images = JSON.parse(localStorage.getItem('poly_gallery')) || [];
        if (images.length === 0) {
            showToast('📸 Галерея уже пуста');
            return;
        }
        
        if (confirm(`Удалить ${images.length} фото?`)) {
            localStorage.setItem('poly_gallery', JSON.stringify([]));
            renderGallery();
            showToast('🗑️ Галерея очищена');
        }
    }
}

const momentTextarea = document.getElementById('moment-textarea');
const btnAddMoment = document.getElementById('btn-add-moment');
const momentsList = document.getElementById('moments-list');

if (btnAddMoment) {
    btnAddMoment.addEventListener('click', () => {
        const text = momentTextarea.value.trim();
        if (!text) {
            showToast('✏️ Напиши что-нибудь!');
            return;
        }

        let moments = JSON.parse(localStorage.getItem('poly_moments')) || [];
        moments.push(text);
        localStorage.setItem('poly_moments', JSON.stringify(moments));
        
        momentTextarea.value = '';
        renderMoments();
        showToast('📝 Момент сохранен!');
    });
}

function renderMoments() {
    if (!momentsList) return;
    momentsList.innerHTML = '';
    let moments = JSON.parse(localStorage.getItem('poly_moments')) || [];
    
    if (moments.length === 0) {
        momentsList.innerHTML = `<div class="moment-card">«Помнишь наш первый день вместе? Здесь будут жить наши воспоминания...»</div>`;
        return;
    }

    moments.forEach((text) => {
        const card = document.createElement('div');
        card.className = 'moment-card';
        card.textContent = text;
        momentsList.appendChild(card);
    });
  
    momentsList.scrollTop = momentsList.scrollHeight;
}

window.exportMoments = function() {
    const moments = JSON.parse(localStorage.getItem('poly_moments')) || [];
    if (moments.length === 0) {
        showToast('❌ Нет моментов для сохранения');
        return;
    }
    
    const dataStr = JSON.stringify(moments);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `moments_backup_${new Date().toLocaleDateString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
    showToast('💾 Моменты сохранены в файл!');
}

window.importMoments = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const moments = JSON.parse(event.target.result);
                if (!Array.isArray(moments)) {
                    throw new Error('Неверный формат файла');
                }
                
                if (moments.length === 0) {
                    showToast('📂 Файл пуст');
                    return;
                }
                
                const currentMoments = JSON.parse(localStorage.getItem('poly_moments')) || [];
                const merged = currentMoments.concat(moments);
                localStorage.setItem('poly_moments', JSON.stringify(merged));
                renderMoments();
                showToast(`✅ Загружено ${moments.length} моментов!`);
            } catch (err) {
                showToast('❌ Ошибка: неверный формат файла');
                console.error(err);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

window.clearMoments = function() {
    if (confirm('🥺 Ты точно хочешь удалить ВСЕ моменты? Это нельзя будет отменить!')) {
        const moments = JSON.parse(localStorage.getItem('poly_moments')) || [];
        if (moments.length === 0) {
            showToast('📝 Моментов нет');
            return;
        }
        
        if (confirm(`Удалить ${moments.length} моментов?`)) {
            localStorage.setItem('poly_moments', JSON.stringify([]));
            renderMoments();
            showToast('🗑️ Все моменты удалены');
        }
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 30px;
        font-family: var(--font-main);
        font-size: 0.95rem;
        z-index: 9999;
        animation: slideUp 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(toast);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function initHeartAnimation() {
    const canvas = document.getElementById('heart-canvas');
    const scratchLayer = document.getElementById('scratch-layer');
    const ticket = document.getElementById('scratch-ticket');
    
    if (!canvas || !scratchLayer || !ticket) return;
    
    const ctx = scratchLayer.getContext('2d');
    let isDrawing = false;
    let lastSparkleTime = 0;

    canvas.querySelectorAll('.star').forEach(star => star.remove());

    const starCount = 60;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 1}s`);
        star.style.setProperty('--opacity', Math.random() * 0.7 + 0.3);
        canvas.appendChild(star);
    }

    scratchLayer.width = ticket.offsetWidth || 300;
    scratchLayer.height = ticket.offsetHeight || 380;

    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, scratchLayer.width, scratchLayer.height);
    
    for (let i = 0; i < scratchLayer.width; i += 8) {
        for (let j = 0; j < scratchLayer.height; j += 8) {
            if (Math.random() > 0.6) {
                ctx.fillStyle = '#d3d3d3';
                ctx.fillRect(i, j, 2, 2);
            }
        }
    }

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = (window.innerWidth < 768) ? 25 : 35;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    function createSparkle(clientX, clientY) {
        const now = Date.now();
        if (now - lastSparkleTime < 30) return;
        lastSparkleTime = now;

        const rect = canvas.getBoundingClientRect();
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        
        const isSmall = Math.random() > 0.4;
        const size = isSmall ? (Math.random() * 3 + 2) : (Math.random() * 4 + 5);
        const lifeTime = isSmall ? 2200 : 1000;

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${clientX - rect.left}px`;
        sparkle.style.top = `${clientY - rect.top}px`;
        sparkle.style.animationDuration = `${lifeTime}ms`;
        
        const offsetSize = Math.random() * 12 - 6;
        sparkle.style.marginLeft = `${offsetSize}px`;
        sparkle.style.marginTop = `${offsetSize}px`;
        
        canvas.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), lifeTime);
    }

    function getMousePos(e) {
        const rect = scratchLayer.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top,
            clientX: clientX,
            clientY: clientY
        };
    }

    function handleStart(e) {
        isDrawing = true;
        const pos = getMousePos(e);
        createSparkle(pos.clientX, pos.clientY);
        
        if (e.target === scratchLayer) {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }
    }

    function handleMove(e) {
        const pos = getMousePos(e);
        createSparkle(pos.clientX, pos.clientY);
        
        if (!isDrawing) return;
        
        if (e.target === scratchLayer) {
            if (e.cancelable) e.preventDefault();
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    }

    function handleEnd() {
        isDrawing = false;
    }

    canvas.onmousedown = handleStart;
    canvas.onmousemove = handleMove;
    window.onmouseup = handleEnd;

    canvas.addEventListener('touchstart', handleStart, { passive: false });
    canvas.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
}
