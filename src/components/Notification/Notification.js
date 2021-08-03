import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const Notification = ({data}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                        {data}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notification;