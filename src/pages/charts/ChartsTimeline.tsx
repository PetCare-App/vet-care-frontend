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
} from '@mui/material';
import { MedicalRecord } from '../../types/MedicalRecord';
import { dateFormatter } from '../../utils/dateFormatter';
import { grey } from '@mui/material/colors';
import { Download, Edit, PictureAsPdfOutlined } from '@mui/icons-material';
import React from 'react';
import { useVetCareContext } from '../../context';

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
  openDownload,
}: {
  list: MedicalRecord[];
  openEdit: (data: MedicalRecord) => void;
  openDownload: (data: MedicalRecord) => void;
}) => {
  const { setSelectedMedicalRecord } = useVetCareContext();
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step, index) => (
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
                  onClick={() => {
                    openDownload(step);
                    setSelectedMedicalRecord(step);
                  }}
                >
                  <PictureAsPdfOutlined />
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
        ))}
      </Stepper>
    </Box>
  );
};
