import { Snackbar, Alert } from '@mui/material';
import { useVetCareContext } from '../context';

const SnackbarComponent = () => {
  const { snackbarOpen, setSnackbarOpen } = useVetCareContext();
  const handleCloseSnackbar = () => {
    setSnackbarOpen({
      status: false,
      type: '',
      message: '',
    });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!snackbarOpen.status}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert severity={snackbarOpen.type}>{snackbarOpen.message}</Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
