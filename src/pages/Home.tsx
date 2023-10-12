import { Card, Grid, Link, Typography } from '@mui/material';

const S_Card = ({ title, redirect }: { title: string; redirect: string }) => {
  return (
    <Link underline="hover" color="inherit" href={redirect}>
      <Card
        variant="outlined"
        onClick={() => console.log('redirect', redirect)}
        sx={{
          height: '200px',
          width: '200px',
          cursor: 'pointer',
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '200px',
          }}
        >
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Grid>
      </Card>
    </Link>
  );
};

export const Home = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        height: '100vh',
        width: '100vw',
        paddingTop: '150px',
      }}
    >
      <Typography variant="h3" component="h1">
        Qual sistema você deseja acessar?
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingTop: '150px',
          width: '100%',
        }}
        gap={12}
      >
        <S_Card title={'Pacientes'} redirect={'/owners'} />
        <S_Card title={'Agenda'} redirect={'/calendar'} />
      </Grid>
    </Grid>
  );
};
