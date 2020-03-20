import map from "./assets/map.png";
import "./styles/index.css";
import { getRandomNumber, createDomElement } from "./utils";
import { MAP_WIDTH, MAP_HEIGHT, RED_ZONE_WIDTH_INTERVAL } from './constants';

let VIRUSES_ELIMINATED = 0;
let VIRUSES_MISSED = 0;

function initialize() {
  render();
}

function render(){
  const mapImage = createDomElement('img', { id: 'mapImage', src: map });
  const virus = createDomElement('div', { id: 'virus' });
  const redZone = createDomElement('div', { id: 'redZone' });
  const score = createDomElement('div', { id: 'score', className: 'scoreElement', textContent: `Score: ${VIRUSES_ELIMINATED - VIRUSES_MISSED}`});
  const virussesEliminated = createDomElement('div', { id: 'virussesEliminated', className: 'scoreElement', textContent: `Virusses Eliminated: ${VIRUSES_ELIMINATED}`});
  const virussesMissed = createDomElement('div', { id: 'virussesMissed', className: 'scoreElement', textContent: `Viruses Missed: ${VIRUSES_MISSED}`});
  const gameOver = createDomElement('div', {id: 'gameOver', className: 'result', textContent: 'GAME OVER' });
  const youWonMessage = createDomElement('div', { id: 'youWonMessage', className: 'result', textContent: 'VIRUS DESTROYED!' });
  const scoreWrapper = createDomElement('div', { id: 'scoreWrapper' }, score, virussesEliminated, virussesMissed);
  const mapWrapper = createDomElement('div', { id: 'mapWrapper', style: {width: '1000px'} }, mapImage, gameOver, youWonMessage, redZone, virus);
  const root = createDomElement('div', { id: 'root' }, mapWrapper, scoreWrapper)
  document.body.appendChild(root)
  redZone.style.width = '0px';
  mapWrapper.style.width = `${MAP_WIDTH}px`;
  mapWrapper.style.height = `${MAP_HEIGHT}px`;
  const interval = displayVirus(virus);

  virus.addEventListener("click", (e) => virusClickHandler(e, virussesEliminated, score, youWonMessage, interval));
  mapWrapper.addEventListener("click", () => mapClickHandler(virussesMissed, gameOver, interval, redZone, mapWrapper));
}

function displayVirus(virus) {
  const gameInterval = setInterval(() => {
    const isShown = getComputedStyle(virus).getPropertyValue('display') === "block";

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
  return gameInterval;
}

const virusClickHandler = (e, virussesEliminated, score, youWonMessage, interval) => {
  e.stopPropagation();
  VIRUSES_ELIMINATED += 1;
  virussesEliminated.textContent = `Virusses Eliminated: ${VIRUSES_ELIMINATED}`;
  score.textContent = `Score: ${VIRUSES_ELIMINATED - VIRUSES_MISSED}`;

  if (VIRUSES_ELIMINATED === 10){
    youWonMessage.style.display = 'flex';
    clearInterval(interval);
    setTimeout(() => {
      document.location.reload();
    }, 3000);
  }
};

const mapClickHandler = (virussesMissed, gameOver, interval, redZone, mapWrapper) => {
  console.log(mapWrapper)
  VIRUSES_MISSED += 1;
  let redZoneWidth = Number(getComputedStyle(redZone).getPropertyValue('width').replace('px', ''));
  redZoneWidth += RED_ZONE_WIDTH_INTERVAL
  redZone.style.width = `${redZoneWidth}px`;

  virussesMissed.textContent = `Virusses Missed: ${VIRUSES_MISSED}`;
  score.textContent = `Score: ${VIRUSES_ELIMINATED - VIRUSES_MISSED}`;
  
  if (VIRUSES_MISSED === 10){
    gameOver.style.display = 'flex';
    clearInterval(interval);
    setTimeout(() => {
      document.location.reload();
    }, 3000);
  }
}

initialize();
