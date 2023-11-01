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
} from '@mui/material';
import { MedicalRecord } from '../../types/MedicalRecord';
import { dateFormatter } from '../../utils/dateFormatter';
import { grey } from '@mui/material/colors';

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

export const ChartsTimeline = ({ list }: { list: MedicalRecord[] }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step, index) => (
          <Step key={index} expanded sx={{ borderLeftColor: '#48b281' }}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <Typography variant="h6">
                {`Data do atendimento: ${dateFormatter(step.consultationDate)}`}
              </Typography>
            </StepLabel>
            <StepContent sx={{ height: '250px', width: '300px' }}>
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
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
