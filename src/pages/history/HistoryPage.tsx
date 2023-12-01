/* eslint-disable no-extra-boolean-cast */
import {
  Breadcrumbs,
  Button,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { BackgroundWrapper } from '../../components/BackgroundWrapper';
import { useVetCareContext } from '../../context';
import { HistoryTimeline } from './HistoryTimeline';
import { useEffect, useState } from 'react';
import SnackbarComponent from '../../components/Snackbar';
import { ErrorPage } from '../../components/ErrorPage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const HistoryPage = () => {
  const { selectedPet, historyList, snackbarOpen, getHistory } =
    useVetCareContext();
  const handleGetList = async () => {
    await getHistory(selectedPet.id);
    setLoading(false);
  };

  useEffect(() => {
    handleGetList();
  }, []);

  const [loading, setLoading] = useState(true); //TROCAR PARA TRUE

  const downloadPDF = async () => {
    const input: HTMLElement = document.getElementById(
      'pdf-content',
    ) as HTMLElement;

    if (input) {
      const inputHeight = 195;

      const pageHeight = 800;
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');

      while (position < inputHeight) {
        const canvas = await html2canvas(input, {
          windowHeight: 800,
          y: position,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);

        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        position += pageHeight;

        if (position < inputHeight) {
          pdf.addPage();
        }
      }
      pdf.save(`${historyList.name}-historico.pdf`);
    }
  };

  return (
    <BackgroundWrapper>
      <>
        <Grid container alignContent="flex-start" sx={{ height: '100vh' }}>
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
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  href="/veterinary-dashboard"
                >
                  Home
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/owners/${historyList.owner.id}/history`}
                >
                  Histórico
                </Link>

                <Typography color="text.primary">Aqui</Typography>
              </Breadcrumbs>
              <Button variant="outlined" onClick={() => downloadPDF()}>
                Download do Histórico
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              width: '100%',
              paddingLeft: '40px',
              paddingTop: '20px',
            }}
            justifyContent="center"
            id={'pdf-content'}
          >
            <Grid
              container
              justifyContent="center"
              sx={{ paddingBottom: '30px' }}
            >
              <Typography variant="h4">{`Registros de ${historyList.name}`}</Typography>
            </Grid>
            {!!historyList.history.length && !loading ? (
              <HistoryTimeline list={historyList.history} />
            ) : !historyList.history.length && !loading ? (
              <ErrorPage label={'Não existem registros para este paciente'} />
            ) : (
              <Grid
                container
                sx={{ height: '100%', width: '100%' }}
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress size={60} />
              </Grid>
            )}
          </Grid>
        </Grid>
        {!!snackbarOpen && <SnackbarComponent />}
      </>
    </BackgroundWrapper>
  );
};
