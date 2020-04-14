const getElement = (selector) => document.querySelector(selector);

const addListenersOnActions = function () {
  const $actions = getElement('.actions');
  $actions.addEventListener('click', (event) => {
    const {id} = event.target;
    const ids = {login: 'sign-up', 'sign-up': 'login'};
    if (id) {
      const hideId = ids[id];
      console.log(id, hideId);
      getElement(`#${hideId}`).classList.remove('active-action');
      getElement(`#${id}`).classList.add('active-action');
      getElement(`#${hideId}-form`).classList.add('hidden');
      getElement(`#${id}-form`).classList.remove('hidden');
    }
  });
};

const attachListeners = function () {
  addListenersOnActions();
};

const main = function () {
  attachListeners();
};

window.onload = main;
