import { makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  video: {
    maxWidth: '100%',
    minWidth: '100%',
    maxHeight: '100%',
    minHeight: '100%',
    backgroundColor: '#000',
    objectFit: 'contain'
  }
}));

const Preview = () => {
  const cx = useStyles();

  return (
    <div>
      <video className={cx.video} />
    </div>
  );
};

export default Preview;
