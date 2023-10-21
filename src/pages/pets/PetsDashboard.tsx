import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { Menu } from '../../components/Menu';
import { useVetCareContext } from '../../context';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Owner } from '../../types/Owner';
import { useState } from 'react';
import { InfoItem } from '../../components/InfoItem';
import { OwnerDialog } from '../owner/OwnerDialog';
import { useNavigate } from 'react-router-dom';

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
          <Link underline="hover" color="inherit" href="/home">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/owners">
            Tutores
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
  const { selectedOwner } = useVetCareContext();
  const [openOwnerDialog, setOpenOwnerDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenOwnerDialog(false);
  };

  return (
    <>
      <Grid container flexDirection="row" flexWrap="nowrap">
        <Menu />
        <Grid container alignContent="flex-start">
          <Header />
          <OwnerInfo
            selectedOwner={selectedOwner}
            setOpenOwnerDialog={setOpenOwnerDialog}
          />
        </Grid>
        {!!openOwnerDialog && (
          <OwnerDialog open={openOwnerDialog} handleClose={handleCloseDialog} />
        )}
      </Grid>
    </>
  );
};
