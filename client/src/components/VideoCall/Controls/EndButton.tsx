import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CallEnd from '@material-ui/icons/CallEnd';
import Axios from 'axios';
import React, { useState } from 'react';

import DialogAlert from '../../DialogAlert';
type Props = {
  className?: string;
};

const EndButton = ({ className }: Props) => {
  const title = 'Are you sure you want to leave call?';
  const closeText = 'Stay';
  const confirmText = 'Leave';
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const confirmCallLeave = () => {};

  return (
    <>
      <DialogAlert
        confirmFunction={() => console.log('test')}
        title={title}
        closeText={closeText}
        confirmText={confirmText}
        state={open}
        setStateBack={setOpen}
      />
      <Tooltip
        title="End Call"
        placement="top"
        PopperProps={{ disablePortal: true }}>
        <Fab className={className} color="secondary" onClick={openDialog}>
          <CallEnd />
        </Fab>
      </Tooltip>
    </>
  );
};

export default EndButton;
