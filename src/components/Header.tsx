import { Grid, Typography } from '@mui/material';

export const Header = ({
  breadcrumbs,
  title,
}: {
  breadcrumbs: JSX.Element;
  title: string;
}) => {
  return (
    <Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          paddingRight: '50px',
          paddingLeft: '50px',
          width: '100%',
        }}
      >
        {breadcrumbs}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '130px' }}
      >
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
};
