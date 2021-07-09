import { Paper, Button, FormControl, Container, Box, TextField, Typography, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { signupAsync } from '../slices/authSlice'
import { currentUserSelector, emailErrorSelector, passwordErrorSelector } from './selectors/authSelectors';

export default function Signup(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const currentUser = useSelector(currentUserSelector);
    const emailError = useSelector(emailErrorSelector);
    const passwordError = useSelector(passwordErrorSelector);

    useEffect(() => {
        if(currentUser){
            history.push('/');
        }
    }, [currentUser])

    function signupHandle(){
        if(password === confirmPassword){
            dispatch(signupAsync(email, password));
        }
    }

    return(
            <Grid container direction='row' justify='center' alignItems='center' style={{ height:'90vh' }} >
                <Container maxWidth='sm'>
                    <Paper elevation={10}>
                        <Box display='flex' height='100%' justifyContent='center' paddingY='30px' alignItems='center' textAlign='center'>
                            <form>
                                <Typography variant='h4'>Sign up</Typography>
                                <Typography variant='h6'>Sign up in you account</Typography>
                                <FormControl fullWidth>
                                    <TextField fullWidth id='fieldEmail' aria-describedby='email-helper-text'
                                    required placeholder='samemail@gmail.com' label='Email' onChange={e => setEmail(e.target.value)}
                                    error={emailError !== undefined} helperText={emailError ? emailError : ''} />

                                    <TextField fullWidth id='fieldPassword' aria-describedby='password-helper-text'
                                    required label='Password' onChange={e => setPassword(e.target.value)}
                                    error={passwordError !== undefined} helperText={passwordError ? passwordError : ''} type='password' />

                                    <TextField fullWidth id='fieldConfirmPassword' aria-describedby='confrimPassword-helper-text'
                                    required label='Confirm password' onChange={e => setConfirmPassword(e.target.value) } type='password' />

                                    <Grid direction='column' container spacing={1} style={{ paddingTop: '5px' }}>
                                        <Grid item>    
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button variant='contained' color='primary' onClick={signupHandle}>Sign up</Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button component={ Link } to='/login' color='primary'>Login</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </form>
                        </Box>
                    </Paper>
                </Container>
            </Grid>
    )
}