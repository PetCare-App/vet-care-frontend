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
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { medicalRecordInit } from '../../types/MedicalRecord';

export const CreateChart = () => {
  const { createMedicalRecord, snackbarOpen, selectedOwner, selectedPet } =
    useVetCareContext();
  const navigate = useNavigate();

  const [petData, setPetData] = useState(medicalRecordInit);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { status } = await createMedicalRecord(petData);
    if (!!status)
      navigate(`../../charts/${selectedPet.id}`, { relative: 'path' });
    setLoading(false);
  };

  console.log('petData', petData);
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
                href={`/owners/${selectedOwner.id}/charts`}
              >
                Prontuários
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/charts/${selectedPet.id}`}
              >
                {selectedPet.name}
              </Link>
              <Typography color="text.primary">Aqui</Typography>
            </Breadcrumbs>
          }
          title={'Formulário de atendimento'}
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
                  <InputLabel>Data da consulta *</InputLabel>
                  <TextField
                    name="consultationDate"
                    type="date"
                    onChange={handleChange}
                    sx={{ width: '400px' }}
                  />
                </Grid>
              </Grid>
              <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
                <TextField
                  label="Diagnóstico *"
                  name="diagnosis"
                  value={petData.diagnosis}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                />
                <TextField
                  label="Tratamento *"
                  name="treatment"
                  value={petData.treatment}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                />
              </Grid>
              <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
                <TextField
                  label="Prescrição"
                  name="prescription"
                  value={petData.prescription}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{ width: '400px' }}
                />
                <TextField
                  label="Notas Adicionais"
                  name="notes"
                  value={petData.notes}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{ width: '400px' }}
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
                disabled={disableButton || !!loading}
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
