import { Grid, Typography, Paper, Divider, Box, Checkbox, IconButton } from "@material-ui/core"
import { DeleteOutlined, TodayOutlined } from '@material-ui/icons'
import propTypes from 'prop-types'
import { makeStyles } from "@material-ui/core/styles"

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
        width: '24%',
        height: '270px',
        display: 'flex',
        alignItems: 'center',
        margin: `${theme.spacing(3)}px ${theme.spacing(3)}px`,

    },
    cardContainer:{
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        overflow: 'hidden',
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
    const classes = useStyles();

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
                    <Paper className={classes.cardPaper}>
                        <Box className={classes.cardContent}>
                            <Grid container>
                                <Grid item xs>
                                    <Box className={classes.cardHead}>
                                        <Typography variant='h5'>
                                            Todo1
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
                                        loremlo remloremlore e e e e e emloremlore mloremloremloreml oremloremloreml oremloremloremloreml oremloremloreml oremloremloremlorem
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Box className={classes.cardFooter}>
                                        <Typography variant='overline'>
                                            Hight pririty
                                        </Typography>
                                        <Typography>
                                            24.02.2021
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>

                    <Paper className={classes.cardPaper}>
                        <Box className={classes.cardContent}>
                            <Grid container>
                                <Grid item xs>
                                    <Box className={classes.cardHead}>
                                        <Typography variant='h5'>
                                            Todo1
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
                                        loremlo remloremlore e e e e e emloremlore mloremloremloreml oremloremloreml oremloremloremloreml oremloremloreml oremloremloremlorem
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Box className={classes.cardFooter}>
                                        <Typography variant='overline'>
                                            Hight pririty
                                        </Typography>
                                        <Typography>
                                            24.02.2021
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