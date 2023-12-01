/* eslint-disable no-extra-boolean-cast */
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../types/Pet';
import { ParasiteControlTimeline } from './ParasiteControlTimeline';
import { useEffect, useState } from 'react';
import { EditParasiteControlModal } from './EditParasiteControlModal';
import SnackbarComponent from '../../components/Snackbar';
import { DeleteParasiteControlModal } from './DeleteParasiteControlModal';
import { ErrorPage } from '../../components/ErrorPage';

const Header = ({ pet }: { pet: Pet }) => {
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
          <Link
            underline="hover"
            color="inherit"
            href={`/owners/${pet.owner.id}/parasite-control`}
          >
            Controle Parasitário
          </Link>

          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
        <Button
          variant="outlined"
          onClick={() => navigate(`../${pet.id}/create`, { relative: 'path' })}
        >
          Novo Registro
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <Typography variant="h4">{`Registros de ${pet.name}`}</Typography>
      </Grid>
    </Grid>
  );
};

export const ParasiteControlPage = () => {
  const {
    selectedPet,
    parasiteControlList,
    snackbarOpen,
    getParasiteControlById,
  } = useVetCareContext();

  const handleGetList = async () => {
    await getParasiteControlById(selectedPet.id);
    setLoading(false);
  };

  useEffect(() => {
    handleGetList();
  }, []);

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true); //TROCAR PARA TRUE

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  useEffect(() => {
    if (!openDelete) handleGetList();
  }, [openDelete, openEdit]);
  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header pet={parasiteControlList} />
          <Grid
            container
            sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
            justifyContent="center"
          >
            {!!parasiteControlList.parasiteControl.length && !loading ? (
              <ParasiteControlTimeline
                list={parasiteControlList.parasiteControl}
                openEdit={handleOpenEdit}
                openDelete={handleOpenDelete}
              />
            ) : !parasiteControlList.parasiteControl.length && !loading ? (
              <ErrorPage label={'Não existem registros para este paciente'} />
            ) : (
              <Grid
                container
                sx={{ height: '100%', width: '100%' }}
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress size={60} />
              </Grid>
            )}
          </Grid>
        </Grid>
        {!!openEdit && (
          <EditParasiteControlModal open={openEdit} setOpen={setOpenEdit} />
        )}
        {!!openDelete && (
          <DeleteParasiteControlModal
            open={openDelete}
            setOpen={setOpenDelete}
            handleGetList={handleGetList}
          />
        )}
        {!!snackbarOpen && <SnackbarComponent />}
      </>
    </BackgroundWrapper>
  );
};
