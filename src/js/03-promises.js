import Notiflix from 'notiflix';
// Выбираем форму
const formElem = document.querySelector('.form');
// Функция создания промиса
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

// Функция сабмита по форме
const handleFormSubmit = e => {
  e.preventDefault();
  // Забираем из ивента значение формы, и приводим к числам
  const { delay, step, amount } = e.target;
  let delayPromise = Number(delay.value);
  const stepPromise = Number(step.value);
  const amountPromise = Number(amount.value);
  // Циклом создаем промисы
  for (let i = 1; i <= amountPromise; i += 1) {
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    //Суммируем задержку для следующего промиса
    delayPromise += stepPromise;
  }
};
// Слушатель на форме по сабмиту
formElem.addEventListener('submit', handleFormSubmit);
