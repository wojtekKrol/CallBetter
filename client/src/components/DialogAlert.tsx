import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface DialogAlertProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  confirmFunction: Function;
  title: string;
  closeText: string;
  confirmText: string;
  state: boolean;
  setStateBack: (state: boolean) => void;
}
export default function DialogAlert({
  state,
  setStateBack,
  title,
  closeText,
  confirmText,
  confirmFunction,
}: DialogAlertProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(state);
  }, [state]);

  const handleConfirm = () => {
    confirmFunction(setOpen);
  };

  const handleClose = () => {
    setOpen(false);
    setStateBack(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <DialogButton onClick={handleClose}>{closeText}</DialogButton>
          <DialogButton onClick={handleConfirm} primary>
            {confirmText}
          </DialogButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
interface NavbarProps {
  primary?: boolean;
}

const DialogButton = styled.div<NavbarProps>`
  width: 100px;
  height: 40px;
  box-shadow: 0 3px 6px -2px #beb4ff;
  border-radius: 8px;
  border: 0;
  font-weight: 700;
  background: ${({ primary }) =>
    primary
      ? 'linear-gradient(83.55deg, #808cff 3.55%, #b276ff 97.88%)'
      : 'transparent'};

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat SemiBold', sans-serif;
  color: ${({ primary }) => (primary ? '#ffffff' : '#5e27d1')};

  &:hover {
    cursor: pointer;
    border: solid #8662fa;
    color: #5e27d1;
    background: transparent;
    transition: all 0.2s ease-in-out;
  }
  @media (max-width: 768px) {
    width: 100px;
    height: 40px;
  }
`;
