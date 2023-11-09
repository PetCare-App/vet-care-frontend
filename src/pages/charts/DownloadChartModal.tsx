import { Dialog, Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { DownloadChart } from './DownloadChart';
import { useVetCareContext } from '../../context';

export const DownloadChartModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { medicalRecordList } = useVetCareContext();

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'xl'}>
      <Grid
        container
        justifyContent="center"
        sx={{ height: '600px', width: '1000px' }}
      >
        <DownloadChart chart={medicalRecordList[0]} />
      </Grid>
    </Dialog>
  );
};
