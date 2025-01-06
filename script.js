// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sleigh setup
const sleighGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const sleighMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sleigh = new THREE.Mesh(sleighGeometry, sleighMaterial);
sleigh.position.set(0, 0.5, 0);
scene.add(sleigh);

// Enemy setup
const enemyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xAE08AE });
const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
enemy.position.set(5, 0.5, -5);
scene.add(enemy);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(sleigh.position);

// Game Over flag
let gameOver = false;

// Timer variables
let startTime = Date.now();
let elapsedTime = 0;

// Timer display
const timerDisplay = document.createElement('div');
timerDisplay.style.position = 'absolute';
timerDisplay.style.top = '10px';
timerDisplay.style.left = '10px';
timerDisplay.style.color = 'white';
timerDisplay.style.fontSize = '1.5rem';
timerDisplay.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(timerDisplay);

// Movement flags
const keys = { left: false, right: false, up: false, down: false };

// Event listeners for movement
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case "w": keys.up = true; break;
    case "ArrowDown":
    case "s": keys.down = true; break;
    case "ArrowLeft":
    case "a": keys.left = true; break;
    case "ArrowRight":
    case "d": keys.right = true; break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case "w": keys.up = false; break;
    case "ArrowDown":
    case "s": keys.down = false; break;
    case "ArrowLeft":
    case "a": keys.left = false; break;
    case "ArrowRight":
    case "d": keys.right = false; break;
  }
});

// Enemy follows the sleigh
function moveEnemyTowardsSleigh() {
  if (gameOver) return;

  const direction = new THREE.Vector3();
  direction.subVectors(sleigh.position, enemy.position).normalize();
  enemy.position.addScaledVector(direction, 0.05);

  const distance = enemy.position.distanceTo(sleigh.position);
  if (distance < 1) {
    console.log("Game Over! The enemy caught you!");
    gameOver = true;

    // Stop timer and display final time
    timerDisplay.innerText = `Final Time: ${elapsedTime.toFixed(2)}s`;

    const gameOverText = document.createElement('div');
    gameOverText.innerHTML = "<h1 style='color: white;'> oh oh oh Game Over!</h1>";
    gameOverText.style.position = 'absolute';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.fontSize = '3rem';
    gameOverText.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(gameOverText);
  }
}

// Animation loop
const sleighSpeed = 0.1;

function animate() {
  requestAnimationFrame(animate);

  if (!gameOver) {
    // Update timer
    elapsedTime = (Date.now() - startTime) / 1000;
    timerDisplay.innerText = `Time: ${elapsedTime.toFixed(2)}s`;

    // Sleigh movement
    if (keys.up) sleigh.position.z -= sleighSpeed;
    if (keys.down) sleigh.position.z += sleighSpeed;
    if (keys.left) sleigh.position.x -= sleighSpeed;
    if (keys.right) sleigh.position.x += sleighSpeed;

    // Enemy movement
    moveEnemyTowardsSleigh();

    // Camera follows sleigh
    camera.position.set(sleigh.position.x, sleigh.position.y + 5, sleigh.position.z + 10);
    camera.lookAt(sleigh.position);
  }

  renderer.render(scene, camera);
}

animate();
