const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

class Heart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.size = 20 + Math.random() * 30;
    this.speed = 1 + Math.random() * 2;
    this.opacity = 0.5 + Math.random() * 0.5;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;

    ctx.beginPath();
    const size = this.size;
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, size / 4);
    ctx.bezierCurveTo(-size / 2, size / 2, 0, size * 0.75, 0, size);
    ctx.bezierCurveTo(0, size * 0.75, size / 2, size / 2, size / 2, size / 4);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, size / 4);
    ctx.closePath();

    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
  }
  update() {
    this.y += this.speed;
    this.angle += this.angleSpeed;
    if (this.y > height + this.size) {
      this.reset();
      this.y = -this.size;
    }
  }
}

let hearts = [];
const heartCount = 70;
for (let i = 0; i < heartCount; i++) {
  hearts.push(new Heart());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  hearts.forEach(h => {
    h.update();
    h.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();

const quotes = [
  "“Amare non è guardarsi l’un l’altro, ma guardare insieme nella stessa direzione.” – Antoine de Saint-Exupéry",
  "“Il cuore ha le sue ragioni che la ragione non conosce.” – Blaise Pascal",
  "“Ti amo non per chi sei, ma per chi sono io quando sono con te.” – Gabriel García Márquez",
  "“L’amore è l’unica cosa che cresce quando si divide.” – Antoine de Saint-Exupéry",
  "“Dove c’è amore, c’è vita.” – Mahatma Gandhi",
  "“L’amore è la poesia dei sensi.” – Honoré de Balzac",
  "“Se so cos’è l’amore, è grazie a te.” – Hermann Hesse",
  "“Ti amo con tutto ciò che sono.” – Pablo Neruda",
  "“Il vero amore comincia quando non ci si aspetta più nulla in cambio.” – Antoine de Saint-Exupéry",
  "“L’amore è eterno finché dura.” – Vinicius de Moraes",
  "“Amare è trovare la propria felicità nella felicità di un altro.” – Gottfried Wilhelm Leibniz",
  "“L’amore è la forza più potente e umile che il mondo conosca.” – Mahatma Gandhi",
  "“Ama chi ti tratta come se fossi magia.” – Frida Kahlo",
  "“L’amore vero è come un fantasma: tutti ne parlano ma pochi l’hanno visto.” – François de La Rochefoucauld",
  "“L’amore non guarda con gli occhi ma con l’anima.” – William Shakespeare",
  "“Amare è imparare a danzare sotto la pioggia senza bagnarsi.” – Anonimo",
  "“L’amore è composto da un’unica anima che abita due corpi.” – Aristotele",
  "“Non smettere mai di amare, perché l’amore è vita.” – Anonimo",
  "“Ti amo senza sapere come, né quando, né da dove.” – Pablo Neruda",
  "“L’amore è la chiave che apre i cancelli della felicità.” – Oliver Wendell Holmes"
];

const quoteElem = document.getElementById('quotes');
let currentIndex = -1;

function showNextQuote() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentIndex);
  currentIndex = newIndex;

  quoteElem.style.opacity = 0;
  setTimeout(() => {
    quoteElem.textContent = quotes[currentIndex];
    quoteElem.style.opacity = 1;
  }, 500);
}

quoteElem.addEventListener('click', showNextQuote);
quoteElem.addEventListener('keydown', e => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    showNextQuote();
  }
});

const typedElem = document.getElementById('typedMessage');
const message = "Ti amo tantissimo";
let index = 0;

function typeWriter() {
  if (index < message.length) {
    typedElem.textContent += message.charAt(index);
    index++;
    setTimeout(typeWriter, 120);
  } else {
    startTimer();
  }
}

window.onload = () => {
  typeWriter();
};

const timerElem = document.getElementById('timer');
const startDate = new Date('2025-01-20T00:00:00');

function updateTimer() {
  const now = new Date();
  let diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  timerElem.textContent = `Da quanto ti amo: ${days} giorni, ${hours} ore, ${minutes} minuti, ${seconds} secondi`;
}

function startTimer() {
  updateTimer();
  setInterval(updateTimer, 1000);
}
