import { Dialog } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { DownloadChart } from './DownloadChart';
import { useVetCareContext } from '../../context';

export const DeleteChartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { medicalRecordList } = useVetCareContext();
  return <Dialog open={open} onClose={() => setOpen(false)}></Dialog>;
};
