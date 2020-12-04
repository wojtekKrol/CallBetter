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
      `,
    },
    justifyContent: 'space-between',
  },
  controls: {
    gridArea: 'controls',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

interface ToolbarProps {
  endCall: () => void;
  disableAudio: () => void;
  disableVideo: () => void;
}

const Toolbar = ({ endCall, disableVideo, disableAudio }: ToolbarProps) => {
  const cx = useStyles();

  return (
    <>
      <div className={cx.toolbar}>
        <div className={cx.controls}>
          <Controls
            disableAudio={disableAudio}
            disableVideo={disableVideo}
            endCall={endCall}
          />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
