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
    loading: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }),
);

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loading} />
    </div>
  );
};
export default Loading;
