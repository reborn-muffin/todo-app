import { createSlice } from "@reduxjs/toolkit";
import { auth } from '../firebase'

export const signupAsync = (email, password) => dispatch => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        dispatch(signup(auth.currentUser.uid));
    }).catch(err => dispatch(catchError({ code: err.code, message: err.message })))
}

export const signinAsync = (email, password) => dispatch => {
    auth.signInWithEmailAndPassword(email, password).then(() => {
        dispatch(signin(auth.currentUser.uid));
    }).catch(err => dispatch(catchError({ code: err.code, message: err.message })))
}

const authSlice = createSlice({
    name: 'auth',
    initialState: { },
    reducers:{
        signup(state, action){
            state.currentUser = action.payload;
        },
        signin(state, action){
            state.currentUser = action.payload;
        },
        signout(state){
            auth.signOut();
            state.currentUser = undefined;
        },
        catchError(state, action){
            state.emailError = undefined;
            state.passwordError = undefined;

            if(action.payload.verify){
                state.codeError = action.payload.message;
            }
            else if(action.payload.code === 'auth/wrong-password' || action.payload.code === 'auth/weak-password'){
                state.passwordError = action.payload.message;
            }
            else if(action.payload.code === 'auth/user-not-found'){
                state.emailError = 'User not found'
            }
            else{
                state.emailError = action.payload.message;
            }
        }
    },
});

export default authSlice.reducer;
export const { signin, signup, signout, catchError } = authSlice.actions;