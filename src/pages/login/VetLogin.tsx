import { Avatar, Box, Button, Grid, TextField } from '@mui/material';
import VetCareLogo from './../../assets/vetcare-logo.png';
import { useEffect, useState } from 'react';
import { useVetCareContext } from '../../context';
import SnackbarComponent from '../../components/Snackbar';
import { useNavigate } from 'react-router-dom';

export const VetLogin = () => {
  const navigate = useNavigate();

  const { vetLogin, snackbarOpen } = useVetCareContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const response = await vetLogin({ email, password });
    if (response.status == 201) {
      navigate('/veterinary-dashboard');
      setLoading(false);
    }
  };

  useEffect(() => {
    (!email.length && !password.length) || !!loading
      ? setDisabledButton(true)
      : setDisabledButton(false);
  }, [email, password, loading]);
  return (
    <>
      <Grid
        container
        sx={{ height: '100vh', width: '100vw', flexWrap: 'nowrap' }}
      >
        <Box
          sx={{
            height: '100vh',
            width: '60%',
            backgroundColor: '#48b281',
          }}
        ></Box>
        <Grid
          container
          justifyContent={'center'}
          flexDirection={'column'}
          alignContent={'center'}
          alignItems={'center'}
          sx={{
            height: '100vh',
            width: '40%',
          }}
        >
          <Avatar
            alt="vetcare logo"
            src={VetCareLogo}
            sx={{
              width: '200px',
              height: '200px',
              marginBottom: '100px',
              '> img': { objectFit: 'fill' },
            }}
          />
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                setLoading(true);
                handleLogin();
              }}
              sx={{ color: 'white' }}
              disabled={disabledButton}
            >
              Login
            </Button>
          </form>
        </Grid>
        {!!snackbarOpen && <SnackbarComponent />}
      </Grid>
    </>
  );
};
