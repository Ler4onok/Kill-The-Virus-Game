export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function createDomElement(tag, attrs, ...children) {
  const element = document.createElement(tag);
  for (const attr in attrs) {
    element[attr] = attrs[attr];
  }

  if (children.length !== 0) {
    children.forEach(child => {
      element.appendChild(child);
    });
  }

  return element;
}
