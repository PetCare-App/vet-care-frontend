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
import { useEffect, useState } from 'react';
import { EditChartModal } from './EditChartModal';
import SnackbarComponent from '../../components/Snackbar';
import { DeleteChartModal } from './DeleteChartModal';
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
            href={`/owners/${pet.owner.id}/charts`}
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
  const { selectedPet, medicalRecordList, snackbarOpen, getMedicalRecordById } =
    useVetCareContext();

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

  useEffect(() => {
    if (!openDelete) handleGetList();
  }, [openDelete, openEdit]);
  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header pet={medicalRecordList} />
          <Grid
            container
            sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
          >
            {!!medicalRecordList.patientMedicalRecord.length && !loading ? (
              <ChartsTimeline
                list={medicalRecordList.patientMedicalRecord}
                openEdit={handleOpenEdit}
                openDelete={handleOpenDelete}
              />
            ) : !medicalRecordList.patientMedicalRecord.length && !loading ? (
              <Grid container justifyContent={'center'}>
                <ErrorPage
                  label={
                    'Não existem prontuários de atendimento para este paciente'
                  }
                />
              </Grid>
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
          <DeleteChartModal
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
