import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import { Menu } from '../../components/Menu';
import { useVetCareContext } from '../../context';

export const OwnerDashboard = () => {
  const { selectedOwner } = useVetCareContext();

  console.log('selectedOwner', selectedOwner);

  return (
    <Grid container>
      <Menu />
      <Grid sx={{ m: '50px 20px' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/owners">
            Tutores
          </Link>
          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};
