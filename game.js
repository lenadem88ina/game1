const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let gridSize = 20;
let tileCount = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

let touchStartX = 0;
let touchStartY = 0;

function adjustCanvasSize() {
  const container = document.getElementById("game-container");
  const size = Math.min(container.clientWidth, window.innerHeight * 0.8);
  canvas.width = size;
  canvas.height = size;
  tileCount = Math.floor(size / gridSize);
}

function startGame() {
  adjustCanvasSize();
  document.addEventListener("keydown", handleKeyPress);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchmove", handleTouchMove);
  gameLoop = setInterval(gameTick, 100);
}

function restartGame() {
  snake = [{ x: 10, y: 10 }];
  food = { x: 15, y: 15 };
  dx = 0;
  dy = 0;
  score = 0;
  scoreDisplay.textContent = `Счёт: ${score}`;
  Telegram.WebApp.MainButton.hide();
  clearInterval(gameLoop);
  startGame();
}

function gameTick() {
  moveSnake();
  checkCollision();
  drawGame();
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreDisplay.textContent = `Счёт: ${score}`;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * tileCount);
  food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
  const head = snake[0
