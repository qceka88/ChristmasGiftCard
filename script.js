// Динамични ефекти за коледната картичка

// Управление на фоновата музика
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
let soundUnmuted = false;

// Функция за актуализиране на бутона
const updateMusicButton = () => {
    if (backgroundMusic.muted) {
        musicToggle.textContent = '🔇';
        musicToggle.classList.remove('playing');
    } else {
        musicToggle.textContent = '🔊';
        musicToggle.classList.add('playing');
        soundUnmuted = true;
    }
};

// Опит за автоматично стартиране при зареждане
window.addEventListener('load', () => {
    // Задаване на volume
    backgroundMusic.volume = 0.5;

    // Проверка дали аудиото свири
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('🎵 Музиката стартира автоматично (muted)');
            updateMusicButton();

            // Добавяне на визуална индикация за unmute
            if (backgroundMusic.muted) {
                musicToggle.style.animation = 'bounce 1s ease infinite';
            }
        }).catch((error) => {
            console.log('⚠️ Autoplay блокирано:', error);
            musicToggle.style.animation = 'bounce 1s ease infinite';
        });
    }

    // Конфети ефект при зареждане
    setTimeout(() => {
        createConfetti();
    }, 500);
});

// Проверка на състоянието на музиката
backgroundMusic.addEventListener('volumechange', updateMusicButton);

// Unmute музиката при първо взаимодействие
const unmuteMusicOnInteraction = () => {
    if (!soundUnmuted && backgroundMusic.muted) {
        backgroundMusic.muted = false;
        console.log('🎵 Звукът е включен!');
        updateMusicButton();
        musicToggle.style.animation = '';
    }
};

// Unmute при първо кликване/движение навсякъде
document.addEventListener('click', unmuteMusicOnInteraction, { once: true });
document.addEventListener('touchstart', unmuteMusicOnInteraction, { once: true });
document.addEventListener('keydown', unmuteMusicOnInteraction, { once: true });

// Бутон за mute/unmute на музиката
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    musicToggle.style.animation = ''; // Спиране на bounce анимацията

    backgroundMusic.muted = !backgroundMusic.muted;
    updateMusicButton();

    console.log(backgroundMusic.muted ? '🔇 Звукът е изключен' : '🔊 Звукът е включен');
});

// Създаване на конфети
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#FFD700', '#ff9ff3', '#54a0ff'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);

        // Премахване след анимацията
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Интерактивност на делфинчето
const dolphin = document.querySelector('.dolphin');
if (dolphin) {
    dolphin.addEventListener('click', () => {
        dolphin.style.animation = 'none';
        setTimeout(() => {
            dolphin.style.animation = 'jump 1s ease-out, float 3s ease-in-out infinite';
        }, 10);

        // Създаване на сърца
        createHearts(dolphin);
    });

    dolphin.addEventListener('mouseenter', () => {
        dolphin.style.transform = 'scale(1.1) rotate(5deg)';
        dolphin.style.transition = 'transform 0.3s ease';
    });

    dolphin.addEventListener('mouseleave', () => {
        dolphin.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Интерактивност на коледното дърво
const tree = document.querySelector('.christmas-tree');
if (tree) {
    tree.addEventListener('click', () => {
        createSparkles(tree);
        playTreeAnimation();
    });

    tree.addEventListener('mouseenter', () => {
        tree.style.transform = 'scale(1.05) rotate(2deg)';
        tree.style.transition = 'transform 0.3s ease';
    });

    tree.addEventListener('mouseleave', () => {
        tree.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Създаване на сърца
function createHearts(element) {
    const hearts = ['❤️', '💙', '💚', '💛', '💜'];
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = rect.top + 'px';
        heart.style.animationDelay = (i * 0.2) + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Създаване на искри
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 20;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = '✨';

        const angle = (Math.PI * 2 * i) / sparkleCount;
        const radius = 100;

        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        sparkle.style.setProperty('--tx', Math.cos(angle) * radius + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * radius + 'px');

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Анимация на дървото
function playTreeAnimation() {
    const tree = document.querySelector('.christmas-tree');
    tree.style.animation = 'none';
    setTimeout(() => {
        tree.style.animation = 'shake 0.5s ease-in-out, treeGlow 2s ease-in-out infinite alternate';
    }, 10);
}

// Паралакс ефект за декорациите
document.addEventListener('mousemove', (e) => {
    const decorations = document.querySelectorAll('.decoration');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    decorations.forEach((decoration, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        decoration.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Промяна на цвета на снежинките при преминаване
const snowflakes = document.querySelectorAll('.snowflake');
snowflakes.forEach(snowflake => {
    setInterval(() => {
        const colors = ['white', '#4ecdc4', '#ff6b6b', '#FFD700'];
        snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];
    }, 3000);
});

// Интерактивност на поздрава
const wish = document.querySelector('.wish');
if (wish) {
    wish.addEventListener('click', () => {
        wish.style.animation = 'none';
        setTimeout(() => {
            wish.style.animation = 'rainbow 2s ease-in-out, pulse 2s ease-in-out infinite';
        }, 10);
        createConfetti();
    });
}

// Искрящ курсор
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
});

// Звукови ефекти (опционално - можеш да добавиш звуци)
const playSound = (type) => {
    // Placeholder за бъдещи звукови ефекти
    console.log(`Playing ${type} sound`);
};

// Добавяне на магически ефект при скролиране
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // Скролване надолу
        document.body.style.filter = `hue-rotate(${currentScroll}deg)`;
    }

    lastScroll = currentScroll;
});

// Специален ефект в полунощ (ако е 00:00)
function checkMidnight() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        createMidnightMagic();
    }
}

function createMidnightMagic() {
    // Масивно конфети и фойерверки
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 300);
    }

    // Промяна на текста
    const wish = document.querySelector('.wish');
    if (wish) {
        wish.innerHTML = '🎆 ЧЕСТИТА НОВА ГОДИНА! 🎆';
    }
}

// Проверка всяка минута
setInterval(checkMidnight, 60000);

// Защитен режим срещу скука - промяна на фона на всеки 30 секунди
let bgIndex = 0;
const backgrounds = [
    'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
    'linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d)',
    'linear-gradient(to bottom, #134e5e, #71b280)',
    'linear-gradient(to bottom, #360033, #0b8793)'
];

setInterval(() => {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    document.body.style.background = backgrounds[bgIndex];
    document.body.style.transition = 'background 2s ease-in-out';
}, 30000);

console.log('🎄 Коледна магия активирана! 🎄');
console.log('💡 Кликни на делфинчето за сърца!');
console.log('💡 Кликни на дървото за искри!');
console.log('💡 Кликни на поздрава за конфети!');
