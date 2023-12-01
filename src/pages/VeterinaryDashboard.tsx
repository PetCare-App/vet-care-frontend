/* eslint-disable no-extra-boolean-cast */
import { CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useVetCareContext } from '../context';
import { OwnerSearch } from './owner/OwnerSearch';
import { decodeToken } from '../utils/auth';

export const VeterinaryDashboard = () => {
  const { getUser, getOwnersList } = useVetCareContext();
  const [loading, setLoading] = useState(true);

  const handleGetUser = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = decodeToken(token);
      if (!!decodeToken) {
        await getUser(decodedToken.sub);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    handleGetUser();
    getOwnersList();
  }, []);

  return (
    <>
      {!!loading && (
        <Grid
          container
          sx={{ width: '100vw', height: '100vh' }}
          justifyContent={'center'}
          alignContent={'center'}
        >
          <CircularProgress size={60} />
        </Grid>
      )}
      {!loading && <OwnerSearch />}
    </>
  );
};
