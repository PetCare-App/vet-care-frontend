import { Avatar, Grid, Typography } from '@mui/material';
import Paw from './../assets/paw.png';

export const ErrorPage = ({ label }: { label: string }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignSelf="center"
      sx={{ width: '700px' }}
    >
      <Avatar src={Paw} sx={{ height: '300px', width: '300px' }} />
      <Typography variant="h5">{label}</Typography>
    </Grid>
  );
};
