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
import { ArrowBack } from '@mui/icons-material';
import { dateFormatter } from '../../utils/dateFormatter';

export const EditParasiteControlModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { selectedParasiteControl, selectedPet, updateParasiteControl } =
    useVetCareContext();

  const [petData, setPetData] = useState(selectedParasiteControl);

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

    const { status } = await updateParasiteControl(petData);
    if (status == 200) {
      setOpen(false);
    }
    setLoading(false);
  };

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
          <Typography variant="h4">{`Registro de ${selectedPet.name}`}</Typography>
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
            mt={'30px'}
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
                <InputLabel>Data da aplicação *</InputLabel>
                <TextField
                  name="controlDate"
                  disabled
                  value={dateFormatter(petData.controlDate)}
                  onChange={handleChange}
                  sx={{ width: '400px' }}
                />
              </Grid>
            </Grid>
            <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
              <TextField
                label="Nome *"
                name="controlType"
                value={petData.controlType}
                onChange={handleChange}
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
              disabled={!!loading}
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
