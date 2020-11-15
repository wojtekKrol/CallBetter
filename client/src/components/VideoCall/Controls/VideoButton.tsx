import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import VideocamOn from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import React, { useState } from 'react';

type Props = {
  className?: string;
};

const VideoButton = ({ className }: Props) => {
  const [isEnabled, toggleTrack] = useState(false);
  return (
    <Tooltip title="Stop Video" placement="top">
      <Fab className={className} onClick={() => toggleTrack(!isEnabled)}>
        {isEnabled ? <VideocamOn /> : <VideocamOff color="error" />}
      </Fab>
    </Tooltip>
  );
};

export default VideoButton;
