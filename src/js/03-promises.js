import Notiflix from 'notiflix';
// Выбираем форму
const createPromiseBtn = document.querySelector('button');
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
//Функция для разблокировки кнопки после выполнения всех промисов
function createBtnDisabler(delayPromise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delayPromise) {
        resolve((createPromiseBtn.disabled = false));
      } else {
        reject((createPromiseBtn.disabled = true));
      }
    }, delayPromise);
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
    //Блокируем кнопку
    if (i < amountPromise) {
      createPromiseBtn.disabled = true;
    }
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
  console.log(delayPromise);
  //Вызываем функцию разблокирования кнопки после цикла
  createBtnDisabler(delayPromise);
};
// Слушатель на форме по сабмиту
formElem.addEventListener('submit', handleFormSubmit);
