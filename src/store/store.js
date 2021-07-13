import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import todosReducer from '../slices/todosSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const appReducers = combineReducers({
  auth: authReducer,
  todos: todosReducer
});

const rootReducer = (state, action) => {
  if(action.type === 'SIGN_OUT'){
    state = undefined;
  }
  
  return appReducers(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})
export const persistor = persistStore(store)