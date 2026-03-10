const slider = document.querySelector('.wrapper-timeline');
let isDown = false;
let startX;
let scrollLeft;

// Variáveis para a física
let velX = 0;          // Velocidade atual
let momentumID;        // ID da animação para podermos cancelá-la
let lastMouseX;        // Última posição do mouse para calcular a velocidade

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('grabbing');
  
  // Cancela qualquer movimento de inércia anterior ao clicar novamente
  cancelAnimationFrame(momentumID);
  
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  lastMouseX = e.pageX; 
});

slider.addEventListener('mouseleave', () => {
  if (!isDown) return;
  isDown = false;
  slider.classList.remove('grabbing');
  beginMomentum();
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('grabbing');
  beginMomentum(); // Inicia o efeito de deslizar
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1;
  
  // Calcula a velocidade baseada na diferença entre o movimento atual e o anterior
  velX = e.pageX - lastMouseX;
  lastMouseX = e.pageX;

  slider.scrollLeft = scrollLeft - walk;
});

// --- Funções de Física ---

function beginMomentum() {
  cancelAnimationFrame(momentumID);
  momentumID = requestAnimationFrame(momentumLoop);
}

function momentumLoop() {
  slider.scrollLeft -= velX; // Aplica o movimento
  velX *= .93; // Fricção: quanto menor o número, mais rápido ele para (ex: 0.90)

  // Para a animação quando a velocidade for quase zero
  if (Math.abs(velX) > 0.5) {
    momentumID = requestAnimationFrame(momentumLoop);
  }
}
