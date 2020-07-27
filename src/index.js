import {
    createTodo,
    refreshTodos
} from './todos'

import {
    setFilters
} from './filters'
import {
    renderTodos
} from './views'



// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-todo').addEventListener('input', function (e) {
    setFilters({
        searchText: e.target.value
    })
    renderTodos();
})
// Set up checkbox handler
document.querySelector('#hide').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos();
})

// Set up form submission handler

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    const textVal = e.target.elements.text.value.trim()
    e.preventDefault();

    if (textVal.length > 0) {
        createTodo(textVal)
        renderTodos();
        e.target.elements.text.value = '';
    }
})

// Bonus: Add a watcher for local storage

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        refreshTodos()
        renderTodos()
    }
})