import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  video: {
    maxWidth: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    backgroundColor: 'red',
    objectFit: 'contain'
  }
});

const Participant = () => {
  const cx = useStyles();

  return (
    <div>
      <video className={cx.video} autoPlay playsInline />
      <audio />
    </div>
  );
};

export default Participant;
