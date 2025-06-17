"use strict";

document.addEventListener("DOMContentLoaded", loadTasks); //Этот код (document.addEventListener("DOMContentLoaded", loadTasks);) гарантирует, что функция loadTasks() запускается только после полной загрузки HTML-документа. Ожидание загрузки страницы (DOMContentLoaded). .addEventListener() — это метод, который позволяет добавлять обработчик событий к элементу.

// Добавление задачи
document.getElementById("add-task").addEventListener("click", function () {
  let taskName = document.getElementById("task-name").value.trim();
  let taskStatus = document.getElementById("task-status").value;
  let taskPriority = document.getElementById("task-priority").value;
  if (!taskName) {
    alert("Введите название задачи!");
    return;
  }

  let task = {
    id: Date.now(), // id: Date.now() — создаёт уникальный идентификатор задачи на основе текущего времени
    name: taskName, // name: taskName — записывает название задачи.
    status: taskStatus, //status: taskStatus — берёт статус задачи из <select>
    priority: taskPriority, // priority: taskPriority — сохраняет выбранный приоритет.
  };

  saveTask(task); //saveTask(task); — отправляет задачу в localStorage.

  document.getElementById("task-name").value = "";
  loadTasks(); // Обновление списка задач
});

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //  Получаем данные из localStorage. localStorage.getItem("tasks") извлекает сохранённую строку JSON с задачами. Если "tasks" не существует в localStorage, getItem вернёт null. Преобразуем JSON-строку в массив. JSON.parse(...) превращает строку JSON обратно в массив задач. Используем || [] для обработки null. Если localStorage.getItem("tasks") === null, то JSON.parse(null) выдаст ошибку. || [] предотвращает ошибку и создаёт пустой массив, если данных нет.

  tasks.push(task); //Берёт существующий массив tasks, который хранится в localStorage.  Добавляет новый объект задачи (task) в конец массива tasks.

  localStorage.setItem("tasks", JSON.stringify(tasks));
  // JSON.stringify(tasks) преобразует массив tasks в строку JSON. localStorage может хранить только строки. localStorage.setItem("tasks", JSON.stringify(tasks))записывает строку JSON в localStorage под ключом "tasks". Теперь данные останутся сохранёнными при обновлении страницы.
}

// Функция загрузки задач из `localStorage`

function loadTasks() {
  const taskList = document.getElementById("task-list"); //
  taskList.innerHTML = ""; // Очистка списка перед обновлением

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    let taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `<strong>${task.name}</strong> | Статус: ${task.status} | Приоритет: ${task.priority} 
   <button onclick="updateStatus(${task.id})">✔</button>
   <button class="delete-task" onclick="deleteTask(${task.id})">❌</button>`;

    taskList.appendChild(taskItem);
  });
}
//Перебираем массив задач tasks с помощью .forEach(). Создаём новый <li> для каждой задачи. Заполняем HTML-контент (task.name, task.status, task.priority). Добавляем кнопки "✔" (смена статуса) и "❌" (удаление). Добавляем <li> в taskList (список задач).  Позволяет загружать список задач при обновлении страницы. Работает с localStorage, чтобы задачи сохранялись. Позволяет изменять статус и удалять задачи.

function updateStatus(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.status =
        task.status === "Ожидает"
          ? "В процессе"
          : task.status === "В процессе"
          ? "Выполнено"
          : "Ожидает";
      //Эта строка обновляет статус задачи с использованием тернарного оператора: Если task.status === "Ожидает", статус меняется на "В процессе". Если статус "В процессе", он становится "Выполнено". Если статус "Выполнено", он возвращается в "Ожидает".
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
// Загружаем список задач из localStorage. Используем map() для обновления статуса у задачи с соответствующим taskId. Переключаем статус между "Ожидает", "В процессе" и "Выполнено". Сохраняем обновленный список обратно в localStorage. Вызываем loadTasks(), чтобы обновить.

// Функция удаления задачи

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  //tasks.filter(...) создаёт новый массив, исключая задачи, которые соответствуют условию. task это каждый элемент массива tasks, который перебирается в filter(). task.id !== taskId проверяет, если task.id не равен taskId, оставляем задачу в массиве. tasks теперь содержит все задачи, кроме той, у которой id === taskId.

  localStorage.setItem("tasks", JSON.stringify(tasks));
  //JSON.stringify(tasks) → Преобразует массив tasks (объекты с задачами) в строку JSON.localStorage.setItem("tasks", ...) сохраняет полученную строку в localStorage под ключом "tasks". Данные остаются даже после перезагрузки страницы.
  loadTasks();
}
