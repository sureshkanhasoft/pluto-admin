import React from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Paper,
    Box,
    Button,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import history from '../../utils/HistoryUtils';


const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    desc: {
        fontSize: 16
    },
    heading: {
        color: "#626161",
    },
    gridItem: {
        borderBottom: "1px solid #ccc"
    },
    btnContainer: {
        '& > *': {
            marginLeft: theme.spacing(2),
            "& svg": {
                width: 20,
                height: "auto"
            }
        },
    }
}))

const DetailStaff = ({ match }) => {
    const upadateLink = () => {
        let dir = match.path;
        const updateLink = dir.substring(0, dir.lastIndexOf('/'));
        history.push(`${updateLink}/update`)
    }
    const classes = useStyle();
    return (
        <Paper className={`${classes.root} mb-6`}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>First Name</Typography>
                    <Typography variant="h6" className={classes.desc}>John </Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>Last Name</Typography>
                    <Typography variant="h6" className={classes.desc}>Smithh</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                    <Typography variant="h6" className={classes.desc}>john.smith@example.com</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>Contact Number</Typography>
                    <Typography variant="h6" className={classes.desc}>077777777777</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>Select Role:</Typography>
                    <Typography variant="h6" className={classes.desc}>Manager</Typography>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                    <Typography variant="body2" className={classes.heading}>Select Designation</Typography>
                    <Typography variant="h6" className={classes.desc}>Compliance</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                        <Button variant="contained" color="primary" onClick={upadateLink}>
                            <EditIcon className="mr-2" />Edit
                        </Button>
                        <Button variant="contained" color="secondary">
                            <DeleteIcon className="mr-2" />Delete
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DetailStaff
