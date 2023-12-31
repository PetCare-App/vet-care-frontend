import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { useVetCareContext } from '../../context';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Owner } from '../../types/Owner';
import { useEffect, useState } from 'react';
import { InfoItem } from '../../components/InfoItem';
import { OwnerDialog } from '../owner/OwnerDialog';
import { useLocation, useNavigate } from 'react-router-dom';
import { PetInfoCard } from './PetInfoCard';
import { Pet } from '../../types/Pet';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { ErrorPage } from '../../components/ErrorPage';

const Header = () => {
  const navigate = useNavigate();
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
          <Link underline="hover" color="inherit" href="/veterinary-dashboard">
            Home
          </Link>
          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
        <Button
          variant="outlined"
          onClick={() => navigate('../pets/create', { relative: 'path' })}
        >
          Novo Pet
        </Button>
      </Grid>
    </Grid>
  );
};

const OwnerInfo = ({
  selectedOwner,
  setOpenOwnerDialog,
}: {
  selectedOwner: Owner;
  setOpenOwnerDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Grid
      container
      display="grid"
      gap={4}
      sx={{
        ml: '30px',
        pb: '70px',
      }}
    >
      <Grid container display="grid" gridTemplateColumns={'1fr 1fr 0.2fr'}>
        <InfoItem variant="h5" label={'Tutor'} data={selectedOwner.name} />
        <InfoItem variant="h5" label={'Email'} data={selectedOwner.email} />
        <Box width="50px"></Box>
      </Grid>
      <Grid container display="grid" gridTemplateColumns={'1fr 1fr 0.2fr'}>
        <InfoItem
          variant="h5"
          label={'Endereço'}
          data={selectedOwner.address}
        />
        <InfoItem
          variant="h5"
          label={'Telefone'}
          data={selectedOwner.phoneNumber}
        />
        <IconButton
          sx={{
            height: '60px',
            width: '60px',
            mt: '-42px',
          }}
          onClick={() => setOpenOwnerDialog(true)}
        >
          <ReadMoreIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export const PetsDashboard = () => {
  const location = useLocation();

  const { selectedOwner, getOwnerById } = useVetCareContext();
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenOwnerDialog(false);
  };

  useEffect(() => {
    getOwnerById(location.pathname.split('/')[2]);
  }, []);

  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header />
          <OwnerInfo
            selectedOwner={selectedOwner}
            setOpenOwnerDialog={setOpenOwnerDialog}
          />
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
            {!selectedOwner.patients.length && (
              <ErrorPage label="Não existem pacientes cadastrados para este tutor!" />
            )}
            {selectedOwner.patients.map((pet: Pet) => (
              <PetInfoCard pet={pet} key={pet.id} url={`/pets/${pet.id}`} />
            ))}
          </Grid>
        </Grid>
        {!!openOwnerDialog && (
          <OwnerDialog open={openOwnerDialog} handleClose={handleCloseDialog} />
        )}
      </>
    </BackgroundWrapper>
  );
};
