const getElement = (selector) => document.querySelector(selector);

const submitSignup = function () {
  const $signup = getElement('#submit');
  $signup.addEventListener('submit', (event) => {
    console.log(event);
  });
};

const main = function () {
  submitSignup();
};

window.onload = main;
