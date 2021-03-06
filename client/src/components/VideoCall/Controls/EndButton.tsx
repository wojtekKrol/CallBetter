import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import CallEnd from '@material-ui/icons/CallEnd';
import Axios from 'axios';
import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { CallStatuses } from '../../../api/types/call';
import { SERVER_URL } from '../../../constants/server';
import DialogAlert from '../../DialogAlert';

type Props = {
  className?: string;
  endCall: () => void;
};

const EndButton = ({ className, endCall }: Props) => {
  const params = useParams();
  const title = 'Are you sure you want to leave call?';
  const closeText = 'Stay';
  const confirmText = 'Leave';
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const openDialog = () => {
    setOpen(true);
  };

  const confirmCallLeave = async () => {
    const token = localStorage.getItem('auth-token');
    const status = CallStatuses.CLOSED;
    const endDate = new Date();
    // @ts-ignore
    const id = params.callId;

    await Axios.post(
      `${SERVER_URL}call/endCall`,
      { id, endDate, status },
      {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      },
    );
    endCall();
    history.push('/');
  };

  return (
    <>
      <DialogAlert
        confirmFunction={confirmCallLeave}
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
