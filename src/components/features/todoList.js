import { Grid, Typography, Paper, Divider, Box, Checkbox, IconButton } from "@material-ui/core"
import { DeleteOutlined, TodayOutlined, Done, Clear } from '@material-ui/icons'
import propTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTodosAsync, deleteTodoAsync, completeTodoAsync } from "../../slices/todosSlice";
import ModalViewTodo from './modalTodo/modalViewTodo'
import { nanoid } from "nanoid";

const useStyles = makeStyles((theme) => ({
    divider:{
        [theme.breakpoints.down('xs')]:{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4)
        },
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(7)
    },
    cardPaper:{
        [theme.breakpoints.down('xs')]:{
            width: '80%',
            height: 'auto'
        },
        width: '27%',
        height: '270px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        margin: `${theme.spacing(3)}px ${theme.spacing(4.1)}px`,
    },
    cardContainer:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
    },
    cardContent:{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cardHead:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    cardBody:{
        wordWrap: 'break-word',
        width: '100%',
        height: '170px',
        maxWidth: '270px',
        overflow: 'hidden',  
        textOverflow: 'ellipsis'
    },
    cardFooter:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    listTitle:{
        [theme.breakpoints.down('xs')]:{
            fontSize: '2.4rem',
        }
    }
}));


export default function TodoList(props){
    const dispatch = useDispatch();
    const todos = useSelector(props.selector.value);
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [todo, setTodo] = useState();
    
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [])

    function handleDelete(id){
        dispatch(deleteTodoAsync(id));
    }

    function handleComplete(obj){
        dispatch(completeTodoAsync(obj));
    }

    function handleView(obj){
        setTodo(obj);
        setIsOpen(true);
    }

    return (
        <Grid container justify='center' direction='column'>
            <Grid item>
                <Box display='flex' alignItems='center' justifyContent='center'>
                    <TodayOutlined fontSize='large' color='primary' />
                    <Typography variant='h3' className={classes.listTitle}>{props.title}</Typography>
                </Box>                
            </Grid>

            <Divider className={classes.divider} />
            <Grid item>
                <Box className={classes.cardContainer}>
                {(todos.length > 0) ? todos.map(currentTodo => {
                    return <Paper key={nanoid()} className={classes.cardPaper} onClick={() => handleView(currentTodo)}>
                        <Box className={classes.cardContent}>
                            <Grid container>
                                <Grid item xs>
                                    <Box className={classes.cardHead}>
                                        <Typography variant='h6'>
                                            {currentTodo.title}
                                        </Typography>
                                        <Box onClick={e => e.stopPropagation()} display='flex' justifyContent='center' alignItems='center'>
                                            <IconButton onClick={() => handleDelete(currentTodo.id)}>
                                                <DeleteOutlined color='secondary' />
                                            </IconButton>
                                            {currentTodo.complete ? <Done color='primary' /> : ((props.title.toLowerCase() === 'overdue') ?
                                            <Clear color='secondary' /> : <Checkbox onClick={() => handleComplete(currentTodo)} />)}
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item style={{ width: '100%' }}> 
                                    <Typography variant='body1' className={classes.cardBody}>
                                        {currentTodo.text}
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Box className={classes.cardFooter}>
                                        <Typography variant='overline'>
                                            {currentTodo.priority}
                                        </Typography>
                                        <Typography>
                                            {currentTodo.date}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                }) :
                <Box m='13rem auto'>
                    <Typography variant='h4' color='textSecondary'>No tasks</Typography>
                </Box>}

                {todo && <ModalViewTodo isOpen={isOpen} closeModal={() => setIsOpen(false)} todo={todo} />}
                </Box>
            </Grid>
        </Grid>
    )
}

TodoList.propTypes = {
    title: propTypes.string,
    selector: propTypes.func.isRequired
}