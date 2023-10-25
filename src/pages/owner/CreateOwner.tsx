/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../../components/Snackbar';
import { ownerInit } from '../../types/Owner';
// import { PhoneMask } from '../../components/masks/PhoneMask';

export const CreateOwner = () => {
  const { createOwner, snackbarOpen } = useVetCareContext();
  const navigate = useNavigate();

  const [ownerData, setOwnerData] = useState(ownerInit);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setOwnerData({
      ...ownerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { status } = await createOwner(ownerData);
    if (!!status) navigate('/owners');
    setLoading(false);
  };

  useEffect(() => {
    if (!!Object.entries(ownerData).length)
      setDisableButton(Object.values(ownerData).includes(''));
  }, [ownerData]);

  return (
    <Grid
      sx={{
        pt: '30px',
      }}
    >
      <Header
        breadcrumbs={
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/home">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/owners">
              Tutores
            </Link>
            <Typography color="text.primary">Aqui</Typography>
          </Breadcrumbs>
        }
        title={'Crie um tutor!'}
      />
      <form
        onSubmit={(e) => {
          setLoading(true);
          handleSubmit(e);
        }}
        style={{ width: '1000px' }}
      >
        <Grid
          container
          sx={{ width: '100vw', marginTop: '100px' }}
          justifyContent="center"
          flexWrap={'nowrap'}
          gap={12}
        >
          <Grid
            container
            sx={{ width: '500px' }}
            justifyContent="center"
            direction={'column'}
            gap={4}
          >
            <Grid item>
              <TextField
                label="Nome *"
                name="name"
                value={ownerData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Endereço *"
                name="address"
                value={ownerData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Número de Telefone *"
                name="phoneNumber"
                value={ownerData.phoneNumber}
                onChange={handleChange}
                // InputProps={{
                //   inputComponent: PhoneMask,
                // }}
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email *"
                name="email"
                value={ownerData.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item sx={{ marginTop: '-20px' }}>
              <InputLabel>Data de nascimento *</InputLabel>
              <TextField
                name="dateOfBirth"
                type="date"
                //   value={ownerData?.dateOfBirth.toISOString().split('T')[0]}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: '500px', marginTop: '0px' }}
            justifyContent="center"
            direction={'column'}
            gap={4}
          >
            <Grid item>
              <FormControl>
                <InputLabel>Gênero *</InputLabel>
                <Select
                  name="gender"
                  value={ownerData.gender}
                  onChange={handleChange}
                  sx={{ width: '500px' }}
                >
                  <MenuItem value="female">Feminino</MenuItem>
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="other">Outro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>Estado Civil *</InputLabel>
                <Select
                  name="maritalStatus"
                  value={ownerData.maritalStatus}
                  onChange={handleChange}
                  sx={{ width: '500px' }}
                >
                  <MenuItem value="single">Solteiro(a)</MenuItem>
                  <MenuItem value="married">Casado(a)</MenuItem>
                  <MenuItem value="divorced">Divorciado(a)</MenuItem>
                  <MenuItem value="widowed">Viúvo(a)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Ocupação *"
                name="occupation"
                value={ownerData.occupation}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel>Método de Pagamento Preferido *</InputLabel>
                <Select
                  name="preferredPaymentMethod"
                  value={ownerData.preferredPaymentMethod}
                  onChange={handleChange}
                  sx={{
                    width: '500px',
                  }}
                >
                  <MenuItem value="pix">PIX</MenuItem>
                  <MenuItem value="creditCard">Cartão de Crédito</MenuItem>
                  <MenuItem value="cash">Dinheiro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                label="Detalhes do Seguro de Pet *"
                name="petInsuranceDetails"
                value={ownerData.petInsuranceDetails}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        {/**GRID BOTÕES */}
        <Grid
          container
          direction="column"
          sx={{ width: '100vw', marginTop: '50px' }}
          justifyContent="center"
          alignContent="center"
          gap={8}
        >
          <Grid item>
            <TextField
              label="Notas Adicionais *"
              name="additionalNotes"
              value={ownerData.additionalNotes}
              onChange={handleChange}
              sx={{ width: '1100px' }}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item alignSelf="flex-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={disableButton || !!loading}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
      {!!snackbarOpen.status && <SnackbarComponent />}
    </Grid>
  );
};
