import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from 'react';

import { AuthButton } from './Navbar/Components';

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
          <AuthButton onClick={handleClose} logOut>
            {closeText}
          </AuthButton>
          <AuthButton onClick={handleConfirm} logOut>
            {confirmText}
          </AuthButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
