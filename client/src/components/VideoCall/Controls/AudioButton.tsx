import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import MicOn from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import React, { useState } from 'react';

type Props = {
  className?: string;
  disableAudio: () => void;
};

const AudioButton = ({ className, disableAudio }: Props) => {
  const [isEnabled, toggleTrack] = useState(true);

  const disable = () => {
    toggleTrack(!isEnabled);
    disableAudio();
  };

  return (
    <Tooltip title="Mute" placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={className} onClick={() => disable()}>
        {isEnabled ? <MicOn /> : <MicOff color="error" />}
      </Fab>
    </Tooltip>
  );
};

export default AudioButton;
