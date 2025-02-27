// script.js
const ASCII_WORLD = `
       🌌🜇 🜂 🜁 🜄       
    ✨ 🌍 𝑈𝒩𝐼𝒱𝐸𝑅𝒮𝐸 🌠    
       🜅 🜆 🜀 🜃        
`.repeat(20);

// Scroll-controlled animations
let scrollProgress = 0;
window.addEventListener('scroll', () => {
  scrollProgress = window.scrollY / document.body.scrollHeight;
  document.documentElement.style.setProperty('--scroll', window.scrollY);
  document.documentElement.style.setProperty('--brightness', 
    `${100 - scrollProgress * 50}%`);
});

// ASCII Morphing
function morphCharacters() {
  const chars = ['🌌', '✨', '🌠', '★', '☆', '🜇', '🜂', '🜁', '🜄'];
  setInterval(() => {
    document.getElementById('ascii-world').textContent = 
      ASCII_WORLD.replace(/[🜇✨🌠★☆]/g, () => 
        chars[Math.floor(Math.random() * chars.length)]);
  }, 100);
}

// Mini-Game System
function createMiniGame() {
  const gameContainer = document.getElementById('mini-game');
  let score = 0;
  
  const gameLoop = setInterval(() => {
    const asteroid = document.createElement('div');
    asteroid.textContent = '💫';
    asteroid.style.position = 'absolute';
    asteroid.style.left = Math.random() * 100 + '%';
    asteroid.style.animation = 'fall 2s linear';
    asteroid.addEventListener('animationend', () => asteroid.remove());
    gameContainer.appendChild(asteroid);
  }, 1000);

  document.addEventListener('click', (e) => {
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    if (elements.some(el => el.textContent === '💫')) {
      score++;
      elements.find(el => el.textContent === '💫').remove();
      gameContainer.textContent = `Score: ${score} | Shoot the asteroids!`;
    }
  });
}

// Weather System
const WEATHER_TYPES = {
  rain: '🌧️',
  snow: '❄️',
  storm: '🌩️',
  clear: '✨'
};

function createWeather() {
  setInterval(() => {
    const weather = Object.keys(WEATHER_TYPES)[
      Math.floor(Math.random() * Object.keys(WEATHER_TYPES).length)];
    document.documentElement.style.setProperty('--weather', weather);
    
    // Create particles
    for(let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'weather-particle';
      particle.textContent = WEATHER_TYPES[weather];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 3 + 1 + 's';
      document.getElementById('weather-system').appendChild(particle);
      setTimeout(() => particle.remove(), 5000);
    }
  }, 5000);
}

// Day/Night Cycle
function updateTime() {
  setInterval(() => {
    const time = Date.now() / 1000 % 60;
    document.documentElement.style.setProperty('--time-of-day', time);
    document.getElementById('time-display').textContent = 
      new Date().toLocaleTimeString();
    
    // Update background based on time
    document.body.style.background = `hsl(${240 - time * 4}, 80%, ${
      10 + Math.abs(Math.sin(time)) * 40}%)`;
  }, 1000);
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ascii-world').textContent = ASCII_WORLD;
  morphCharacters();
  createMiniGame();
  createWeather();
  updateTime();
  
  // Mouse interaction
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', 
      (e.clientX / window.innerWidth - 0.5) * 2);
    document.documentElement.style.setProperty('--mouse-y', 
      (e.clientY / window.innerHeight - 0.5) * 2);
  });
});