export function elt(type, attrs, ...children) {
  const dom = document.createElement(type);
  if (attrs) Object.assign(dom, attrs);

  for (let child of children) {
    if (typeof child === "string") {
      dom.appendChild(document.createTextNode(child));
    } else {
      dom.appendChild(child);
    }
  }

  return dom;
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
