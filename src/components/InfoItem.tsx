import { Grid, Typography } from '@mui/material';

export const InfoItem = ({
  label,
  data,
  variant,
}: {
  label: string;
  data: string;
  variant: 'h5' | 'h6';
}) => {
  return (
    <Grid container flexDirection="row">
      <Typography variant={variant} color="GrayText">
        {`${label}:`}
      </Typography>
      <span style={{ width: '10px' }}></span>
      <Typography variant={variant}>{` ${data}`}</Typography>
    </Grid>
  );
};
