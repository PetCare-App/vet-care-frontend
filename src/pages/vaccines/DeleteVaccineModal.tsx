import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useVetCareContext } from '../../context';

export const DeleteVaccineModal = ({
  open,
  setOpen,
  handleGetList,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleGetList: () => void;
}) => {
  const { deleteVaccine, selectedVaccine } = useVetCareContext();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="alert-dialog-title">
        Você tem certeza que gostaria de deletar esta aplicação de vacina?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta ação não poderá ser revertida!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Voltar</Button>
        <Button
          onClick={() => {
            deleteVaccine(selectedVaccine);
            handleGetList();
            setOpen(false);
          }}
          autoFocus
        >
          Prosseguir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
