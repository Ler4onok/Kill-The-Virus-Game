import map from "./assets/map.png";
import "./styles/index.css";
import { getRandomNumber } from "./utils";
import { MAP_WIDTH, MAP_HEIGHT } from './constants';

let VIRUSES_ELIMINATED = 0;
let VIRUSES_MISSED = 0;

function initialize() {
  render();
  
}

const virusClickHandler = (virussesEliminated, score) => {
  console.log(score)
  VIRUSES_ELIMINATED += 1;
  virussesEliminated.textContent = "Virusses Eliminated: " + VIRUSES_ELIMINATED;
  score.textContent = "Score: " + (VIRUSES_ELIMINATED - VIRUSES_MISSED);

  if (VIRUSES_ELIMINATED === 5){
    alert('Congratilations! The virus was fully eliminated!');
    document.location.reload();
  }
};

const mapClickHandler = virussesMissed => {
  VIRUSES_MISSED += 1;
  console.log(VIRUSES_MISSED);

  //??? on web 4
  virussesMissed.textContent = "Virusses Missed: " + VIRUSES_MISSED;
  score.textContent = "Score: " + (VIRUSES_ELIMINATED - VIRUSES_MISSED);
  
  if (VIRUSES_MISSED === 5){
    alert('Game Over');
    document.location.reload();
  }
}

function displayVirus(virus) {
  setInterval(() => {
    const isShown = virus.style.display === "block";

    if (isShown) {
      virus.style.display = "none";
    } else {
      virus.style.display = "block";

      const virusPosY = getRandomNumber(0, MAP_HEIGHT - 50);
      const virusPosX = getRandomNumber(0, MAP_WIDTH - 50);
      
      virus.style.left = `${virusPosX}px`;
      virus.style.top = `${virusPosY}px`;
    }
  }, 1000);
}

function render(){

  const mapWrapper = createAppElement('div', 'mapWrapper', 'mapWrapper');
  const mapImage = createAppElement('img', 'mapImage', 'mapImage');
  const virus = createAppElement('div', 'virus', 'virus');
  const scoreWrapper = createAppElement('div', 'scoreWrapper', 'scoreWrapper');
  const score = createAppElement('div', 'score', 'scoreElement');
  const virussesEliminated = createAppElement('div', 'virussesEliminated', 'scoreElement');
  const virussesMissed = createAppElement('div', 'virussesMissed', 'scoreElement');
  // const gameOver = createAppElement('div', 'gameOver', 'gameOver')

  mapWrapper.style.width = `${MAP_WIDTH}px`;
  mapWrapper.style.height = `${MAP_HEIGHT}px`;

  mapImage.src = map;

  mapWrapper.appendChild(mapImage);
  mapWrapper.appendChild(virus);

  scoreWrapper.appendChild(score);
  scoreWrapper.appendChild(virussesEliminated);
  scoreWrapper.appendChild(virussesMissed);


  virussesEliminated.textContent = "Virusses Eliminated: " + VIRUSES_ELIMINATED;
  virussesMissed.textContent = "Viruses Missed: " + VIRUSES_MISSED;
  score.textContent = "Score: " + (VIRUSES_ELIMINATED - VIRUSES_MISSED);

  
  virus.addEventListener("click", () => virusClickHandler(virussesEliminated, score));
  mapImage.addEventListener("click", () => mapClickHandler(virussesMissed));

  const app = document.getElementById("app");

  app.appendChild(mapWrapper);
  app.appendChild(scoreWrapper);

  displayVirus(virus);
  
}

const createAppElement = (element, id, className) => {
  const appElement = document.createElement(element);
  appElement.id = id;
  appElement.className = className;
  return appElement;
}



initialize();
