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
} from '@mui/material';
import { dateFormatter } from '../../utils/dateFormatter';
import { grey } from '@mui/material/colors';
import { Delete, Edit } from '@mui/icons-material';
import React from 'react';
import { useVetCareContext } from '../../context';
import { Hygiene } from '../../types/Hygiene';

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

export const HygieneTimeline = ({
  list,
  openEdit,
  openDelete,
}: {
  list: Hygiene[];
  openEdit: (data: Hygiene) => void;
  openDelete: (data: Hygiene) => void;
}) => {
  const { setSelectedHygiene } = useVetCareContext();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step, index) => {
          return (
            <Step key={index} expanded sx={{ borderLeftColor: '#48b281' }}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Grid container flexDirection="row" alignItems="center" gap={2}>
                  <Typography variant="h6">
                    {dateFormatter(step.serviceDate)}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      openEdit(step);
                      setSelectedHygiene(step);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      openDelete(step);
                      setSelectedHygiene(step);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </StepLabel>
              <StepContent sx={{ height: '250px', width: '300px' }}>
                <Grid container gap={2}>
                  <InfoItem
                    label={'Notas adicionais'}
                    data={step.notes ? step.notes : '-'}
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
