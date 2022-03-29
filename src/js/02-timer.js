import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
//Выбираем наши теги
const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
//устанавливаем время на ноль
let selectedTime = 0;
//блокируем кнопку старт до выбора времени
btnStart.disabled = true;
//Позиция уведемлений от библиотеки нотифай
Notiflix.Notify.init({
  position: 'center-top',
});
//обьект оптионс для флатпикера
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() > selectedDates[0]) {
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    btnStart.disabled = false;
    //устанавливаем время в поле
    selectedTime = new Date(selectedDates[0]).getTime();
  },
};

flatpickr(datetimePicker, options);

const itsaFinalCountDown = () => {
  //блокируем кнопку и дейт-пикер после старта
  btnStart.disabled = true;
  datetimePicker.disabled = true;

  const timerId = setInterval(() => {
    //Переменная которая показывает оставшееся время
    const timeToShow = selectedTime - Date.now();
    //Если время меньше или равно 0, сбрасываем кнопки и пишем сообщение,
    // что таймер пришел к 0, а так же удаляем интервал
    if (timeToShow <= 0) {
      btnStart.disabled = false;
      datetimePicker.disabled = false;
      clearInterval(timerId);
      return Notiflix.Notify.info('Time is over!');
    }
    //Вызываем функцию для отображения времени на странице
    //Дополняем её конвертированым временем
    timeToDisplay(convertMs(timeToShow));
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//Функция конвертирующая время
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
//функция добавляющяя значения на страницу
function timeToDisplay({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}
//слушатель на кнопочку старт
btnStart.addEventListener('click', itsaFinalCountDown);
