import { Grid, Typography, Paper, Divider, Box, Checkbox, IconButton } from "@material-ui/core"
import { DeleteOutlined, TodayOutlined } from '@material-ui/icons'
import propTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles"
import { todosSelector } from "../../selectors/todosSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodosAsync } from "../../slices/todosSlice";

const useStyles = makeStyles((theme) => ({
    divider:{
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
        alignItems: 'center',
        margin: `${theme.spacing(3)}px ${theme.spacing(4.1)}px`,
    },
    cardContainer:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '100%'
    },
    cardContent:{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cardHead:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardBody:{
        wordWrap: 'break-word'
    },
    cardFooter:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));


export default function TodoList(props){
    const dispatch = useDispatch();
    const todos = useSelector(todosSelector);
    const classes = useStyles();
    
    useEffect(() => {
        dispatch(getTodosAsync());
    }, [])

    return (
        <Grid container justify='center' direction='column'>
            <Grid item>
                <Box display='flex' alignItems='center' justifyContent='center'>
                    <TodayOutlined fontSize='large' color='primary' />
                    <Typography variant='h3'>{props.title}</Typography>
                </Box>                
            </Grid>

            <Divider className={classes.divider} />
            <Grid item>
                <Box className={classes.cardContainer}>
                {(todos.length > 0) && todos.map(todo => {
                    return <Paper className={classes.cardPaper}>
                        <Box className={classes.cardContent}>
                            <Grid container>
                                <Grid item xs>
                                    <Box className={classes.cardHead}>
                                        <Typography variant='h5'>
                                            {todo.title}
                                        </Typography>
                                        <Box>
                                            <IconButton>
                                                <DeleteOutlined color='secondary' />
                                            </IconButton>
                                            <Checkbox />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs> 
                                    <Typography variant='body1' className={classes.cardBody}>
                                        {todo.text}
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Box className={classes.cardFooter}>
                                        <Typography variant='overline'>
                                            {todo.priority}
                                        </Typography>
                                        <Typography>
                                            {todo.date}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                })}

                <Paper className={classes.cardPaper}>
                        <Box className={classes.cardContent}>
                            <Grid container>
                                <Grid item xs>
                                    <Box className={classes.cardHead}>
                                        <Typography variant='h5'>
                                            qq
                                        </Typography>
                                        <Box>
                                            <IconButton>
                                                <DeleteOutlined color='secondary' />
                                            </IconButton>
                                            <Checkbox />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs> 
                                    <Typography variant='body1' className={classes.cardBody}>
                                        qqqqqqqqqqqqqqqdddddddddddddddd 
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Box className={classes.cardFooter}>
                                        <Typography variant='overline'>
                                            222222
                                        </Typography>
                                        <Typography>
                                            dddddddd
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
    )
}

TodoList.propTypes = {
    title: propTypes.string
}