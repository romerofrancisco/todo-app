import {
    getTodos,
    removeTodo,
    toggleTodo
} from './todos'

import {
    getFilters
} from './filters'

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {

    const todos = getTodos()
    const {
        searchText,
        hideCompleted
    } = getFilters()

    const filteredTodos = todos.filter((todo) => {

        const sTextFilter = todo.text.toLowerCase().includes(searchText.toLowerCase())

        if (!hideCompleted) {
            return sTextFilter;
        } else {
            return sTextFilter && !todo.completed;
        }
    })


    //this is for the summary
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
    const todoEl = document.querySelector('#todos')

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    //This adds the todos list
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        })
    } else {
        const p = document.createElement('p')
        p.classList.add('empty-message')
        p.textContent = 'No To-Dos to show'
        todoEl.appendChild(p)
    }
}
// generateTodoDOM
// Arguments: todo
// Return value: the todo element

// Get the DOM elements for list summary
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input');
    const textEl = document.createElement('span');
    const button = document.createElement('button');

    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = todo.completed;
    //listens to checkbox and runs function to save changes.
    checkBox.addEventListener('change', (e) => {
        toggleTodo(todo.id);
        renderTodos();
    });
    containerEl.appendChild(checkBox);

    if (todo.text.length > 0) {
        textEl.textContent = todo.text;
    } else {
        textEl.textContent = 'Unnamed todo';
    };
    containerEl.appendChild(textEl);

    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    button.textContent = 'remove';
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button);
    button.addEventListener('click', (e) => {
        removeTodo(todo.id);
        renderTodos();
    })

    return todoEl;
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2');
    const nTodosText = incompleteTodos.length === 1 ? 'todo' : 'todos'
    summary.classList.add('list-title')

    summary.textContent = `You have ${incompleteTodos.length} ${nTodosText} left`;
    return summary;
}

// Make sure to set up the exports

export {
    renderTodos,
    generateSummaryDOM,
    generateTodoDOM
}