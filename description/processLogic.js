const addNewTodo = () => {
    const $todo = document.getElementById("todo");
    if ($todo.value.trim()) {
        todoList.unshift({ 
            todo: $todo.value, 
            done: false 
        });
        $todo.value = '';
    }
}

const saveToLocalStorage = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const display = () => {
    const view_todo_list = document.getElementById("view_todo_list");
    view_todo_list.innerHTML = ''; 
    let dis = '';
    todoList.forEach((item, index) => {
        dis += `<div class="form-check d-flex align-items-center mb-2 ${item.done ? 'completed' : ''}">
                    <input class="form-check-input me-2" type="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
                    <label class="form-check-label">${item.todo}</label>
                </div>`;
    });
    view_todo_list.innerHTML = dis;
}

const checkboxEvent = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("click", function () {
            const index = checkbox.getAttribute('data-index');
            todoList[index].done = checkbox.checked;
            if (checkbox.checked) {
                checkbox.parentElement.classList.add("completed");
            } else {
                checkbox.parentElement.classList.remove("completed");
            }
            saveToLocalStorage();
        });
    });
}

const displayActive = () => {
  const view_todo_list = document.getElementById("view_todo_list");
  view_todo_list.innerHTML = ''; 
  let dis = '';
  
  todoList.forEach((item) => {
      if (!item.done) {
          dis += `<div class="form-check d-flex align-items-center mb-2">
                      <input class="form-check-input me-2" type="checkbox" data-todo="${item.todo}">
                      <label class="form-check-label">${item.todo}</label>
                  </div>`;
      }
  });

  view_todo_list.innerHTML = dis; 
  checkboxEventActive(); 
}

const checkboxEventActive = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener("click", function () {
          const todoText = checkbox.getAttribute('data-todo');  
          
          const item = todoList.find(item => item.todo === todoText);
          if (item) {
              item.done = checkbox.checked;
              
              if (checkbox.checked) {
                  checkbox.parentElement.classList.add("completed");
              } else {
                  checkbox.parentElement.classList.remove("completed");
              }
              saveToLocalStorage();
              displayActive(); 
          }
      });
  });
}


const displayCompleted = () => {
  const view_completed = document.getElementById("view_completed");
  view_completed.innerHTML = ''; 
  let dis = '';
  
  todoList.forEach((item) => {
      if (item.done) {
          dis += `<div class="mt-3 form-check d-flex align-items-center justify-content-between mb-2 ${item.done ? 'completed' : ''}">
                      <div class="d-flex align-items-center">
                          <input class="form-check-input me-2" type="checkbox" data-todo="${item.todo}" ${item.done ? 'checked' : ''} onclick="toggleCompleted(this, '${item.todo}')">
                          <label class="form-check-label">${item.todo}</label>
                      </div>
                      <i class="bi bi-trash-fill" style="cursor: pointer;" onclick="deleteTask('${item.todo}')"></i>
                  </div>`;
      }
  });

  dis += `<div class="d-flex justify-content-end">
              <button class="btn btn-danger mt-2" onclick="deleteAllCompletedTasks()">
                  <i class="bi bi-trash-fill"></i> Delete All
              </button>
          </div>`;

  view_completed.innerHTML = dis;
};

function toggleCompleted(checkbox, todoText) {
  const item = todoList.find(item => item.todo === todoText);
  if (item) {
      item.done = checkbox.checked;

      if (checkbox.checked) {
          checkbox.parentElement.parentElement.classList.add("completed");
      } else {
          checkbox.parentElement.parentElement.classList.remove("completed");
      }

      saveToLocalStorage();
      displayCompleted(); 
  }
}

function deleteTask(todoText) {
  todoList = todoList.filter(item => item.todo !== todoText);
  
  saveToLocalStorage();
  displayCompleted();
}

function deleteAllCompletedTasks() {
  todoList = todoList.filter(item => !item.done);
  
  saveToLocalStorage();
  displayCompleted();
}
