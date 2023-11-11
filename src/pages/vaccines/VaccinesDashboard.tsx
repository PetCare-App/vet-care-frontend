import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useLocation } from 'react-router-dom';
import { useVetCareContext } from '../../context';
import { Pet } from '../../types/Pet';
import { PetInfoCard } from '../pets/PetInfoCard';

const Header = () => {
  return (
    <Grid container flexDirection="row" alignContent="flex-start">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          paddingRight: '50px',
          paddingLeft: '50px',
          marginTop: '30px',
          width: '100%',
          height: '100px',
        }}
      >
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
      <Grid container justifyContent="center">
        <Typography variant="h4">Escolha o paciente:</Typography>
      </Grid>
    </Grid>
  );
};

export const VaccinesDashboard = () => {
  const location = useLocation();

  const { selectedOwner, getOwnerById } = useVetCareContext();

  useEffect(() => {
    getOwnerById(location.pathname.split('/')[2]);
  }, []);

  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header />
          <Grid
            container
            gap={5}
            sx={{
              width: '100%',
              height: 'calc(100% - 250px)',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedOwner.patients.map((pet: Pet) => (
              <PetInfoCard pet={pet} key={pet.id} url={`/vaccines/${pet.id}`} />
            ))}
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};
