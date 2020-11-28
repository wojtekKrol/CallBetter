import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Participant from './Participant';
import Preview from './Preview';

const useStyles = makeStyles((theme) => ({
  grid: {
    display: 'grid',
    height: '60vh',
    gridGap: theme.spacing(3),
    gridTemplateColumns: 'repeat(3, 50%)',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Participants = () => {
  const cx = useStyles();

  return (
    <div className={cx.grid}>
      <div>
        {' '}
        <Preview />
      </div>
      <div>
        <Participant />
      </div>
    </div>
  );
};

export default Participants;
