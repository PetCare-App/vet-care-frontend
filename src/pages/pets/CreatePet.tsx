/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { Header } from '../../components/Header';
import { useState } from 'react';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../../components/Snackbar';
import { petInit } from '../../types/Pet';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';

export const CreatePet = () => {
  const { createPet, snackbarOpen, selectedOwner } = useVetCareContext();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(petInit);
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
    petData.ownerId = selectedOwner.id;

    const { status } = await createPet(petData);
    if (!!status) navigate('..', { relative: 'path' });
    setLoading(false);
  };
  return (
    <BackgroundWrapper>
      <Grid
        sx={{
          pt: '30px',
          width: '100%',
        }}
      >
        <Header
          breadcrumbs={
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                href="/veterinary-dashboard"
              >
                Home
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
          }
          title={'Adicione um paciente!'}
        />
        <form
          onSubmit={(e) => {
            setLoading(true);
            handleSubmit(e);
            setLoading(false);
          }}
          style={{ width: '1000px' }}
        >
          <Grid
            container
            sx={{ marginTop: '100px' }}
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
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ width: '400px', marginTop: '0px' }}
              justifyContent="center"
              direction={'column'}
              gap={4}
            >
              <Grid item sx={{ marginTop: '-20px' }}>
                <InputLabel>Data de nascimento *</InputLabel>
                <TextField
                  name="dateOfBirth"
                  type="date"
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                />
              </Grid>
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
            sx={{ marginTop: '50px' }}
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
        {!!snackbarOpen.status && <SnackbarComponent />}
      </Grid>
    </BackgroundWrapper>
  );
};
