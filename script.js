// Dynamic effects for Christmas card

// Background music management
const backgroundMusic = document.getElementById('background-music');
const musicToggle = document.getElementById('music-toggle');
const musicOverlay = document.getElementById('music-start-overlay');

// Music start overlay handler
if (musicOverlay) {
    musicOverlay.addEventListener('click', () => {
        // Start the music
        backgroundMusic.muted = false;
        backgroundMusic.play().then(() => {
            console.log('🎵 Music started!');
            updateMusicButton();
            // Hide overlay with animation
            musicOverlay.classList.add('hidden');
            setTimeout(() => {
                musicOverlay.style.display = 'none';
            }, 500);
        }).catch((error) => {
            console.log('⚠️ Error starting music:', error);
        });
    });
}

// Function to update music button
const updateMusicButton = () => {
    if (backgroundMusic.paused) {
        musicToggle.textContent = '🔊';
        musicToggle.classList.remove('playing');
    } else {
        musicToggle.textContent = '🔇';
        musicToggle.classList.add('playing');
    }
};

// Music play/pause button
musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        console.log('🔊 Music playing');
    } else {
        backgroundMusic.pause();
        console.log('🔇 Music paused');
    }
    updateMusicButton();
});

// Create confetti
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

        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Dolphin interactivity
const dolphin = document.querySelector('.dolphin');
if (dolphin) {
    dolphin.addEventListener('click', () => {
        dolphin.style.animation = 'none';
        setTimeout(() => {
            dolphin.style.animation = 'jump 1s ease-out, float 3s ease-in-out infinite';
        }, 10);

        // Create hearts
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

// Christmas tree interactivity
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

// Create hearts
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

// Create sparkles
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

// Tree animation
function playTreeAnimation() {
    const tree = document.querySelector('.christmas-tree');
    tree.style.animation = 'none';
    setTimeout(() => {
        tree.style.animation = 'shake 0.5s ease-in-out, treeGlow 2s ease-in-out infinite alternate';
    }, 10);
}

// Parallax effect for decorations
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

// Snowflake color change
const snowflakes = document.querySelectorAll('.snowflake');
snowflakes.forEach(snowflake => {
    setInterval(() => {
        const colors = ['white', '#4ecdc4', '#ff6b6b', '#FFD700'];
        snowflake.style.color = colors[Math.floor(Math.random() * colors.length)];
    }, 3000);
});

// Greeting interactivity
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

// Sparkling cursor
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

// Sound effects (optional - you can add sounds)
const playSound = (type) => {
    // Placeholder for future sound effects
    console.log(`Playing ${type} sound`);
};

// Magic effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // Scrolling down
        document.body.style.filter = `hue-rotate(${currentScroll}deg)`;
    }

    lastScroll = currentScroll;
});

// Special midnight effect (if it's 00:00)
function checkMidnight() {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        createMidnightMagic();
    }
}

function createMidnightMagic() {
    // Massive confetti and fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 300);
    }

    // Change text
    const wish = document.querySelector('.wish');
    if (wish) {
        wish.innerHTML = '🎆 ЧЕСТИТА НОВА ГОДИНА! 🎆';
    }
}

// Check every minute
setInterval(checkMidnight, 60000);

// Anti-boredom mode - change background every 30 seconds
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

console.log('🎄 Christmas magic activated! 🎄');
console.log('💡 Click the dolphin for hearts!');
console.log('💡 Click the tree for sparkles!');
console.log('💡 Click the greeting for confetti!');
