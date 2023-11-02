/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { dateFormatter } from '../../utils/dateFormatter';
import SnackbarComponent from '../../components/Snackbar';

export const EditChartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    selectedMedicalRecord,
    selectedPet,
    updateMedicalRecord,
    snackbarOpen,
  } = useVetCareContext();

  const [petData, setPetData] = useState(selectedMedicalRecord);

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
    const { status } = await updateMedicalRecord(petData);
    if (status == 200) setOpen(false);
    setLoading(false);
  };

  console.log('petData', petData);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'xl'}>
      <Grid
        container
        justifyContent="center"
        sx={{ height: '600px', width: '1000px' }}
      >
        <Grid
          container
          justifyContent="flex-end"
          sx={{ width: '100%', height: '20px', margin: '20px 50px' }}
        >
          <IconButton onClick={() => setOpen(false)}>
            <ArrowBack />
          </IconButton>
        </Grid>
        <Grid container justifyContent="center">
          <Typography variant="h4">{`Prontuário de ${selectedPet.name}`}</Typography>
        </Grid>
        <form
          onSubmit={(e) => {
            setLoading(true);
            handleSubmit(e);
            setLoading(false);
          }}
        >
          <Grid
            display="grid"
            gridTemplateRows={'repeat(1fr)'}
            gap={5}
            width="850px"
          >
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
                  disabled
                  value={dateFormatter(selectedMedicalRecord.consultationDate)}
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
            sx={{ marginTop: '50px' }}
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
    </Dialog>
  );
};
