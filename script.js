const prefix = 'r-';

function autoStates(reactiveElements) {
  const elementsIDs = [];
  reactiveElements.forEach((element) => {
    if (element.id) elementsIDs.push(element.id);
  });
  return elementsIDs;
}

function createListeners(reactiveElements, proxyStates) {
  reactiveElements.forEach((element) => {
    element.addEventListener('input', (event) => {
      proxyStates[element.id] = event.target.value;
    });
  });
}

function reactive(states, container) {
  const handler = {
    get: (target, property) => {
      return target[property];
    },
    set: (target, property, value) => {
      target[property] = value;

      const updatedElements = container.querySelectorAll(`[id="${property}"]`);
      updatedElements.forEach((element) => {
        element.value = value;
        element.innerHTML = value;
      });

      return true;
    },
  };
  return new Proxy(states, handler);
}

export function vrau(app) {
  const container = document.getElementById(app);

  if (!container) {
    throw new Error(`Container with id "${app}" not found`);
  }

  const reactiveElements = container.querySelectorAll('[id^="r-"]');
  const states = autoStates(reactiveElements);
  const proxyStates = reactive(states, container);
  createListeners(reactiveElements, proxyStates);
}
