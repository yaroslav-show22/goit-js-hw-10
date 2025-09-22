import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  createNotification(state, delay)
    .then(({ state, delay }) => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(({ state, delay }) => {
      iziToast.error({
        title: '❌ Rejected',
        message: `Rejected in ${delay}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}

function createNotification(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve({ state, delay });
      } else {
        reject({ state, delay });
      }
    }, delay);
  });
}
