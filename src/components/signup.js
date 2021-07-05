import { Paper, FormHelperText, Button, FormControl, Container, Box, TextField, Typography, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function Signup(){
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
                                    required placeholder='samemail@gmail.com' label='Email' />
                                    <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>

                                    <TextField fullWidth id='fieldPassword' aria-describedby='password-helper-text'
                                    required label='Password' />
                                    <FormHelperText id="password-helper-text">We'll never share your password.</FormHelperText>

                                    <TextField fullWidth id='fieldConfirmPassword' aria-describedby='confrimPassword-helper-text'
                                    required label='Confirm password' />
                                    <FormHelperText id="confrimPassword-helper-text">We'll never share your password.</FormHelperText>

                                    <Grid direction='column' container spacing={1}>
                                        <Grid item>    
                                            <Grid container spacing={2}>
                                                <Grid item>
                                                    <Button variant='contained' color='primary'>Sign up</Button>
                                                </Grid>

                                                <Grid item>
                                                    <Button component={ Link } to='/login' color='primary'>Login</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Link to='/forgot'>I forgot my password. Click to reset</Link>
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