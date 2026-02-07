import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', handelSubmit);
function handelSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;
  const inputDelay = Number(elements.delay.value);
  const radioBtn = elements.state.value;
  const promis = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        resolve(inputDelay);
      } else {
        reject(inputDelay);
      }
    }, inputDelay);
  });
  promis
    .then(value => {
      iziToast.success({
        message: `✅ Fulfilled promis in ${value}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight',
      });
    });
  event.target.reset();
}
