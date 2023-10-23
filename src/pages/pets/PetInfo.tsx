import {
  Avatar,
  Breadcrumbs,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Menu } from '../../components/Menu';
import { useVetCareContext } from '../../context';
import Paw from './../../assets/paw.png';
import Dog from './../../assets/dog.png';
import Cat from './../../assets/cat.png';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorPage } from '../../components/ErrorPage';

const Header = () => {
  const { selectedOwner } = useVetCareContext();

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
          <Link underline="hover" color="inherit" href="/owners">
            Tutores
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href={`/owners/${selectedOwner.id}/pets`}
          >
            Pets
          </Link>
          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

const PageContent = () => {
  const { selectedPet } = useVetCareContext();

  return (
    <Stack>
      <Avatar
        src={
          selectedPet?.species == 'Cat'
            ? Cat
            : selectedPet?.species == 'Dog'
            ? Dog
            : Paw
        }
        sx={{ height: '200px', width: '200px' }}
      />
      <Typography></Typography>
    </Stack>
  );
};

export const PetInfo = () => {
  const { getPetById } = useVetCareContext();
  const location = useLocation();

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorPage, setErrorPage] = useState(false);

  const handleGetPetById = async () => {
    const response = await getPetById(location.pathname.split('/')[2]);

    if (response.status !== 200) {
      setLoadingInfo(false);
      setErrorPage(true);
    } else {
      setLoadingInfo(false);
    }
  };

  useEffect(() => {
    handleGetPetById();
  }, []);

  return (
    <>
      <Grid container flexDirection="row" flexWrap="nowrap">
        <Menu />
        <Grid container alignContent="flex-start">
          <Header />
          <Stack
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 'calc(100% - 150px)', width: '100%' }}
          >
            {!!loadingInfo && !errorPage ? (
              <CircularProgress color="primary" />
            ) : !loadingInfo && !!errorPage ? (
              <ErrorPage
                label={
                  'Não foi possível buscar as informações deste pet, tente novamente!'
                }
              />
            ) : (
              <PageContent />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
