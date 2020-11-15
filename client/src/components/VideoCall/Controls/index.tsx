import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AudioButton from './AudioButton';
import EndButton from './EndButton';
import VideoButton from './VideoButton';

const useStyles = makeStyles({
  button: {
    flexShrink: 0,
    margin: '0 5px 0 5px'
  },
  audio: {
    gridArea: 'audio'
  },
  end: {
    gridArea: 'end'
  },
  video: {
    gridArea: 'video'
  }
});

const Controls = () => {
  const cx = useStyles();

  return (
    <>
      <AudioButton className={`${cx.audio} ${cx.button}`} />
      <EndButton className={`${cx.end} ${cx.button}`} />
      <VideoButton className={`${cx.video} ${cx.button}`} />
    </>
  );
};

export default Controls;
