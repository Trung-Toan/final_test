let todoList = JSON.parse(localStorage.getItem('todoList')) || 
    [
        { todo: 'Do coding challenges', done: false }, 
        { todo: 'Read a book', done: false }, 
        { todo: 'Go for a walk', done: true }
    ];

const A1 = [1, 2, "a"];
const A2 = [1, 3, "b"];

document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector('.btn-primary');
    addButton.addEventListener('click', () => {
        addNewTodo();
        display();
        saveToLocalStorage();
        checkboxEvent();
    });
    
    display();
    checkboxEvent();

    // Gọi hàm uniqueElements
    const result = uniqueElements(A1, A2);
    console.log(result); // Output: [2, "a", "b", 3]
});

function uniqueElements(A1, A2) {
    return [ ...A1.filter(item => !A2.includes(item)), ...A2.filter(item => !A1.includes(item))];
}