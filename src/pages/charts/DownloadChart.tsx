/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Typography, colors } from '@mui/material';
import { MedicalRecord } from '../../types/MedicalRecord';
import { dateFormatter } from '../../utils/dateFormatter';
import { Pet } from '../../types/Pet';

const DataItem = ({ label, content }: { label: string; content: string }) => {
  return (
    <Grid container>
      <Typography sx={{ fontWeight: 600, color: colors.grey[700] }}>
        {`${label}:`}
      </Typography>
      <div style={{ width: '10px' }}></div>
      <Typography sx={{ fontWeight: 600, color: colors.grey[700] }}>
        {content}
      </Typography>
    </Grid>
  );
};

export const DownloadChart = ({
  chart,
  selectedPet,
}: {
  chart: MedicalRecord;
  selectedPet: Pet;
}) => {
  return (
    <Grid sx={{ padding: '40px 60px' }} id="medicalChart">
      <Grid container justifyContent="center">
        <Typography variant="h4">{`Prontuário de atendimento ${selectedPet.name}`}</Typography>
      </Grid>
      <Grid
        display="grid"
        gridTemplateRows={'repeat(1fr)'}
        gap={0}
        sx={{ padding: '50px 0px' }}
      >
        <Grid sx={{ background: '#48b28170', padding: '5px' }}>
          <DataItem
            label={'Data do atendimento'}
            content={dateFormatter(chart.consultationDate)}
          />
        </Grid>
        <Grid sx={{ padding: '5px' }}>
          <DataItem label={'Diagnóstico'} content={chart.diagnosis} />
        </Grid>
        <Grid sx={{ background: '#48b28170', padding: '5px' }}>
          <DataItem label={'Tratamento'} content={chart.treatment} />
        </Grid>
        <Grid sx={{ padding: '5px' }}>
          <DataItem
            label={'Prescrição'}
            content={chart.prescription ? chart.prescription : '-'}
          />
        </Grid>

        <Grid sx={{ background: '#48b28170', padding: '5px' }}>
          <DataItem
            label={'Notas adicionais'}
            content={chart.notes ? chart.notes : '-'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
