import { createSlice } from "@reduxjs/toolkit";
import { db } from '../firebase'

export const createTodoAsync = todo => (dispatch, getState) => {
    const todoId = Date.now();
    const currentUser = getState().auth.currentUser;
    const dbRef = db.ref(`todos/${todoId}`);

    dbRef.set({ id: todoId, createdBy: currentUser, title: todo.title, text: todo.text, priority: todo.priority,
    date: todo.date, complete: false })
    .then(() => {
        dispatch(createTodo({ id: todoId, createdBy: currentUser, title: todo.title, text: todo.text, priority: todo.priority,
        date: todo.date, complete: false }))
    })
};

export const getTodosAsync = () => (dispatch, getState) => {
    const dbRef = db.ref('todos');

    let todos = [];

    dbRef.get().then(snapshot => {
        if(snapshot.exists()){
            todos = Object.values(snapshot.toJSON());
        }
    }).then(() => {
        todos = todos.filter(todo => (todo.createdBy === getState().auth.currentUser));
        
        dispatch(getTodo(todos))
    })
}

export const completeTodoAsync = todo => dispatch =>{
    const dbRef = db.ref(`todos/${todo.id}`);
    dbRef.set({ ...todo, complete: true });

    dispatch(comleteTodo(todo.id));
}

export const deleteTodoAsync = id => dispatch =>{
    const dbRef = db.ref(`todos/${id}`);
    
    dbRef.remove();
    dispatch(deleteTodo(id));
}

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers:{
        createTodo(state, action){
            state.todos.push(action.payload);
        },
        getTodo(state, action){
            state.todos = action.payload;
        },
        deleteTodo(state, action){
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        comleteTodo(state, action){
            const todos = state.todos.map(todo => {
                if(todo.id === action.payload){
                    todo.complete = true;
                }

                return todo;
            });

            state.todos = todos;
        }
    }
});

export const { createTodo, getTodo, deleteTodo, comleteTodo } = todosSlice.actions;
export default todosSlice.reducer;