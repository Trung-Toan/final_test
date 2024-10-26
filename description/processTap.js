function viewAll() {
    const $view_all = document.getElementById("view_all");
    const $view_completed = document.querySelector(".view_completed");

    $view_all.style.display = "block"; 
    $view_completed.style.display = "none"; 

    const addButton = document.querySelector('.btn-primary');
    addButton.addEventListener('click', () => {
        addNewTodo();
        display();
        saveToLocalStorage();
        checkboxEvent();
    });
    display();
    checkboxEvent();

    document.getElementById("all").classList.add("action_active");
    document.getElementById("active").classList.remove("action_active");
    document.getElementById("completed").classList.remove("action_active");
}

function viewActive() {
    const $view_all = document.getElementById("view_all");
    const $view_completed = document.querySelector(".view_completed");

    $view_all.style.display = "block"; 
    $view_completed.style.display = "none"; 

    const addButton = document.querySelector('.btn-primary');
    addButton.addEventListener('click', () => {
        addNewTodo();
        displayActive();
        saveToLocalStorage();
        checkboxEventActive();
    });
    displayActive();
    document.getElementById("all").classList.remove("action_active");
    document.getElementById("active").classList.add("action_active");
    document.getElementById("completed").classList.remove("action_active");
}

function viewCompleted() {
    const $view_all = document.getElementById("view_all");
    const $view_completed = document.querySelector(".view_completed");

    $view_all.style.display = "none"; 
    $view_completed.style.display = "block"; 

    displayCompleted(); 

    document.getElementById("all").classList.remove("action_active");
    document.getElementById("active").classList.remove("action_active");
    document.getElementById("completed").classList.add("action_active");
}

