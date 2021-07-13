function checkDates(date){
    let currentDate = Date.parse(new Date().toDateString());
    const todoDate = Date.parse(date.replaceAll('-', '/'));

    return todoDate - currentDate;
}

export const todaysTodoSelector = state => state.todos.todos
.filter(todo => {
    return checkDates(todo.date) === 0;
});

export const nextTodoSelector = state => state.todos.todos
.filter(todo => {
    return checkDates(todo.date) > 0;
})

export const overdueTodoSelector = state => state.todos.todos
.filter(todo => {
    return (checkDates(todo.date) < 0) && (todo.complete === false);
})