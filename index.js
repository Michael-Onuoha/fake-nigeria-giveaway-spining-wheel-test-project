const spinButton = document.getElementById('circle-button');
const wheel = document.getElementById('circle');
const popup = document.getElementById('popup');
const popuptext = document.getElementById('popup-text');
const popupbutton = document.getElementById('popup-button');
const sound = new Audio('sounds/cash-register-purchase-87313.mp3');

// Store the current rotation
let currentRotation = 30;

spinButton.addEventListener('click', () => {
    spinButton.disabled = true; // Prevent multiple clicks
    
    // Generate a random rotation (2 to 5 full spins + random degrees)
    const randomSpin = Math.floor(Math.random() * 360) + 720;
    currentRotation += randomSpin;

    // Apply rotation
    wheel.style.transition = 'transform 3s ease-out';
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Detect segment after spin completes
    setTimeout(() => {
        spinButton.disabled = false;
        detectSegment(currentRotation);
    }, 3000);
});
function showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    
    // Create notification element
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerText = message;
    
    // Append to container
    container.appendChild(notification);

    // Remove notification after 4s
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Auto-generate notifications every 3 to 4 seconds
const messages = [
   "Chinedu O. from Lagos just won ₦50,000! 🎉",
    "Blessing A. (0903***6789) won an iPhone 15 Pro Max! 📱",
    "Emeka J. from Enugu just received ₦10,000 in airtime! 🔥",
    "Adamu K. (0812***3456) won ₦20,000 cash prize! 💰",
    "Oluwaseun B. (0706***8921) unlocked a free shopping voucher! 🛍",
    "A new winner is selected every minute! Will you be next? 🎯",
    "Mary I. from Abuja just won a brand-new Apple Watch! ⌚",
    "John P. (0809***1123) won a ₦5,000 Jumia voucher! 🛒",
    "Congratulations! A special offer is waiting for you 🎁",
    "Lucky spin! Victor C. from Port Harcourt got ₦15,000! 🚀",
    "🚨 Breaking: Someone just won ₦100,000 LIVE!",
    "David E. (0813***7654) unlocked a free hotel stay! 🏨",
    "🔥 Spin now—only 2 free attempts left for today!",
    "Rachael U. from Ibadan just won a Samsung S24 Ultra! 📦",
    "💳 Gift Card Alert: Akin O. (0902***8876) got a $50 Amazon card!",
];

const types = ["success", "error", "warning", "info"];

setInterval(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    showNotification(randomMessage, randomType);
}, Math.random() * (4000 - 3000) + 5000); // Random interval between 3 to 4 seconds

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5,
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiParticles.forEach((particle, index) => {
        particle.y += particle.speed;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();

        if (particle.y > canvas.height) {
            confettiParticles.splice(index, 1);
        }
    });

    requestAnimationFrame(drawConfetti);
}


popupbutton.addEventListener('click', () => {
   
   popup.classList.remove('show');
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
// Function to determine which segment was selected
function detectSegment(rotation) {
    const normalizedRotation = rotation % 360; // Get the final stopping angle
    let segment = '';
    popup.classList.add('show');
  

    if (normalizedRotation >= 0 && normalizedRotation < 60) {
        segment = 'Orange (#ff9f80) ';
        createConfetti();
        sound.play();
        popuptext.innerText = "You Just Won a Dollar ";
        
        drawConfetti();
    } else if (normalizedRotation >= 60 && normalizedRotation < 120) {
        segment = 'Yellow (#ffeead)';
        createConfetti();
        
        sound.play();
        popuptext.innerText = "You Just Won 100 Thousand Naira ";
        drawConfetti();
    } else if (normalizedRotation >= 120 && normalizedRotation < 180) {
        segment = 'green';
        createConfetti();
        
        sound.play();
        popuptext.innerText = "You Just Won 1 Bitcoin ";
        drawConfetti();
    } else if (normalizedRotation >= 180 && normalizedRotation < 240) {
        segment = 'Blue (#45b7d1)';
        createConfetti();
        
        sound.play();
        popuptext.innerText = "You Just Won 10 Naira "
        drawConfetti();
    } else if (normalizedRotation >= 240 && normalizedRotation < 300) {
        segment = 'Teal';
        createConfetti();
        
        sound.play();
              popuptext.innerText = "You Just Won An Iphone 16"
        drawConfetti();
    } else if (normalizedRotation >= 300 && normalizedRotation < 360) {
        segment = 'Red (#ff6b6b)';
        createConfetti();
        
        sound.play();
              popuptext.innerText = "You Just Won 2000 Naira "
        drawConfetti();
    }
    


}
