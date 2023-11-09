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
import { ChartsTimeline } from './ChartsTimeline';
import { Owner } from '../../types/Owner';
import { useEffect, useState } from 'react';
import { EditChartModal } from './EditChartModal';
import SnackbarComponent from '../../components/Snackbar';
import { DeleteChartModal } from './DeleteChartModal';
import { ErrorPage } from '../../components/ErrorPage';

const Header = ({ pet, owner }: { pet: Pet; owner: Owner }) => {
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
          <Link
            underline="hover"
            color="inherit"
            href={`/owners/${owner.id}/charts`}
          >
            Prontuários
          </Link>

          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
        <Button
          variant="outlined"
          onClick={() => navigate(`../${pet.id}/create`, { relative: 'path' })}
        >
          Novo Prontuário
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <Typography variant="h4">{`Prontuários de ${pet.name}`}</Typography>
      </Grid>
    </Grid>
  );
};

export const ChartPage = () => {
  const {
    selectedPet,
    selectedOwner,
    medicalRecordList,
    snackbarOpen,
    getMedicalRecordById,
  } = useVetCareContext();

  const handleGetList = async () => {
    await getMedicalRecordById(selectedPet.id);
    setLoading(false);
  };

  useEffect(() => {
    handleGetList();
  }, []);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header pet={selectedPet} owner={selectedOwner} />
          <Grid
            container
            sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
          >
            {!!medicalRecordList.length && !loading ? (
              <ChartsTimeline
                list={medicalRecordList}
                openEdit={handleOpenEdit}
                openDelete={handleOpenDelete}
              />
            ) : !medicalRecordList.length && !loading ? (
              <ErrorPage
                label={
                  'Não existem prontuários de atendimento para este paciente'
                }
              />
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
        {!!openEdit && <EditChartModal open={openEdit} setOpen={setOpenEdit} />}
        {!!openDelete && (
          <DeleteChartModal open={openDelete} setOpen={setOpenDelete} />
        )}
        {!!snackbarOpen && <SnackbarComponent />}
      </>
    </BackgroundWrapper>
  );
};
