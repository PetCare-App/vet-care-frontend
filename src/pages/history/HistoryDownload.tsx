/* eslint-disable no-extra-boolean-cast */
import { Button, Grid, Typography } from '@mui/material';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useVetCareContext } from '../../context';
import { Pet } from '../../types/Pet';
import { HistoryTimeline } from './HistoryTimeline';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Header = ({
  pet,
  downloadPDF,
}: {
  pet: Pet;
  downloadPDF: () => void;
}) => {
  return (
    <Grid container flexDirection="row" alignContent="flex-start">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          paddingRight: '50px',
          paddingLeft: '50px',
          marginTop: '30px',
          width: '100%',
          height: '100px',
        }}
      >
        <Button variant="outlined" onClick={() => downloadPDF()}>
          Download do Histórico
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <Typography variant="h4">{`Registros de ${pet.name}`}</Typography>
      </Grid>
    </Grid>
  );
};

export const HistoryDownload = () => {
  const { historyList } = useVetCareContext();

  const downloadPDF = () => {
    const input: HTMLElement = document.getElementById(
      'pdf-content',
    ) as HTMLElement;

    html2canvas(input).then((canvas) => {
      const imgData = canvas; //.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, 200, pdf.internal.pageSize.height);

      pdf.save('document.pdf');
    });
  };

  return (
    <BackgroundWrapper>
      <>
        <Grid
          container
          alignContent="flex-start"
          sx={{ height: '100vh' }}
          id={'pdf-content'}
        >
          <Header pet={historyList} downloadPDF={downloadPDF} />
          <Grid
            container
            sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
            justifyContent="center"
          >
            <HistoryTimeline list={historyList.history} />
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};
