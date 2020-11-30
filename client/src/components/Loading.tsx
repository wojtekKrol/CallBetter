import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    </div>
  );
};

export default Loading;
