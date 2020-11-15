import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Controls from './Controls';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateAreas: `
      "controls ." 
    `,
    padding: '15px 50px',
    justifyItems: 'center',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `
        "controls"
      `
    },
    justifyContent: 'space-between'
  },
  controls: {
    gridArea: 'controls',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}));

const Toolbar = () => {
  const cx = useStyles();

  return (
    <>
      <div className={cx.toolbar}>
        <div className={cx.controls}>
          <Controls />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
