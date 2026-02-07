import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
form.addEventListener('submit', handelSubmit);
function handelSubmit(event) {
  event.preventDefault();
  const elements = event.target.elements;
  const inputDelay = elements.delay.value;
  const radioBtn = elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        resolve(`Fulfilled promis in ${inputDelay}ms`);
      } else {
        reject(`Rejected promise in ${inputDelay}ms`);
      }
    }, Number(inputDelay));
  });
  promise
    .then(value => {
      iziToast.success({
        message: `${value}`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `${error}`,
        position: 'topRight',
      });
    });
  event.target.reset();
}
