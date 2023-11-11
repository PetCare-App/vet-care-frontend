/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Button,
  Grid,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

import { Header } from '../../components/Header';
import { useState } from 'react';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../../components/Snackbar';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { vaccineInit } from '../../types/Vaccine';

export const CreateVaccine = () => {
  const { createVaccine, snackbarOpen, selectedOwner, selectedPet } =
    useVetCareContext();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(vaccineInit);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { status } = await createVaccine(petData);
    if (!!status) navigate(`../../${selectedPet.id}`, { relative: 'path' });
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
                href={`/owners/${selectedOwner.id}/vaccines`}
              >
                Vacinas
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/vaccines/${selectedPet.id}`}
              >
                {selectedPet.name}
              </Link>
              <Typography color="text.primary">Aqui</Typography>
            </Breadcrumbs>
          }
          title={'Atendimento de Vacinação'}
        />
        <Grid container justifyContent="center" sx={{ mt: '100px' }}>
          <form
            onSubmit={(e) => {
              setLoading(true);
              handleSubmit(e);
              setLoading(false);
            }}
            style={{ width: '1000px' }}
          >
            <Grid display="grid" gridTemplateRows={'repeat(1fr)'} gap={5}>
              <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
                <TextField
                  label="Paciente *"
                  name="patient"
                  value={selectedPet.name}
                  disabled
                  sx={{ width: '400px' }}
                />
                <Grid item sx={{ marginTop: '-20px' }}>
                  <InputLabel>Data da aplicação *</InputLabel>
                  <TextField
                    name="dateAdministered"
                    type="date"
                    onChange={handleChange}
                    sx={{ width: '400px' }}
                  />
                </Grid>
              </Grid>
              <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
                <TextField
                  label="Vacina *"
                  name="name"
                  value={petData.name}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                />
                <Grid item sx={{ marginTop: '-25px' }}>
                  <InputLabel>Data de validade *</InputLabel>
                  <TextField
                    name="expiryDate"
                    type="date"
                    onChange={handleChange}
                    sx={{ width: '400px' }}
                  />
                </Grid>
              </Grid>
              <Grid display="grid" gridTemplateColumns={'1fr'}>
                <TextField
                  label="Notas Adicionais"
                  name="notes"
                  value={petData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{ width: '900px' }}
                />
              </Grid>
            </Grid>
            {/**GRID BOTÕES */}
            <Grid
              container
              direction="column"
              sx={{ marginTop: '50px', paddingRight: '100px' }}
              justifyContent="center"
              alignContent="flex-end"
              gap={8}
            >
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
          </form>
        </Grid>

        {!!snackbarOpen.status && <SnackbarComponent />}
      </Grid>
    </BackgroundWrapper>
  );
};
