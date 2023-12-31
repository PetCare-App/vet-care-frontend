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
import { ParasiteControl } from '../../types/ParasiteControl';

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

export const ParasiteControlTimeline = ({
  list,
  openEdit,
  openDelete,
}: {
  list: ParasiteControl[];
  openEdit: (data: ParasiteControl) => void;
  openDelete: (data: ParasiteControl) => void;
}) => {
  const { setSelectedParasiteControl } = useVetCareContext();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step, index) => {
          return (
            <Step key={index} expanded sx={{ borderLeftColor: '#48b281' }}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Grid container flexDirection="row" alignItems="center" gap={2}>
                  <Typography variant="h6">{step.controlType}</Typography>
                  <IconButton
                    onClick={() => {
                      openEdit(step);
                      setSelectedParasiteControl(step);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      openDelete(step);
                      setSelectedParasiteControl(step);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </StepLabel>
              <StepContent sx={{ height: '250px', width: '300px' }}>
                <Grid container gap={2}>
                  <InfoItem
                    label={'Data de aplicação'}
                    data={dateFormatter(step.controlDate)}
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
