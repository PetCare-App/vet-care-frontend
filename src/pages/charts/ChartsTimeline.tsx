/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import {
  Box,
  Step,
  StepContent,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  styled,
  Grid,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { MedicalRecord } from '../../types/MedicalRecord';
import { dateFormatter } from '../../utils/dateFormatter';
import { grey } from '@mui/material/colors';
import { Delete, Edit, PictureAsPdfOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useVetCareContext } from '../../context';
import html2canvas from 'html2canvas';
import { DownloadChart } from './DownloadChart';
import { createRoot } from 'react-dom/client';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-circle': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { className } = props;

  return (
    <QontoStepIconRoot className={className}>
      <div className="QontoStepIcon-circle" />
    </QontoStepIconRoot>
  );
}

const InfoItem = ({ label, data }: { label: string; data: string }) => {
  return (
    <Grid container flexDirection="column">
      <Typography
        sx={{ color: grey[700], fontWeight: 600 }}
      >{`${label}: `}</Typography>
      <Typography>{data}</Typography>
    </Grid>
  );
};

export const ChartsTimeline = ({
  list,
  openEdit,
  openDelete,
}: {
  list: MedicalRecord[];
  openEdit: (data: MedicalRecord) => void;
  openDelete: (data: MedicalRecord) => void;
}) => {
  const { setSelectedMedicalRecord, selectedMedicalRecord, selectedPet } =
    useVetCareContext();

  const [downloadChart, setDownloadChart] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const generateAndDownloadImage = async () => {
    const jsxElement = (
      <DownloadChart chart={selectedMedicalRecord} selectedPet={selectedPet} />
    );

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(jsxElement);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(container);

    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${selectedPet?.name}-prontuario.png`;

    link.click();

    document.body.removeChild(container);
    setDownloadChart(false);
  };
  useEffect(() => {
    if (!!downloadChart) generateAndDownloadImage();
  }, [downloadChart]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step, index) => {
          return (
            <Step key={index} expanded sx={{ borderLeftColor: '#48b281' }}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Grid container flexDirection="row" alignItems="center" gap={2}>
                  <Typography variant="h6">
                    {`Data do atendimento: ${dateFormatter(
                      step.consultationDate,
                    )}`}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      openEdit(step);
                      setSelectedMedicalRecord(step);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    disabled={loadingDownload}
                    onClick={() => {
                      setLoadingDownload(true);
                      setSelectedMedicalRecord(step);
                      setDownloadChart(true);
                      setLoadingDownload(false);
                    }}
                  >
                    {!!loadingDownload &&
                    selectedMedicalRecord.id == step.id ? (
                      <CircularProgress size={20} />
                    ) : (
                      <PictureAsPdfOutlined />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      openDelete(step);
                      setSelectedMedicalRecord(step);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </StepLabel>
              <StepContent sx={{ height: '250px', width: '300px' }}>
                <Grid container gap={2}>
                  <InfoItem label={'Diagnóstico'} data={step.diagnosis} />
                  <InfoItem label={'Tratamento'} data={step.treatment} />
                  <InfoItem
                    label={'Prescrição'}
                    data={!!step.prescription ? step.prescription : '-'}
                  />
                  <InfoItem
                    label={'Notas adicionais'}
                    data={!!step.notes ? step.notes : '-'}
                  />
                </Grid>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};
