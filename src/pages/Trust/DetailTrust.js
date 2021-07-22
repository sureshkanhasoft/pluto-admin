import React from 'react';
import {
    Grid, Typography, makeStyles, Paper, Box,
    Button
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

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

    mainWrapper:{
        paddingBottom:"0 !important",
        paddingTop:"24px !important"
    },

    mainTitle: {
        fontSize: 18,
        color: "#ff8b46",
        fontWeight: "500",
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

const DetailTrust = () => {
    const classes = useStyle();
    return (
        <>
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.mainTitle}>Trust Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Name</Typography>
                        <Typography variant="h6" className={classes.desc}>Apex care Trust</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>12345</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Preferred Invoice Method</Typography>
                        <Typography variant="h6" className={classes.desc}>Email</Typography>
                    </Grid>


                    <Grid item xs={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>testtrust@gmial.com</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={7} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Address</Typography>
                        <Typography variant="h6" className={classes.desc}>123 Test Street, Postal code in Cambridge, England</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>City</Typography>
                        <Typography variant="h6" className={classes.desc}>Cambridge</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Postal Code</Typography>
                        <Typography variant="h6" className={classes.desc}>CB10BX</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Portal Login Details</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Portal URL</Typography>
                        <Typography variant="h6" className={classes.desc}>https://www.google.co.uk/</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>trust@gmail.com</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Password</Typography>
                        <Typography variant="h6" className={classes.desc}>123</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Training</Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Training Example Type</Typography>
                        <Typography variant="h6" className={classes.desc}>Test training</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Wards</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Name</Typography>
                        <Typography variant="h6" className={classes.desc}>Test Ward</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Type</Typography>
                        <Typography variant="h6" className={classes.desc}>Hospital</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Number</Typography>
                        <Typography variant="h6" className={classes.desc}>1001</Typography>
                    </Grid>


                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Contact Information</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>First Name</Typography>
                        <Typography variant="h6" className={classes.desc}>Jorge</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Last Name</Typography>
                        <Typography variant="h6" className={classes.desc}>Warner</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>jorge@gmail.com</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Phone Number</Typography>
                        <Typography variant="h6" className={classes.desc}>999 999 9999</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Client</Typography>
                        <Typography variant="h6" className={classes.desc}>Client</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Department</Typography>
                        <Typography variant="h6" className={classes.desc}>Department</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button variant="contained" color="primary">
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            <Button variant="contained" color="secondary">
                                <DeleteIcon className="mr-2" />Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default DetailTrust