import Axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading';
import Participants from '../components/VideoCall/Participants';
import Toolbar from '../components/VideoCall/Toolbar';
import { SERVER_URL } from '../constants/server';
import UserContext from '../lib/UserContext';

const VideoCall = () => {
  const params = useParams();
  const history = useHistory();
  const user = useContext(UserContext);
  const userId = user?.user?.userData?.id;
  // @ts-ignore
  const callId = params?.callId;
  const token = localStorage.getItem('auth-token');

  const [gettingDataLoading, setGettingDataLoading] = useState<boolean>(false);
  const [updateDataLoading, setUpdateDataLoading] = useState<boolean>(false);

  const [callData, setCallData] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getCallDetails = async () => {
      try {
        setGettingDataLoading(true);

        const callData = await Axios.post(
          `${SERVER_URL}call/getCallDetails`,
          { callId },
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json',
            },
          },
        );
        setCallData(callData.data);
        setGettingDataLoading(false);
      } catch (error) {
        const msg = error.response.data.msg;
        msg && enqueueSnackbar(msg, { variant: 'error' });
        setGettingDataLoading(false);
      }
    };
    // eslint-disable-next-line no-void
    void getCallDetails();
  }, [callId, token, enqueueSnackbar]);

  useEffect(() => {
    if (!gettingDataLoading && callData?.hostId && callData?.status) {
      const tryUpdateCall = async () => {
        try {
          setUpdateDataLoading(true);
          const { hostId, guestId, status } = callData;

          await Axios.post(
            `${SERVER_URL}call/updateCall`,
            { callId, userId, hostId, guestId, status },
            {
              headers: {
                'x-auth-token': token,
                'Content-Type': 'application/json',
              },
            },
          );
          setUpdateDataLoading(false);
        } catch (error) {
          const msg = error?.response?.data?.msg;
          msg && enqueueSnackbar(msg, { variant: 'error' });
          history.push('/');
          setUpdateDataLoading(false);
        }
      };
      // eslint-disable-next-line no-void
      void tryUpdateCall();
    }
  }, [callData, callId, enqueueSnackbar, gettingDataLoading, token, userId]);

  if (gettingDataLoading || updateDataLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Participants />
      <Toolbar />
    </Layout>
  );
};

export default VideoCall;
