'use strict';
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password2');
const model = document.querySelector('.model');
const submit = document.getElementById('submit');

let validationInfo = {
  username: false,
  email: false,
  password: false,
  password2: false,
};

const validate = (el, regex, msg) => {
  const value = el.value;
  if (value) {
    if (!value.match(regex)) {
      message(el, msg);
      validationInfo[el.id] = false;
    } else {
      message(el);
      validationInfo[el.id] = true;
    }
  } else {
    el.parentElement.classList.remove('error');
    el.parentElement.classList.remove('success');
  }
};

const message = (el, msg = null) => {
  if (!msg) {
    el.parentElement.classList.remove('error');
    el.parentElement.classList.add('success');
  } else {
    el.parentElement.classList.add('error');
    el.parentElement.querySelector('small').textContent = msg;
  }
};

const showModel = function () {
  model.classList.add('show');

  setTimeout(function () {
    location.reload();
    model.classList.remove('show');
  }, 3000);
};

username.addEventListener('input', function () {
  const regex = /^[a-zA-Z]{3,5}$/g;
  const msg = 'Username must be 3-5 length.';
  validate(this, regex, msg);
});

email.addEventListener('input', function () {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const msg = 'Email is not validate.';

  validate(this, regex, msg);
});

password.addEventListener('input', function () {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
  const msg = 'Minimum 6 characters, one letter, one number.';
  validate(this, regex, msg);
});

passwordConfirm.addEventListener('input', function () {
  const passValue = password.value;
  const passConfValue = passwordConfirm.value;
  const msg = 'Does not matched with password.';
  if (passConfValue === passValue) {
    message(this);
    validationInfo[passwordConfirm.id] = true;
  } else {
    message(this, msg);
  }
});

submit.addEventListener('click', function (event) {
  event.preventDefault();

  for (const id in validationInfo) {
    if (!validationInfo[id]) {
      document.getElementById(`${id}`).parentElement.classList.add('error');
    } else {
      document.getElementById(`${id}`).parentElement.classList.remove('error');
      document.getElementById(`${id}`).parentElement.classList.add('success');
    }
  }

  if (
    validationInfo.email &&
    validationInfo.username &&
    validationInfo.password &&
    validationInfo.password2
  )
    showModel();
});
