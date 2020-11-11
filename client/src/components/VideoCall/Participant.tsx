import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { UserRoleTypes } from '../../api/types';
import { useContextRole } from '../../api/usages';
import { useParticipants } from '../../api/usages/video';
import Participant from './Participant';
import Preview from './Preview';

const useStyles = makeStyles((theme) => ({
  grid: {
    flex: 1,
    display: 'grid',
    gridGap: theme.spacing(3),
    gridTemplateColumns: 'repeat(2, 1fr)',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 150px',
      gridTemplateRows: '1fr 1fr 150px'
    }
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  localParticipant: {
    [theme.breakpoints.down('xs')]: {
      gridColumn: '2 / 3',
      gridRow: '3 / 4',
      padding: 10,
      zIndex: 100
    }
  },
  remoteParticipant: {
    [theme.breakpoints.down('xs')]: {
      gridColumn: '1 / 3',
      gridRow: '1 / 4'
    }
  },
  centeredItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const Participants = () => {
  const cx = useStyles();
  const participants = useParticipants();
  const { t } = useTranslation();
  const role = useContextRole();
  const participant = participants?.[0];

  return (
    <div className={cx.grid}>
      {!participant && (
        <div className={`${cx.centeredItem} ${cx.remoteParticipant}`}>
          <Typography variant="h4" align="center">
            {t('video.pleaseWait')}
            <br />
            {t(
              role === UserRoleTypes.DOCTOR
                ? 'video.thePatientWillJoinYouSoon'
                : 'video.theDoctorWillJoinYouSoon'
            )}
          </Typography>
        </div>
      )}

      {participant && (
        <div className={`${cx.item} ${cx.remoteParticipant}`}>
          <Participant participant={participant} />
        </div>
      )}

      <div className={`${cx.item} ${cx.localParticipant}`}>
        <Preview />
      </div>
    </div>
  );
};

export default Participants;
