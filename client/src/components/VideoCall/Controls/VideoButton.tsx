import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import VideocamOn from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import React, { useState } from 'react';

type Props = {
  className?: string;
  disableVideo: () => void;
};

const VideoButton = ({ className, disableVideo }: Props) => {
  const [isEnabled, toggleTrack] = useState(false);

  const disable = () => {
    toggleTrack(!isEnabled);
    disableVideo();
  };

  return (
    <Tooltip title="Stop Video" placement="top">
      <Fab className={className} onClick={() => disable()}>
        {isEnabled ? <VideocamOn /> : <VideocamOff color="error" />}
      </Fab>
    </Tooltip>
  );
};

export default VideoButton;
