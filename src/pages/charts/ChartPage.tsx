import { Breadcrumbs, Button, Grid, Link, Typography } from '@mui/material';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../types/Pet';
import { ChartsTimeline } from './ChartsTimeline';
import { Owner } from '../../types/Owner';

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
    getMedicalRecordById,
    medicalRecordList,
  } = useVetCareContext();

  // useEffect(() => {
  //   getMedicalRecordById(selectedPet.id);
  // }, []);

  console.log('medicalRecordList', medicalRecordList);

  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
          <Header pet={selectedPet} owner={selectedOwner} />
          <Grid
            container
            sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
          >
            <ChartsTimeline list={medicalRecordList} />
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};
