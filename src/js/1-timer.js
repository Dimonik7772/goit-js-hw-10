import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const input = document.querySelector('input[id="datetime-picker"]');
const btn = document.querySelector('button[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let userSelectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userDate = selectedDates[0];
    const now = new Date();
    if (userDate < now) {
      btn.disabled = true;
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      return;
    }
    btn.disabled = false;

    userSelectedDate = userDate;
  },
};
const dates = flatpickr(input, options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
btn.addEventListener('click', () => {
  const timerId = setInterval(() => {
    btn.disabled = true;
    input.disabled = true;
    const now = new Date();
    const diff = userSelectedDate - now;
    const time = convertMs(diff);
    if (diff <= 0) {
      btn.disabled = false;
      input.disabled = false;
      clearInterval(timerId);
      updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    updateTime(time);
  }, 1000);
});
function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadinfZero(days);
  refs.hours.textContent = addLeadinfZero(hours);
  refs.minutes.textContent = addLeadinfZero(minutes);
  refs.seconds.textContent = addLeadinfZero(seconds);
}

function addLeadinfZero(value) {
  return String(value).padStart(2, '0');
}
