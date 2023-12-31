import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const datePickerElement = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
startButton.disabled = true; 
const daysContainer = document.querySelector("[data-days]");
const hoursContainer = document.querySelector("[data-hours]");
const minutesContainer = document.querySelector("[data-minutes]");
const secondsContainer = document.querySelector("[data-seconds]");
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(interval);
    if (selectedDates[0] > new Date()) {
      startButton.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    }
  },
};

startButton.addEventListener('click', function (e) {
  setTime();
});

const datePicker = flatpickr(datePickerElement, options);

function setTime() {
  datePickerElement.disabled = true;
  const currentTime = new Date();
  const selectedDate = datePicker.selectedDates[0];
  const countdownTime = selectedDate - currentTime;

  startButton.disabled = true; 
  startCountdown(countdownTime);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function startCountdown(countdownTime) {
  interval = setInterval(function() {
    countdownTime -= 1000;
    if (countdownTime >= 0) {
      const { days, hours, minutes, seconds } = convertMs(countdownTime);
      daysContainer.textContent = days;
      hoursContainer.textContent = hours;
      minutesContainer.textContent = minutes;
      secondsContainer.textContent = seconds;
    } else {
      clearInterval(interval);
      daysContainer.textContent = '00';
      hoursContainer.textContent = '00';
      minutesContainer.textContent = '00';
      secondsContainer.textContent = '00';
    }
  }, 1000);
}


function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}