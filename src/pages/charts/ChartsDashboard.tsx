import { Grid } from '@mui/material';
import { Menu } from '../../components/Menu';
import React from 'react';

export const ChartsDashboard = () => {
  return (
    <Grid container sx={{ background: 'blue' }}>
      <Menu />
      <Grid></Grid>
    </Grid>
  );
};
