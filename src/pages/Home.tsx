import { Card, Grid, Link, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  position: 'relative',
  width: '220px',
  height: '220px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '25px',
  fontWeight: 'bold',
  borderRadius: '15px',
  cursor: 'pointer',
  border: 'none',
  background: 'rgb(32 169 120 / 95%)',
  color: '#fff',

  '&::after': {
    position: 'absolute',
    content: '""',
    width: '0%',
    height: '0%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    transition: 'all 0.5s',
    bottom: '0',
    left: '0',
    borderRadius: '0 100% 0 15px',
  },

  '&:hover::after': {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    transition: 'all 0.5s',
  },

  '&:hover:after': {
    backgroundImage:
      'url("https://blog.unyleya.edu.br/wp-content/uploads/2019/10/GettyImages-885571364-1.jpg")',
    backgroundSize: 'cover',
  },

  '&.pet:hover:after': {
    backgroundImage:
      'url("https://es360.com.br/wp-content/uploads/2022/06/happy-girl-in-grey-hoodie-plays-with-corgi-on-pink-background-dog-licks-cheeck-of-happy-woman-lady-in-great-mood-holds-domestic-pet-on-isolated-1024x683.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
});

const S_Card = ({
  title,
  redirect,
  cardType,
}: {
  title: string;
  redirect: string;
  cardType: string;
}) => {
  return (
    <Link underline="hover" color="inherit" href={redirect}>
      <StyledCard variant="outlined" className={cardType}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </StyledCard>
    </Link>
  );
};

export const Home = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        width: '100vw',
        padding: '111px 0px',
        backgroundColor: '#f0f0f0',
        backgroundImage: 'url("src/assets/dog-home.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
      }}
    >
      <Typography variant="h3" component="h1" color="#000" marginBottom="4rem">
        Escolha o tipo de usuário
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{}}
        gap={12}
      >
        <S_Card title={'Veterinários'} redirect={'/vet-login'} cardType="vet" />
        <S_Card
          title={'Tutores'}
          redirect={'https://petcare-online.web.app/login'}
          cardType="pet"
        />
        <Typography
          variant="h6"
          component="h6"
          color="#000"
          width="100%"
          textAlign="center"
        >
          Escolha o seu tipo de usuário para ser redirecionado para a página.
        </Typography>
      </Grid>
    </Grid>
  );
};
