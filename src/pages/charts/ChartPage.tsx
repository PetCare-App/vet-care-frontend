import { Breadcrumbs, Button, Grid, Link, Typography } from '@mui/material';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../types/Pet';
import { useEffect } from 'react';

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
  const { selectedPet, getMedicalRecordById, medicalRecordList } =
    useVetCareContext();

  useEffect(() => {
    getMedicalRecordById(selectedPet.id);
  }, []);

  console.log('medicalRecordList', medicalRecordList);

  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header pet={selectedPet} />
        </Grid>
      </>
    </BackgroundWrapper>
  );
};
