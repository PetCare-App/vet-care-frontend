import { Grid } from '@mui/material';
import { Menu } from './Menu';

export const BackgroundWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <Grid
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      sx={{ height: '100vh' }}
    >
      <Menu />
      {children}
    </Grid>
  );
};
