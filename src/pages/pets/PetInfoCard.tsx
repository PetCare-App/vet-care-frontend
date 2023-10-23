/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

import Paw from './../../assets/paw.png';
import Dog from './../../assets/dog.png';
import Cat from './../../assets/cat.png';
import { Pet } from '../../types/Pet';
import { dateFormatter } from '../../utils/dateFormatter';

export const PetInfoCard = ({ pet }: { pet: Pet }) => {
  const gender: { [key: string]: string } = {
    male: 'Macho',
    female: 'Fêmea',
  };
  return (
    <Card
      variant="outlined"
      key={pet?.id}
      sx={{
        height: '300px',
        width: '300px',
        marginBottom: '20px',
        padding: '10px',
      }}
    >
      <CardContent sx={{ padding: '10px' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar
            src={
              pet?.species == 'Cat' ? Cat : pet?.species == 'Dog' ? Dog : Paw
            }
            sx={{ height: '130px', width: '130px' }}
          />
          <Grid container alignItems="flex-end" flexDirection="column">
            <Typography
              sx={{ fontSize: 25, fontWeight: 600 }}
              color="text.primary"
              variant="h3"
              gutterBottom
            >
              {pet?.name}
            </Typography>
            <CardActions
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                padding: '0px',
              }}
            >
              <IconButton href={`/pets/${pet.id}`}>
                <ReadMoreIcon sx={{ fontSize: '35px' }} />
              </IconButton>
            </CardActions>
          </Grid>
        </Stack>
        <Grid container justifyContent="center"></Grid>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          sx={{
            height: '150px',
          }}
        >
          <Typography sx={{ fontSize: 20 }} color="text.primary">
            {`Raça: ${pet?.breed}`}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary">
            {`Aniversário:  ${
              pet?.dateOfBirth ? dateFormatter(pet?.dateOfBirth) : '-'
            }`}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary">
            {`Gênero: ${gender[pet?.sex]}`}
          </Typography>
          <Typography sx={{ fontSize: 20 }} color="text.primary">
            {`Peso: ${pet?.weight} Kgs`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
