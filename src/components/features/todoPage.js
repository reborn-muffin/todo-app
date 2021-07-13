import { Toolbar, Container, Tooltip, AppBar, Button, Hidden, Typography, Grid, Drawer,
    Divider, MenuItem, ListItemIcon, Fab, Paper } from "@material-ui/core"
import TodoList from "./todoList"
import { makeStyles } from "@material-ui/core/styles"
import { TodayOutlined, MenuOutlined, DateRangeOutlined, EventBusyOutlined, AddOutlined } from '@material-ui/icons'
import { useState } from "react"
import { signout } from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import CreateTodoModal from "./modalTodo/modalCreateTodo"
import { todaysTodoSelector, nextTodoSelector, overdueTodoSelector } from "../../selectors/todosSelectors"

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]:{
            padding: '0'
        },
        paddingTop: '0',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
    },
    fab:{
        [theme.breakpoints.down('xs')]:{
            right: theme.spacing(3),
        },
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(40),
    },
    paper:{
        paddingTop: theme.spacing(5),
        height: `calc(100% - ${theme.spacing(5)}px)`,
        position: 'relative',
        overflow: 'auto'
    },
}));

export default function TodoPage(){
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [todolistTitle, setTodolistTitle] = useState('Today');
    const [todoSelector, setTodoSelector] = useState({ value: todaysTodoSelector });
    const dispatch = useDispatch();
    
    const classes = useStyles();

    function toogleDrawer(){
        setIsOpen(!isOpen);
    }

    function handleModal(){
        setIsOpenModal(!isOpenModal);
    }
    
    function signoutHandle(){
        dispatch(signout());

        history.push('/login');
    }

    function handleMenu(value, selector){
        setTodolistTitle(value);
        setTodoSelector(selector);
    }

    return (
            <Container className={classes.container}>
                <AppBar position='static'>
                    <Toolbar>
                        <Grid container justify='space-between'>
                            <Hidden smUp>
                                <MenuOutlined style={{ cursor: 'pointer' }} onClick={toogleDrawer} />
                            </Hidden>
                            <Typography variant='h4'>Todo-App</Typography>
                            <Button color='inherit' onClick={signoutHandle}>Logout</Button>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item>
                            <Hidden xsDown>
                                <MenuItem onClick={() => handleMenu('Today', { value: todaysTodoSelector })}>
                                    <ListItemIcon>
                                        <TodayOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Today</Typography>
                                </MenuItem>

                                <Divider />

                                <MenuItem onClick={() => handleMenu('Next', { value: nextTodoSelector })}>
                                    <ListItemIcon>
                                        <DateRangeOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Next</Typography>
                                </MenuItem>

                                <Divider />

                                <MenuItem onClick={() => handleMenu('Overdue', { value: overdueTodoSelector })}>
                                    <ListItemIcon>
                                        <EventBusyOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Overdue</Typography>
                                </MenuItem>
                            </Hidden>
                            <Hidden smUp>
                                <Drawer open={isOpen} onClose={toogleDrawer}>
                                    <MenuItem onClick={() => handleMenu('Today', { value: todaysTodoSelector })}>
                                        <ListItemIcon>
                                            <TodayOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Today</Typography>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem onClick={() => handleMenu('Next', { value: nextTodoSelector })}>
                                        <ListItemIcon>
                                            <DateRangeOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Next</Typography>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem onClick={() => handleMenu('Overdue', { value: overdueTodoSelector })}>
                                        <ListItemIcon>
                                            <EventBusyOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Overdue</Typography>
                                    </MenuItem>
                                </Drawer>
                            </Hidden>
                        </Grid>

                        <Grid item xs>
                            <TodoList title={todolistTitle} selector={todoSelector} />
                        </Grid>
                        
                        <Tooltip title='Create task'>
                            <Fab color='secondary' className={classes.fab} onClick={ handleModal }>
                                <AddOutlined />
                            </Fab>
                        </Tooltip>

                        <CreateTodoModal isOpen={isOpenModal} closeModal={ handleModal } />
                    </Grid>
                </Paper>
            </Container>
    )
}