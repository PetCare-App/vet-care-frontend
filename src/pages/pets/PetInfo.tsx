/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useVetCareContext } from '../../context';
import Paw from './../../assets/paw.png';
import Dog from './../../assets/dog.png';
import Cat from './../../assets/cat.png';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorPage } from '../../components/ErrorPage';
import { ArrowBack, Edit } from '@mui/icons-material';
import { InfoItem } from '../../components/InfoItem';
import { dateFormatter } from '../../utils/dateFormatter';
import { breeds, genders } from '../../utils/normalizers';
import { Pet } from '../../types/Pet';
import SnackbarComponent from '../../components/Snackbar';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';

const Header = () => {
  const { selectedPet } = useVetCareContext();

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
            href={`/owners/${selectedPet.id}/pets`}
          >
            Pets
          </Link>
          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

const PetData = ({ selectedPet }: { selectedPet: Pet }) => {
  return (
    <Grid sx={{ p: '19px 50px' }}>
      <Grid display="grid" gridTemplateRows={'repeat(1fr)'} gap={4}>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Espécie'}
            data={breeds[selectedPet.species]}
          />
          <InfoItem variant="h6" label={'Raça'} data={selectedPet.breed} />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Gênero'}
            data={genders[selectedPet.sex]}
          />
          <InfoItem variant="h6" label={'Pelagem'} data={selectedPet.color} />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Data de Nascimento'}
            data={
              selectedPet?.dateOfBirth
                ? dateFormatter(selectedPet?.dateOfBirth)
                : '-'
            }
          />
          <InfoItem
            variant="h6"
            label={'Peso'}
            data={`${selectedPet.weight} kg`}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Medicações'}
            data={selectedPet.medications ? selectedPet.medications : '-'}
          />
          <InfoItem
            variant="h6"
            label={'Alergias'}
            data={selectedPet.allergies ? selectedPet.allergies : '-'}
          />
        </Grid>

        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Plano de saúde'}
            data={selectedPet.currentStatus}
          />
          <Box></Box>
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr'}>
          <InfoItem
            variant="h6"
            label={'Notas'}
            data={
              selectedPet.additionalNotes ? selectedPet.additionalNotes : '-'
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const UpdatePet = ({
  selectedPet,
  setIsEdit,
}: {
  selectedPet: Pet;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updatePet } = useVetCareContext();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(selectedPet);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: name == 'weight' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (typeof petData.weight == 'string')
      petData.weight = parseFloat(petData.weight);
    const { status } = await updatePet(petData);
    if (!!status) {
      setIsEdit(false);
      navigate('..', { relative: 'path' });
    }
    setLoading(false);
  };

  return (
    <Grid container justifyContent="center">
      <form
        onSubmit={(e) => {
          setLoading(true);
          handleSubmit(e);
        }}
        style={{ width: '800px' }}
      >
        <Grid
          container
          sx={{ marginTop: '10px' }}
          justifyContent="center"
          flexWrap={'nowrap'}
          gap={12}
        >
          <Grid
            container
            sx={{ width: '400px' }}
            justifyContent="center"
            direction={'column'}
            gap={4}
          >
            <Grid item>
              <TextField
                label="Nome *"
                name="name"
                value={petData.name}
                onChange={handleChange}
                sx={{ width: '400px' }}
              />
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>Espécie *</InputLabel>
                <Select
                  name="species"
                  value={petData.species}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                >
                  <MenuItem value="cat">Gato</MenuItem>
                  <MenuItem value="dog">Cachorro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Raça *"
                name="breed"
                value={petData.breed}
                onChange={handleChange}
                // InputProps={{
                //   inputComponent: PhoneMask,
                // }}
                sx={{ width: '400px' }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Peso *"
                name="weight"
                type="number"
                inputProps={{
                  min: 0, // Define um valor mínimo, se necessário
                  step: 0.1, // Define o incremento (por padrão, é 1)
                }}
                value={petData.weight}
                onChange={handleChange}
                sx={{ width: '400px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">kg</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: '400px', marginTop: '-80px' }}
            justifyContent="center"
            direction={'column'}
            gap={4}
          >
            <Grid item>
              <FormControl>
                <InputLabel>Gênero *</InputLabel>
                <Select
                  name="sex"
                  value={petData.sex}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                >
                  <MenuItem value="female">Fêmea</MenuItem>
                  <MenuItem value="male">Macho</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Alergias"
                name="allergies"
                value={petData.allergies}
                onChange={handleChange}
                sx={{ width: '400px' }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Pelagem *"
                name="color"
                value={petData.color}
                onChange={handleChange}
                sx={{ width: '400px' }}
              />
            </Grid>
          </Grid>
        </Grid>
        {/**GRID BOTÕES */}
        <Grid
          container
          direction="column"
          sx={{ marginTop: '20px' }}
          justifyContent="center"
          alignContent="center"
          gap={8}
        >
          <Grid item>
            <TextField
              label="Notas Adicionais *"
              name="additionalNotes"
              value={petData.additionalNotes}
              onChange={handleChange}
              sx={{ width: '900px' }}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item alignSelf="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!!loading}
              sx={{ color: 'white' }}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

const PageContent = () => {
  const navigate = useNavigate();

  const { selectedPet, snackbarOpen } = useVetCareContext();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      sx={{
        height: 'calc(100% - 150px)',
        width: 'calc(100% - 40px)',
        mt: '-20px',
        p: '30px',
      }}
    >
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Avatar
          src={
            selectedPet?.species == 'Cat'
              ? Cat
              : selectedPet?.species == 'Dog'
              ? Dog
              : Paw
          }
          sx={{ height: '200px', width: '200px', mt: '-70px' }}
        />
        <Typography variant="h4">Dados do {selectedPet.name}</Typography>
        {!isEdit ? (
          <IconButton
            sx={{ height: '50px', width: '50px' }}
            onClick={() => {
              setIsEdit(true);
              navigate(`../${selectedPet.id}/update`, { relative: 'path' });
            }}
          >
            <Edit sx={{ fontSize: '30px' }} />
          </IconButton>
        ) : (
          <IconButton
            sx={{ height: '50px', width: '50px' }}
            onClick={() => {
              navigate(`..`, {
                relative: 'path',
              });

              setIsEdit(false);
            }}
          >
            <ArrowBack sx={{ fontSize: '30px' }} />
          </IconButton>
        )}
      </Grid>
      {!isEdit ? (
        <PetData selectedPet={selectedPet} />
      ) : (
        <UpdatePet selectedPet={selectedPet} setIsEdit={setIsEdit} />
      )}
      {!!snackbarOpen.status && <SnackbarComponent />}
    </Grid>
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
    <BackgroundWrapper>
      <Grid container alignContent="flex-start">
        <Header />
        <Stack sx={{ height: 'calc(100% - 150px)', width: '100%' }}>
          {!!loadingInfo && !errorPage ? (
            <Stack
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 'calc(100% - 150px)', width: '100%' }}
            >
              <CircularProgress
                color="primary"
                sx={{ justifySelf: 'center' }}
              />
            </Stack>
          ) : !loadingInfo && !!errorPage ? (
            <Stack
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              sx={{ height: 'calc(100% - 150px)', width: '100%' }}
            >
              <ErrorPage
                label={
                  'Não foi possível buscar as informações deste pet, tente novamente!'
                }
              />
            </Stack>
          ) : (
            <PageContent />
          )}
        </Stack>
      </Grid>
    </BackgroundWrapper>
  );
};
