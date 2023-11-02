import { Dialog } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

export const DownloadChartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return <Dialog open={open} onClose={() => setOpen(false)}></Dialog>;
};
