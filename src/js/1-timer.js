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
let timerId = null;

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userDate = selectedDates[0];
    const now = new Date();

    if (userDate <= now) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      btn.disabled = true;
      userSelectedDate = null;

      updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    userSelectedDate = userDate;
    btn.disabled = false;

    updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  },
};
flatpickr(input, options);

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
  if (!userSelectedDate) {
    return;
  }
  btn.disabled = true;
  input.disabled = true;

  iziToast.success({
    position: 'topRight',
    title: 'Timer started',
    message: 'Countdown has begun!',
  });
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(() => {
    const diff = userSelectedDate - new Date();

    if (diff <= 0) {
      clearInterval(timerId);

      input.disabled = false;

      updateTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      iziToast.success({
        position: 'topRight',
        title: 'Timer finished',
        message: 'Countdown completed!',
      });
      return;
    }
    updateTime(convertMs(diff));
  }, 1000);
});

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
