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

export const DeleteHygieneModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { deleteHygiene, selectedHygiene } = useVetCareContext();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="alert-dialog-title">
        Você tem certeza que gostaria de deletar este registro?
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
            deleteHygiene(selectedHygiene);
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