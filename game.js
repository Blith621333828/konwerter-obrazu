const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: 50,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    color: 'red',
    dy: 0,
    jumpStrength: 20,
    gravity: 1,
    isJumping: false
};

const keys = {
    left: false,
    right: false,
    up: false
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function updatePlayer() {
    if (keys.left && player.x > 0) {
        player.x -= 5;
    }
    if (keys.right && player.x < canvas.width - player.width) {
        player.x += 5;
    }
    if (keys.up && !player.isJumping) {
        player.dy = -player.jumpStrength;
        player.isJumping = true;
    }

    player.y += player.dy;
    player.dy += player.gravity;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.isJumping = false;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    clearCanvas();
    drawPlayer();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') keys.up = false;
});

gameLoop();
