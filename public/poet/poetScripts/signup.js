const getElement = (selector) => document.querySelector(selector);

const getOptions = function (body, method) {
  return {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  };
};

const clearInputs = function () {
  getElement('#username').value = '';
  getElement('#name').value = '';
  getElement('#email').value = '';
  getElement('#password').value = '';
  getElement('#cnf-password').value = '';
};

const getFormDetails = function () {
  const username = getElement('#username').value;
  const name = getElement('#name').value;
  const email = getElement('#email').value;
  const password = getElement('#password').value;
  return {username, name, email, password};
};

const listenerOnSubmitBtn = function () {
  const $signup = getElement('#sign-up-form');
  $signup.addEventListener('submit', (event) => {
    console.log('hello');
    event.preventDefault();
    const signupData = getFormDetails();
    clearInputs();
    fetch('/poet/register', getOptions(signupData, 'POST'))
      .then((res) => res.json())
      .then((data) => {
        window.location.href = 'dashboard';
      });
  });
};

const showUserNameAvailability = function ({isAvailable}) {
  const $availability = getElement('#username-availability');
  let text = 'username already exists';
  $availability.style.color = 'red';
  if (!isAvailable) {
    $availability.style.color = 'green';
    text = 'username available';
  }
  $availability.innerText = text;
};

const usernameAvailability = function () {
  const $username = getElement('#username');
  $username.addEventListener('input', (event) => {
    const username = $username.value;
    fetch('/poet/username/available', getOptions({username}, 'POST'))
      .then((res) => res.json())
      .then(showUserNameAvailability);
  });
};

const listenerOnConfirmPassword = function () {
  const $cnfPassword = getElement('#cnf-password');
  $cnfPassword.addEventListener('input', (event) => {
    const confirmPassword = $cnfPassword.value;
    const password = getElement('#password').value;
    let result = 'password not matched';
    const $submit = getElement('.btn');
    $submit.classList.add('none-pointer');
    if (password === confirmPassword) {
      result = '';
      $submit.classList.remove('none-pointer');
    }
    getElement('#cnf-password-checker').innerText = result;
  });
};

const main = function () {
  usernameAvailability();
  listenerOnSubmitBtn();
  listenerOnConfirmPassword();
};

window.onload = main;
