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

// Enemy setup
const enemyGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xAE08AE });
const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
enemy.position.set(5, 0.5, -5);
scene.add(enemy);

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

function checkCollisions() {
  if (sleigh.position.distanceTo(currentGift.position) < 1) {
    // Remove the current gift
    scene.remove(currentGift);

    // Add the gift to the collectedGifts array
    collectedGifts.push(currentGift);

    // Ensure it stays in the scene
    scene.add(currentGift);

    console.log('Je hebt er eentje! ');

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
    gameOverText.innerHTML = "<h1 style='color: white;'> Oh oh oh! Game Over!</h1>";
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

    // Collision detection
    checkCollisions();

    // Update collected gifts
    updateCollectedGifts();

    // Spin gifts
    animateGifts();

    // Camera follows sleigh
    camera.position.set(sleigh.position.x, sleigh.position.y + 5, sleigh.position.z + 10);
    camera.lookAt(sleigh.position);
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();
