/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { InfoItem } from '../../components/InfoItem';
import { useVetCareContext } from '../../context';
import { dateFormatter } from '../../utils/dateFormatter';
import { Owner } from '../../types/Owner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SnackbarComponent from '../../components/Snackbar';
import { maritalStatus } from '../../utils/normalizers';

const EditForm = ({
  setCurrentOwner,
  currentOwner,
}: {
  currentOwner: Owner;
  setCurrentOwner: React.Dispatch<any>;
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentOwner({
      ...currentOwner,
      [name]: value,
    });
  };
  return (
    <Grid>
      <Grid display="grid" gridTemplateRows={'repeat(1fr)'} gap={4}>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'} gap={4}>
          <TextField
            label="Nome *"
            name="name"
            value={currentOwner.name}
            onChange={handleChange}
            sx={{ width: '400px' }}
          />
          <TextField
            label="Email *"
            name="email"
            value={currentOwner.email}
            onChange={handleChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'} gap={4}>
          <TextField
            label="Endereço *"
            name="address"
            value={currentOwner.address}
            onChange={handleChange}
            sx={{ width: '400px' }}
          />
          <TextField
            label="Número de Telefone *"
            name="phoneNumber"
            value={currentOwner.phoneNumber}
            onChange={handleChange}
            // InputProps={{
            //   inputComponent: PhoneMask,
            // }}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'} gap={4}>
          <FormControl>
            <InputLabel>Estado Civil *</InputLabel>
            <Select
              name="maritalStatus"
              value={currentOwner.maritalStatus}
              onChange={handleChange}
              sx={{ width: '400px' }}
            >
              <MenuItem value="single">Solteiro(a)</MenuItem>
              <MenuItem value="married">Casado(a)</MenuItem>
              <MenuItem value="divorced">Divorciado(a)</MenuItem>
              <MenuItem value="widowed">Viúvo(a)</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Ocupação *"
            name="occupation"
            value={currentOwner.occupation}
            onChange={handleChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'} gap={4}>
          <Grid item>
            <FormControl>
              <InputLabel>Método de Pagamento Preferido *</InputLabel>
              <Select
                name="preferredPaymentMethod"
                value={currentOwner.preferredPaymentMethod}
                onChange={handleChange}
                sx={{ width: '400px' }}
              >
                <MenuItem value="pix">PIX</MenuItem>
                <MenuItem value="creditCard">Cartão de Crédito</MenuItem>
                <MenuItem value="cash">Dinheiro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <TextField
            label="Detalhes do Seguro de Pet *"
            name="petInsuranceDetails"
            value={currentOwner.petInsuranceDetails}
            onChange={handleChange}
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr'}>
          <TextField
            label="Notas Adicionais *"
            name="additionalNotes"
            value={currentOwner.additionalNotes}
            onChange={handleChange}
            sx={{ width: '870px' }}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

const OwnerData = ({ selectedOwner }: { selectedOwner: Owner }) => {
  return (
    <Grid>
      <Grid display="grid" gridTemplateRows={'repeat(1fr)'} gap={4}>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem variant="h6" label={'Tutor'} data={selectedOwner.name} />
          <InfoItem variant="h6" label={'Email'} data={selectedOwner.email} />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Endereço'}
            data={selectedOwner.address}
          />
          <InfoItem
            variant="h6"
            label={'Telefone'}
            data={selectedOwner.phoneNumber}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Data de Nascimento'}
            data={
              selectedOwner?.dateOfBirth
                ? dateFormatter(selectedOwner?.dateOfBirth)
                : '-'
            }
          />
          <InfoItem
            variant="h6"
            label={'Estado Civil'}
            data={maritalStatus[selectedOwner.maritalStatus]}
          />
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Ocupação'}
            data={selectedOwner.occupation}
          />
          <InfoItem
            variant="h6"
            label={'Método de pagamento'}
            data={
              selectedOwner.preferredPaymentMethod
                ? selectedOwner.preferredPaymentMethod
                : '-'
            }
          />
        </Grid>

        <Grid display="grid" gridTemplateColumns={'1fr 1fr'}>
          <InfoItem
            variant="h6"
            label={'Plano de saúde'}
            data={
              selectedOwner.petInsuranceDetails
                ? selectedOwner.petInsuranceDetails
                : '-'
            }
          />
          <Box></Box>
        </Grid>
        <Grid display="grid" gridTemplateColumns={'1fr'}>
          <InfoItem
            variant="h6"
            label={'Notas'}
            data={
              selectedOwner.additionalNotes
                ? selectedOwner.additionalNotes
                : '-'
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const OwnerDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { selectedOwner, snackbarOpen, updateOwner } = useVetCareContext();

  const [isEdit, setIsEdit] = useState(false);
  const [currentOwner, setCurrentOwner] = useState(selectedOwner);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const { status } = await updateOwner(currentOwner);
    if (status == 200) {
      setIsEdit(false);
      setLoading(false);
    } else setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <Grid
        container
        sx={{
          width: '1000px',
          minHeight: '700px',
          alignContent: 'flex-start',
        }}
      >
        {!isEdit ? (
          <>
            <Grid
              container
              sx={{
                width: '100%',
                height: '150px',
                padding: '40px 20px',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4">Dados Tutor</Typography>
              <IconButton
                sx={{ width: '50px', height: '50px' }}
                onClick={() => setIsEdit(true)}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <DialogContent sx={{ ml: '30px' }}>
              <OwnerData selectedOwner={selectedOwner} />
            </DialogContent>
          </>
        ) : (
          <>
            <Grid
              container
              sx={{
                width: '100%',
                height: '150px',
                padding: '40px 20px',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h4">Edição Tutor</Typography>
              <IconButton
                sx={{ width: '50px', height: '50px' }}
                onClick={() => setIsEdit(false)}
              >
                <ArrowBackIcon />
              </IconButton>
            </Grid>
            <DialogContent sx={{ ml: '30px' }}>
              <EditForm
                setCurrentOwner={setCurrentOwner}
                currentOwner={currentOwner}
              />
              <Grid
                container
                sx={{ mt: '20px', pr: '50px', justifyContent: 'flex-end' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!!loading}
                  onClick={() => {
                    handleSubmit();
                    setLoading(false);
                  }}
                  sx={{
                    color: 'white',
                  }}
                >
                  Enviar
                </Button>
              </Grid>
            </DialogContent>
          </>
        )}
      </Grid>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
      </DialogActions>
      {!!snackbarOpen.status && <SnackbarComponent />}
    </Dialog>
  );
};
