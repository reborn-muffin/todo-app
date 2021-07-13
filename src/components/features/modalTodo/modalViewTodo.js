import { Fade, Modal, Paper, Box, FormControl, Typography, Button, makeStyles } from '@material-ui/core'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { deleteTodoAsync } from '../../../slices/todosSlice';

const useStyles = makeStyles(theme => ({
    modalContainer:{
        [theme.breakpoints.down('xs')]:{
            width: '90%'
        },
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    select:{
        [theme.breakpoints.down('xs')]:{
            width: '100%',
            marginBottom: '10px'
        },
        marginRight: '15px'
    },
    date:{
        [theme.breakpoints.down('xs')]:{
            width: '100%'
        }
    }
}))

export default function ViewTodoModal({ isOpen, closeModal, todo }){
    const dispatch = useDispatch();
    const classes = useStyles();

    function handleDeleteTodo(){
        dispatch(deleteTodoAsync(todo.id));
        closeModal();
    }

    function handleClose(){
        closeModal();
    }

    return (
        <>
            <Modal open={isOpen} onClose={handleClose} style={{ width: '100%' }}>
                <Fade in={isOpen}>
                    <Box className={classes.modalContainer}>
                        <Paper style={{ width: '100%', marginTop: '30%' }}>
                            <form>
                                <Typography variant='h4' style={{ textAlign: 'center', paddingTop: '10px' }}>
                                    View task
                                </Typography>

                                <FormControl fullWidth>
                                    <Box width='80%' marginX='auto'>
                                        <Typography style={{marginBottom:'10px'}}>
                                            Title: {todo.title}
                                        </Typography>

                                        <Typography style={{ wordWrap: 'break-word' }}>
                                            Text: {todo.text}
                                        </Typography>
                                        <Box marginTop='10px'>
                                            <Typography>
                                                Priority: {todo.priority}
                                            </Typography>
                                    
                                            <Typography>
                                                Date: {todo.date}
                                            </Typography>

                                            <Typography>
                                                {todo.complete ? 'Completed' : 'Not completed'}
                                            </Typography>
                                        </Box>

                                        <Box  margin='10px' display='flex' justifyContent='flex-end'>
                                            <Button color='secondary' variant='contained' onClick={handleDeleteTodo}>Delete</Button>
                                        </Box>
                                    </Box>
                                </FormControl>
                            </form>
                        </Paper>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

ViewTodoModal.propTypes = {
    isOpen: propTypes.bool,
    closeModal: propTypes.func.isRequired,
    todo: propTypes.object.isRequired
}