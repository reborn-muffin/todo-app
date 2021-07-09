import { Paper, Button, FormControl, Container, Box, TextField, Typography, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { signinAsync } from '../slices/authSlice';
import { currentUserSelector, emailErrorSelector, passwordErrorSelector } from './selectors/authSelectors';

export default function Login(){
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = useSelector(currentUserSelector);
    const emailError = useSelector(emailErrorSelector);
    const passwordError = useSelector(passwordErrorSelector);

    useEffect(() => {
        if(currentUser){
            history.push('/');
        }
    }, [currentUser])

    function signinHandle(){
        dispatch(signinAsync(email, password));
    }

    return(
            <Grid container direction='row' justify='center' alignItems='center' style={{ height:'90vh' }} >
                <Container maxWidth='sm'>
                    <Paper elevation={10}>
                        <Box display='flex' height='100%' justifyContent='center' paddingY='30px' alignItems='center' textAlign='center'>
                            <form>
                                <Typography variant='h4'>Login</Typography>
                                <Typography variant='h6'>Login in you account</Typography>
                                <FormControl fullWidth>
                                    <TextField fullWidth id='fieldEmail' aria-describedby='email-helper-text'
                                    required placeholder='samemail@gmail.com' label='Email' onChange={e => setEmail(e.target.value)}
                                    error={emailError !== undefined} helperText={emailError ? emailError : ''} />

                                    <TextField fullWidth id='fieldPassword' aria-describedby='password-helper-text'
                                    required label='Password' onChange={e => setPassword(e.target.value)} type='password'
                                    error={passwordError !== undefined} helperText={passwordError ? passwordError : ''} />

                                    <Grid direction='column' container spacing={2} style={{paddingTop: '5px'}}>
                                        <Grid item>
                                            <Grid container spacing={1}>
                                                <Grid item>
                                                    <Button variant='contained' color='primary' onClick={signinHandle}>Login</Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button component={ Link } to='/signup' color='primary'>Sign up</Button>
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