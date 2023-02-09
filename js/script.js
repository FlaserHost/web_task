// вспомогательная функция сариализации формы
const saveFormToLocalStorage = (form, property) => {
  const data = new FormData(form); // сериализация формы
  let [field1, field2] = data; // получение данных

  field1[1] = field1[1].trim(); // обрезка пробелов с боков
  field2[1] = field2[1].trim(); // обрезка пробелов с боков

  // проверка принадлежности кнопки сохранения
  if (property === "hours") {
    // проверка на пустоту
    if (field1[1] !== "" && field1[1] !== " ") {
      // запись в локальное хранилище для сохранения данных после обновления страницы
      localStorage.plan = field1[1];
    }

    if (field2[1] !== "" && field2[1] !== " ") {
      localStorage.fact = field2[1];
    }
  } else {
    if (field1[1] !== "" && field1[1] !== " ") {
      localStorage.fio = field1[1];
    }

    if (field2[1] !== "" && field2[1] !== " ") {
      localStorage.job = field2[1];
    }
  }
};

// Секция кода для управление месяцами и результатами

let currentMonth = 3; // предустановленный месяц
let currentYear = 2021; // предустановленный год

// массив руссифицированных месяцев
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

// массив различных результатов
const results = [100, 95.2, 73, 102.5, 75.7, 103, 120.4, 99, 13, 13.8, 45, 87];

const monthsArrows = document.querySelectorAll(".header__arrow"); // инициализация коллекции стрелок переключения
const selectedMonth = document.querySelector(".selected-month"); // инициализация элемента отображения выбранного месяц
const userResult = document.querySelector("#user-result"); // инициализация элемента отображения результата
let resultColorClass = ""; // цвет окрашивания результата
let resultWithComma = ""; // переменная для значения с точкой, вместо запятой

// перебор коллекции стрелок переключения
monthsArrows.forEach((arrow) => {
  // добавление слушателя событий на стрелки
  arrow.addEventListener("click", function () {
    const arrowDirection = this.getAttribute("id"); // получение значения атрибута id кликнутой стрелки

    arrowDirection === "right-arrow" ? currentMonth++ : currentMonth--; // если нажата стрелка вправо, то увеличивать номер месяца, иначе уменьшать

    // проверка выхода за пределы массива с месяцами в обе стороны
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    } else if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }

    userResult.className = ""; // удаление любого класса из элемента результата

    // сравнение значений резальтатов и присвоение определенного класса с цветом окрашивания
    if (results[currentMonth] < 100) {
      resultColorClass = "bad";
    } else if (results[currentMonth] === 100) {
      resultColorClass = "middle";
    } else {
      resultColorClass = "good";
    }

    resultWithComma = results[currentMonth].toString().replace(".", ","); // замена точки на запятую

    userResult.innerHTML = `${resultWithComma}%`; // вставка результата
    userResult.className = resultColorClass; // присвоение класса с цветом
    selectedMonth.innerHTML = `${months[currentMonth]} ${currentYear}г.`; // вставка значения месяца и года
  });
});

// сектор со статусом
const statusLink = document.querySelector("#status-link"); // инициализация элемента отображающего статус
let statusColorClass = ""; // класс с цветом окрашивания

// слушатель события
statusLink.addEventListener("click", function (e) {
  e.preventDefault(); // отмена действия по умолчанию
  let currentStatus = this.innerHTML; // получение текущего статуса

  // сравнение статусов и их переключение
  if (currentStatus === "Работаю") {
    currentStatus = "Не работаю";
    statusColorClass = "not-working";
  } else {
    currentStatus = "Работаю";
    statusColorClass = "working";
  }

  this.className = statusColorClass; // присвоение класса с цветом
  this.innerHTML = currentStatus; // присвоение нового статуса
});

// секция кода для кнопок в шапке

const headerBtns = document.querySelectorAll(".header-btn"); // инициализация коллекции кнопок в шапке
const Body = document.body; // инициализация тела документа

// перебор всей коолекции с кнопками
headerBtns.forEach((btn) => {
  // назначение слушателя событий
  btn.addEventListener("click", function () {
    const btnID = this.getAttribute("id"); // получение id нажатой кнопки
    let modalBody; // тело модального окна
    let modalTitle = ""; // название модального окна
    let modalFormClass = ""; // класс для формы
    let btnProperty = ""; // принадлежность кнопки

    // проверка какая кнопка была нажата
    if (btnID === "slide-down") {
      modalTitle = "План/факт (ч)";
      btnProperty = "hours";
      modalFormClass = "hours-form";
      modalBody = `<input class="modal-window__field" id="hours-plan" type="number" name="hours-plan" placeholder="План часов" autocomplete="off">
                   <input class="modal-window__field" id="hours-fact" type="number" name="hours-fact" placeholder="Факт часов" autocomplete="off">`;
    } else {
      const userFio = document.querySelector(".user-fio").innerHTML; // получения ФИО из элемента
      const userJob = document.querySelector(".user-job").innerHTML; // получения должности из элемента
      const userPhoto = document.querySelector(".user-photo").src; // получение пути до фото

      modalTitle = "Профиль";
      btnProperty = "profile";
      modalFormClass = "user-form";
      modalBody = `<div class="user-form__user-info">
                      <input class="preview-file" id="preview-file" type="file">
                      <img class="user-info__photo-preview" id="photo-preview" src="${userPhoto}" alt="user photo">
                      <div class="user-info__fields">
                        <input class="modal-window__field" id="user-fio" type="text" name="user-fio" value="${userFio}" autocomplete="off">
                        <input class="modal-window__field" id="user-job" type="text" name="user-job" value="${userJob}" autocomplete="off">
                      </div>
                   </div>`;
    }

    // добавление тела модального окна в каркас
    const modalWindow = `<div class="modal-window" id="modal-window">
                            <h2>${modalTitle}</h2>
                            <form class="${modalFormClass}" action="/" method="POST">
                              ${modalBody}
                              <div class="btns-wrapper">
                                <button class="modal-window__btn" id="save" type="submit" data-property="${btnProperty}">Сохранить</button>
                                <button class="modal-window__btn" id="close" type="button">Закрыть</button>
                              </div>
                            </form>
                        </div>`;

    Body.insertAdjacentHTML("afterbegin", modalWindow); // добавление модального окна в структуру документа

    // эффект плавного выдвижения на экран сверху через 10 миллисекунд (незаметно с телефонов)
    setTimeout(() => {
      Body.querySelector("#modal-window").classList.add("show");
    }, 10);
  });
});

// делегирование событий (для модальных окон)

// наложения обработчика событий на весь документ
document.addEventListener("click", (e) => {
  const clickedModalElement = e.target.getAttribute("id"); // получение id нажатого элемента

  // проверка на что нажато
  if (clickedModalElement === "close") {
    Body.querySelector("#modal-window").classList.remove("show"); // удаление класса показа модального окна
    Body.querySelector("#modal-window").remove(); // удаление самого модального окна из DOM дерева
  } else if (clickedModalElement === "save") {
    e.preventDefault();

    const btnProperty = e.target.getAttribute("data-property"); // получение значение принадлежности кнопки

    if (btnProperty === "hours") {
      const form = Body.querySelector(".hours-form"); // инициализация модальной формы
      saveFormToLocalStorage(form, btnProperty); // запуск вспомогательной функции
    } else {
      const form = Body.querySelector(".user-form"); // инициализация модальной формы
      saveFormToLocalStorage(form, btnProperty); // запуск вспомогательной функции
      const srcPath = Body.querySelector("#photo-preview").src; // получение пути до фото
      localStorage.userPhoto = srcPath; // запись пути в локальное хранилище
      document.querySelector(".user-photo").src = srcPath; // присвоение пути к фото
      document.querySelector(".user-fio").innerHTML = localStorage.fio; // добавление значения ФИО для визуального отображения
      document.querySelector(".user-job").innerHTML = localStorage.job; // добавление значения должности для визуального отображения
    }

    // уведомление пользователя
    alert("Данные сохранены");
  } else if (clickedModalElement === "photo-preview") {
    Body.querySelector("#preview-file").click(); // имитация нажатия на элемент
  }
});

const planFromScale = Body.querySelector(".plan-legend"); // инициализация легенды плана
const factFromScale = Body.querySelector(".fact-legend"); // инициализация легенды факта
const planScale = Body.querySelector(".plan-scale"); // инициализация шкалы плана
const factScale = Body.querySelector(".fact-scale"); // инициализация шкалы факта

document.addEventListener("change", (e) => {
  const checkedModalElement = e.target.getAttribute("id"); // получение id элемента, по которому нажали

  if (checkedModalElement !== "preview-file") {
    const inputValue = e.target.value; // получение значения из текущего поля

    // проверка в каком поле произошло изменение
    if (
      checkedModalElement !== "user-fio" &&
      checkedModalElement !== "user-job"
    ) {
      let plan = +planFromScale.getAttribute("data-value"); // получение значения из доп. атрибута и преобразование к числу
      let fact = +factFromScale.getAttribute("data-value"); // получение значения из доп. атрибута и преобразование к числу

      let selectorLegend = "";
      let dataType = "";
      let factPercent = 0;

      // проверка на какой элемент нажато
      if (checkedModalElement === "hours-plan") {
        selectorLegend = ".plan-legend";
        dataType = "план";
        plan = inputValue;
      } else {
        selectorLegend = ".fact-legend";
        dataType = "факт";
        fact = inputValue;
      }

      factPercent = (fact / plan) * 100; // нахождение процента от числа (факт / план)

      Body.querySelector(selectorLegend).setAttribute("data-value", inputValue); // запись значения в дополнительный атрибут
      Body.querySelector(
        selectorLegend
      ).innerHTML = `${dataType}: ${inputValue}ч.`; // запись полученных значений в легенду
      planScale.style.width = `${plan}%`; // задание длины шкале плана (если ориентироваться на макет, то 176 часов, это 176%, а не 100%)
      factScale.style.width = `${factPercent}%`; // задание длины шкале факта
    }
  } else {
    const [file] = e.target.files; // запись blob пути файла в переменную (используется деструктуризация)

    // проверка на существование файла
    if (file) {
      Body.querySelector("#photo-preview").src = URL.createObjectURL(file); // добавление blob пути в качестве пути до фото
    }
  }
});

// кнопки меню
const menuItem = document.querySelectorAll(".menu-item"); // инициализация коллекции кнопок меню

// перебор всех кнопок меню
menuItem.forEach((item) => {
  // назначение слушителю событий
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const buttonTitle = e.target.closest("a").querySelector("h4").innerHTML; // поиск родителя относительно элемента, на который попал курсор при клике, и взятие значения из тега h4

    alert(`Здравствуйте. Я кнопка, и я была нажата. Имя мне "${buttonTitle}"`); // вывод окна уведомлений
  });
});

// возвращение значений после перезагрузки страницы
// проверка на существование значения в хранилище
if (localStorage.plan) {
  const fromStorage = localStorage.plan; // запись значения в переменную
  planFromScale.innerHTML = `план: ${fromStorage}ч.`; // запись переменной в элемент для визуального отображения
  planFromScale.setAttribute("data-value", fromStorage); // запись переменной в дополнительный атрибут элемента
}

if (localStorage.fact) {
  const fromStorage = localStorage.fact;
  factFromScale.innerHTML = `факт: ${fromStorage}ч.`;
  factFromScale.setAttribute("data-value", fromStorage);
}

if (localStorage.userPhoto) {
  document.querySelector(".user-photo").src = localStorage.userPhoto;
}

if (localStorage.fio) {
  document.querySelector(".user-fio").innerHTML = localStorage.fio;
}

if (localStorage.job) {
  document.querySelector(".user-job").innerHTML = localStorage.job;
}
