import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CallEnd from '@material-ui/icons/CallEnd';
import React from 'react';

type Props = {
  className?: string;
};

const EndButton = ({ className }: Props) => {
  return (
    <Tooltip title="End Call" placement="top" PopperProps={{ disablePortal: true }}>
      <Fab className={className} color="secondary">
        <CallEnd />
      </Fab>
    </Tooltip>
  );
};

export default EndButton;
