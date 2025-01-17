// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a video element
const video = document.createElement('video');
video.src = './img/sneeuw-ezgif.com-gif-to-mp4-converter.mp4'; // Path to your video file
video.loop = true; // Loop the video
video.muted = true; // Mute if there's audio
video.play(); // Start playing the video

// Create a video texture
const videoTexture = new THREE.VideoTexture(video);

// Set the video texture as the scene's background
scene.background = videoTexture;

// Ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x008000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Sleigh setup
const sleighGeometry = new THREE.BoxGeometry(1, 0.5, 2);
const sleighMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sleigh = new THREE.Mesh(sleighGeometry, sleighMaterial);
sleigh.position.set(0, 0.5, 0);
scene.add(sleigh);
// Define sleigh speed globally
const sleighSpeed = 0.1;

// Enemy setup
const enemies = []; // Array to store all enemies

function createEnemy() {
  const enemyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xAE08AE });
  const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
  
  // Spawn at a random position within a range
  enemy.position.set(
    (Math.random() - 0.5) * 20, // Random x position
    0.5,                        // Y position above the ground
    (Math.random() - 0.5) * 20  // Random z position
  );
  
  scene.add(enemy);
  enemies.push(enemy); // Add enemy to the array
}

const enemySpawnInterval = 5000; // Spawn every 5 seconds (5000ms)

// Start spawning enemies
setInterval(() => {
  if (!gameOver) {
    createEnemy();
  }
}, enemySpawnInterval);
console.log("nieuwe enemy is er");

let spawnRate = 5000; // Start with 5 seconds
let difficultyTimer;

function startDifficultyTimer() {
  difficultyTimer = setInterval(() => {
    if (spawnRate > 1000) { // Set a minimum spawn rate (e.g., 1 second)
      spawnRate -= 500; // Decrease spawn rate by 500ms
      console.log(`Spawn rate increased: ${spawnRate}ms`);
    }
  }, 10000); // Every 10 seconds, increase difficulty
}

// Call this function to start the difficulty timer
startDifficultyTimer();

// Adjust the spawnEnemy interval
setInterval(() => {
  if (!gameOver) {
    spawnEnemy();
  }
}, spawnRate);

let baseEnemySpeed = 0.05; // Initial speed

function increaseEnemySpeed() {
  setInterval(() => {
    baseEnemySpeed += 0.01; // Increase speed
    console.log(`Enemy speed increased: ${baseEnemySpeed}`);
  }, 10000); // Every 10 seconds
}

// Use `baseEnemySpeed` in move logic
function moveEnemiesTowardsSleigh() {
  enemies.forEach((enemy) => {
    const direction = new THREE.Vector3();
    direction.subVectors(sleigh.position, enemy.position).normalize();
    enemy.position.addScaledVector(direction, baseEnemySpeed);
  });
}

function spawnEnemy() {
    const enemyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let enemyMaterial;
    let enemySpeed;
  
    // Randomly choose an enemy type
    const enemyType = Math.floor(Math.random() * 3); // 3 types: 0, 1, 2
  
    if (enemyType === 0) {
      enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xAE08AE }); // Default
      enemySpeed = 0.05; // Normal speed
    } else if (enemyType === 1) {
      enemyMaterial = new THREE.MeshBasicMaterial({ color: 0x00FF00 }); // Fast enemy
      enemySpeed = 0.1; // Faster
    } else {
      enemyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF }); // Slow but tanky
      enemySpeed = 0.03; // Slower but more durable
    }
  
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    enemy.speed = enemySpeed; // Store speed as a property
  
    // Randomize the spawn position
    enemy.position.set(
      (Math.random() - 0.5) * 20, // Random x position
      0.5,                       // Fixed y position
      (Math.random() - 0.5) * 20 // Random z position
    );
  
    scene.add(enemy);
    enemies.push(enemy); // Add to enemies array
  }

// Gift setup
function createGift() {
  const giftGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const giftMaterial = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
  const gift = new THREE.Mesh(giftGeometry, giftMaterial);
  gift.position.set(
    (Math.random() - 0.5) * 20, // Random x position
    0.5,                       // Y position above the ground
    (Math.random() - 0.5) * 20 // Random z position
  );
  scene.add(gift);
  return gift;
}

let currentGift = createGift();
const collectedGifts = []; // Array to store collected gifts
// document.body.appendChild(collectedGifts);
// collectedGifts.style.position = 'absolute';
// collectedGifts.style.top = '5px';
// collectedGifts.style.left = '10px';
// collectedGifts.style.color = 'white';
// collectedGifts.style.fontSize = '1.5rem';
// collectedGifts.style.fontFamily = 'Arial, sans-serif';

// Timer variables
let remainingTime = 10; // Start with 10 seconds
const timeExtension = 5; // Add 5 seconds per gift
let lastUpdateTime = Date.now(); // For tracking elapsed time

// Timer display
const timerDisplay = document.createElement('div');
timerDisplay.style.position = 'absolute';
timerDisplay.style.top = '10px';
timerDisplay.style.left = '10px';
timerDisplay.style.color = 'white';
timerDisplay.style.fontSize = '1.5rem';
timerDisplay.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(timerDisplay);

// Game Over logic
function handleGameOver() {
  gameOver = true;

  // Display final message
  const gameOverText = document.createElement('div');
  gameOverText.innerHTML = "<h1 style='color: white;'> Oh oh oh! Game Over! Time's up!</h1>";
  gameOverText.style.position = 'absolute';
  gameOverText.style.top = '50%';
  gameOverText.style.left = '50%';
  gameOverText.style.transform = 'translate(-50%, -50%)';
  gameOverText.style.fontSize = '3rem';
  gameOverText.style.fontFamily = 'Arial, sans-serif';
  document.body.appendChild(gameOverText);
}

// Update timer every frame
function updateTimer() {
  const now = Date.now();
  const deltaTime = (now - lastUpdateTime) / 1000; // Convert to seconds
  lastUpdateTime = now;

  remainingTime -= deltaTime; // Decrease the timer
  timerDisplay.innerText = `Time Left: ${Math.max(remainingTime.toFixed(2), 0)}s`;

  // End game if time runs out
  if (remainingTime <= 0) {
    handleGameOver();
  }
}

// Update the gift collection logic
function checkCollisions() {
  if (sleigh.position.distanceTo(currentGift.position) < 1) {
    // Remove the current gift
    scene.remove(currentGift);

    // Add the gift to the collectedGifts array
    collectedGifts.push(currentGift);

    // Ensure it stays in the scene
    scene.add(currentGift);

    console.log('Gift collected! Time extended.');

    // Extend the timer
    remainingTime += timeExtension;

    // Spawn a new gift
    currentGift = createGift();
  }
}

function updateCollectedGifts() {
  let previousPosition = sleigh.position.clone(); // Start with the sleigh's position

  // Iterate through the collected gifts
  for (let i = 0; i < collectedGifts.length; i++) {
    const gift = collectedGifts[i];

    // Calculate target position (space gifts behind each other)
    const offset = new THREE.Vector3(0, 0, -(i + 1) * 1.5); // Adjust spacing
    const targetPosition = previousPosition.clone().add(offset);

    // Smoothly interpolate gift position
    gift.position.lerp(targetPosition, 0.1);

    // Update previous position to current gift's position
    previousPosition = gift.position.clone();
  }
}

function animateGifts() {
  for (let i = 0; i < collectedGifts.length; i++) {
    collectedGifts[i].rotation.y += 0.05; // Spin the gift
  }
}

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(sleigh.position);

// Game Over flag
let gameOver = false;

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

// Move enemies towards the sleigh
function moveEnemiesTowardsSleigh() {
  if (gameOver) return;

  enemies.forEach((enemy) => {
    const direction = new THREE.Vector3();
    direction.subVectors(sleigh.position, enemy.position).normalize();
    enemy.position.addScaledVector(direction, enemy.speed);

    const distance = enemy.position.distanceTo(sleigh.position);
    if (distance < 1) {
      console.log("Game Over! An enemy caught you!");
      gameOver = true;

      // Stop timer and display final time
      timerDisplay.innerText = `Final Time: ${remainingTime.toFixed(2)}s`;

      const gameOverText = document.createElement('div');
      gameOverText.innerHTML = "<h1 style='color: white;'> Oh oh oh! Game Over!</h1>";
      gameOverText.style.position = 'absolute';
      gameOverText.style.top = '50%';
      gameOverText.style.left = '50%';
      gameOverText.style.transform = 'translate(-50%, -50%)';
      gameOverText.style.fontSize = '3rem';
      gameOverText.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(gameOverText);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  if (!gameOver) {
    // Update timer
    updateTimer();

    // Sleigh movement
    if (keys.up) sleigh.position.z -= sleighSpeed;
    if (keys.down) sleigh.position.z += sleighSpeed;
    if (keys.left) sleigh.position.x -= sleighSpeed;
    if (keys.right) sleigh.position.x += sleighSpeed;

    // Move all enemies
    moveEnemiesTowardsSleigh();

    // Collision detection
    checkCollisions();

    // Update collected gifts
    updateCollectedGifts();

    // Camera follows sleigh
    camera.position.set(sleigh.position.x, sleigh.position.y + 5, sleigh.position.z + 10);
    camera.lookAt(sleigh.position);
  }

  renderer.render(scene, camera);
}

animate();
