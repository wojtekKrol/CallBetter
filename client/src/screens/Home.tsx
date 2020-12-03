import Axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { CallStatuses } from '../api/types/call';
import Layout from '../components/Layout/Layout';
import './styles/home.css';
import InfoIcon from '../components/SVG/InfoIcon';
import { SERVER_URL } from '../constants/server';
import UserContext from '../lib/UserContext';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

const Home = () => {
  return (
    <Layout>
      <Container>
        <HistorySection>
          <HitoryPreview />
        </HistorySection>
        <VideoSection>
          <CameraPreview />
        </VideoSection>
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  height: 700px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
const HistorySection = styled.div`
  flex-grow: 1;
`;
const VideoSection = styled.div`
  flex-grow: 3;
`;

const CameraPreview = () => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useContext(UserContext);
  const history = useHistory();

  const createCall = async (e: any) => {
    e.preventDefault();
    try {
      const hostId: string = user?.user?.userData?.id;
      const status = CallStatuses.OPENED;
      const token = localStorage.getItem('auth-token');
      const newCall = await Axios.post(
        `${SERVER_URL}call/createCall`,
        { hostId, status },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );

      enqueueSnackbar('Call room created.', { variant: 'success' });
      history.push(`/call/${newCall?.data?.id}`);
    } catch (error) {
      const msg = error.response.data.msg;
      msg && enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  return (
    <div className="videoWrapper">
      <video autoPlay playsInline />
      <div className="videoButtonWrapper">
        <button className="videoCreateRoom" onClick={createCall}>
          Create room
        </button>
      </div>
    </div>
  );
};

type CallProps = {
  readonly id: string;
  endDate?: Date;
  hostId: string;
  guestId?: string;
  role?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  interlocutorId?: string;
  interlocutorName?: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -10,
      marginLeft: -20,
    },
  }),
);

const HitoryPreview = () => {
  const cx = useStyles();
  const [limit, setLimit] = useState<number>(10);
  const [fetchedCalls, setFechedCalls] = useState<any>([]);
  const [calls, setCalls] = useState<any>([]);
  const user = useContext(UserContext);
  const token = localStorage.getItem('auth-token');
  const userId = user.user.userData.id;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getHistoryCalls = async () => {
      try {
        setLoading(true);
        const historyCalls = await Axios.get(`${SERVER_URL}call/myCalls`, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
          params: {
            userId,
            limit,
          },
        });
        setFechedCalls(historyCalls.data);
      } catch (error) {
        console.error(error);
      }
    };

    // eslint-disable-next-line no-void
    void getHistoryCalls();
  }, [limit, token, userId]);

  useEffect(() => {
    const readableCalls = async (calls: CallProps[], userId: string) => {
      try {
        let results = calls.filter((call: CallProps) => call.guestId);

        results = results.map((call: CallProps) => {
          const interlocutorId =
            call.hostId === userId ? call.guestId : call.hostId;
          return { ...call, interlocutorId };
        });

        const filteredCalls = [];
        for await (const result of results) {
          const fetchedUser = await Axios.get(
            `${SERVER_URL}users/getUserData`,
            {
              headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
              },
              params: {
                id: result.interlocutorId,
              },
            },
          );
          filteredCalls.push({
            ...result,
            interlocutorName: fetchedUser.data.name,
          });
        }
        setCalls(filteredCalls);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    // eslint-disable-next-line no-void
    void readableCalls(fetchedCalls, userId);
  }, [fetchedCalls, token, userId]);

  return (
    <div className="historyWrapper">
      <div className="historyTitle">Connection history</div>
      <div className="historyRecords">
        {calls.map((record: CallProps) => (
          <div className="historyRecord" key={record.createdAt.toString()}>
            <div className="recordName">{record.interlocutorName}</div>
            <div>
              {new Date(record.createdAt).toLocaleDateString()}
              <Link to="/home" component={InfoIcon} />
            </div>
          </div>
        ))}
      </div>
      <div className={cx.wrapper}>
        <button className="historyButton" onClick={() => setLimit(limit + 10)}>
          Show more
        </button>
        {loading && <CircularProgress className={cx.buttonProgress} />}
      </div>
    </div>
  );
};
