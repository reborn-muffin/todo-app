import { Fade, Modal, Paper, Box, FormControl, Typography, TextField, Button, Select, MenuItem, InputLabel, makeStyles } from '@material-ui/core'
import propTypes from 'prop-types'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodoAsync } from '../../../slices/todosSlice';

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

export default function CreateTodoModal({ isOpen, closeModal }){
    const dispatch = useDispatch();
    const [priority, setPriority] = useState('Hight priority');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [error, setError] = useState();

    const classes = useStyles();

    function handleCreateTodo(){
        if(title && text && priority && date){
            dispatch(createTodoAsync({ title, text, priority, date }));

            closeModal();

            setTitle('');
            setText('');
            setDate(undefined);
            setError(undefined);
        }
        else{
            setError('Field is required');
        }
    }

    function handleClose(){
        closeModal();
        setError(undefined);
        setTitle('')
    }

    return (
        <>
            <Modal open={isOpen} onClose={handleClose} style={{ width: '100%' }}>
                <Fade in={isOpen}>
                    <Box className={classes.modalContainer}>
                        <Paper style={{ width: '100%', marginTop: '30%' }}>
                            <form>
                                <Typography variant='h4' style={{ textAlign: 'center', paddingTop: '10px' }}>
                                    Create task
                                </Typography>

                                <FormControl fullWidth>
                                    <Box width='80%' marginX='auto'>
                                        <TextField fullWidth label='Task title' variant='outlined' style={{marginBottom:'10px'}}
                                        onChange={e => setTitle(e.target.value)} inputProps={{ maxLength: 12 }} value={title}
                                        error={error && !title} helperText={error && !title ? error : ''} />

                                        <TextField error={error && !text} helperText={error && !text ? error : ''} fullWidth label='Task text' multiline variant='outlined'
                                        rows={4} onChange={e => setText(e.target.value)} inputProps={{ maxLength: 200 }} />

                                    <Box marginTop='10px'>
                                            <FormControl variant='outlined' className={classes.select}>
                                                <InputLabel id='priority-select-label'>Priority</InputLabel>
                                                <Select labelId='priority-select-label' labelWidth={55} value={priority}
                                                onChange={e => setPriority(e.target.value)}>
                                                    <MenuItem value={'Hight priority'}>Hight</MenuItem>
                                                    <MenuItem value={'Medium priority'}>Medium</MenuItem>
                                                    <MenuItem value={'Low priority'}>Low</MenuItem>
                                                </Select>
                                            </FormControl>
                                    
                                            <TextField type='date' variant='outlined' label='Due date' error={error && !date} helperText={error && !date ? error : ''}
                                            InputLabelProps={{ shrink: true, }} className={classes.date} onChange={e => setDate(e.target.value)} />
                                        </Box>

                                        <Box  margin='10px' display='flex' justifyContent='flex-end'>
                                            <Button color='primary' variant='contained' onClick={handleCreateTodo}>Create</Button>
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

CreateTodoModal.propTypes = {
    isOpen: propTypes.bool,
    closeModal: propTypes.func.isRequired
}