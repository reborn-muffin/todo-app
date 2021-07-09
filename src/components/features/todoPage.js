import { Toolbar, Container, Tooltip, AppBar, Button, Hidden, Typography, Grid, Drawer, Divider, MenuItem, ListItemIcon, Fab, Paper } from "@material-ui/core"
import TodoList from "./todoList"
import { makeStyles } from "@material-ui/core/styles"
import { TodayOutlined, MenuOutlined, DateRangeOutlined, CalendarTodayOutlined, EventBusyOutlined, AddOutlined } from '@material-ui/icons'
import { useState } from "react"
import { signout } from "../../slices/authSlice"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]:{
            padding: '0'
        },
        paddingTop: '0',
        height: `calc(100vh - ${theme.spacing(8)}px)`,
    },
    fab:{
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(3),
    },
    paper:{
        paddingTop: theme.spacing(5),
        height: `calc(100% - ${theme.spacing(5)}px)`,
        position: 'relative',
    },
}));

export default function TodoPage(){
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const classes = useStyles();

    function toogleDrawer(){
        setIsOpen(!isOpen);
    }
    
    function signoutHandle(){
        dispatch(signout());
        history.push('/login');
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
                                <MenuItem>
                                    <ListItemIcon>
                                        <TodayOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Today</Typography>
                                </MenuItem>

                                <Divider />

                                <MenuItem>
                                    <ListItemIcon>
                                        <DateRangeOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Next</Typography>
                                </MenuItem>

                                <Divider />

                                <MenuItem>
                                    <ListItemIcon>
                                        <CalendarTodayOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Tomorrow</Typography>
                                </MenuItem>

                                <Divider />

                                <MenuItem>
                                    <ListItemIcon>
                                        <EventBusyOutlined color='primary' />
                                    </ListItemIcon>
                                    <Typography>Overdue</Typography>
                                </MenuItem>
                            </Hidden>
                            <Hidden smUp>
                                <Drawer open={isOpen} onClose={toogleDrawer}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <TodayOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Today</Typography>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem>
                                        <ListItemIcon>
                                            <DateRangeOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Next</Typography>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem>
                                        <ListItemIcon>
                                            <CalendarTodayOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Tomorrow</Typography>
                                    </MenuItem>

                                    <Divider />

                                    <MenuItem>
                                        <ListItemIcon>
                                            <EventBusyOutlined color='primary' />
                                        </ListItemIcon>
                                        <Typography>Overdue</Typography>
                                    </MenuItem>
                                </Drawer>
                            </Hidden>
                        </Grid>

                        <Grid item xs>
                            <TodoList title='Today' />
                        </Grid>
                        
                        <Tooltip title='Create task'>
                            <Fab color='secondary' className={classes.fab}>
                                <AddOutlined />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </Paper>
            </Container>
    )
}