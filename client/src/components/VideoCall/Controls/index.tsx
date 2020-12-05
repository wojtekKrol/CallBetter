import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AudioButton from './AudioButton';
import EndButton from './EndButton';
import VideoButton from './VideoButton';

const useStyles = makeStyles({
  button: {
    flexShrink: 0,
    margin: '0 5px 0 5px',
  },
  audio: {
    gridArea: 'audio',
  },
  end: {
    gridArea: 'end',
  },
  video: {
    gridArea: 'video',
  },
});

interface ControlsProps {
  endCall: () => void;
  disableAudio: () => void;
  disableVideo: () => void;
}

const Controls = ({ endCall, disableVideo, disableAudio }: ControlsProps) => {
  const cx = useStyles();

  return (
    <>
      <AudioButton
        className={`${cx.audio} ${cx.button}`}
        disableAudio={disableAudio}
      />
      <EndButton className={`${cx.end} ${cx.button}`} endCall={endCall} />
      <VideoButton
        className={`${cx.video} ${cx.button}`}
        disableVideo={disableVideo}
      />
    </>
  );
};

export default Controls;
