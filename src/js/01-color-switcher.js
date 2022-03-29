const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyElem = document.querySelector('body');
// Делаем кнопку стоп изначально дизейбл
stopBtn.disabled = true;

//Вешаем слушатель на кнопку старт
startBtn.addEventListener('click', () => {
  //Кнопке старт даем дизейбл, кнопке стоп наоборот
  startBtn.disabled = true;
  stopBtn.disabled = false;
  //На функцию смены фона боди вешаем интервал
  timerId = setInterval(colorSwitcher, 1000);
});
//Вешаем слушатель на кнопку стоп
stopBtn.addEventListener('click', () => {
  //Чистим интервал при нажатии
  clearInterval(timerId);
  //Снимае и добавляем дизейблы на кнопки
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

//Функция смены цвета бекграудна для боди
function colorSwitcher() {
  bodyElem.style.backgroundColor = getRandomHexColor();
}
//Функция рандомного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
