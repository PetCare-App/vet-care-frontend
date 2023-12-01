/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Breadcrumbs,
  Button,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Key, useEffect, useState } from 'react';
import { useVetCareContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import SnackbarComponent from '../../components/Snackbar';

export const OwnerSearch = () => {
  const { owners, getOwnerById, snackbarOpen } = useVetCareContext();
  const navigate = useNavigate();

  const [ownerId, setOwnerId] = useState('');
  const [ownerListLoading, setOwnerListLoading] = useState(true);

  useEffect(() => {
    if (!!owners.length) setOwnerListLoading(false);
  }, [owners]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        paddingTop: '30px',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          paddingRight: '50px',
          paddingLeft: '50px',
          width: '100%',
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            Home
          </Link>
          <Typography color="text.primary">Aqui</Typography>
        </Breadcrumbs>
        <Button variant="outlined" href="/owners/create">
          Novo tutor
        </Button>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: '130px' }}
      >
        <Typography variant="h3" component="h1">
          Pesquise pelo tutor
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          paddingTop: '100px',
        }}
        gap={4}
      >
        <Select
          value={ownerId}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => setOwnerId(e.target.value)}
          placeholder="Selecione"
          disabled={ownerListLoading}
          sx={{
            width: '500px',
          }}
        >
          <MenuItem value={''} key={0}>
            Selecione alguma opção
          </MenuItem>
          {owners.map(({ name, id }: any, index: Key | null | undefined) => (
            <MenuItem value={id} key={index}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Link></Link>
        <IconButton
          disabled={ownerListLoading}
          onClick={async () => {
            const response = await getOwnerById(ownerId);
            if (response.status == 200) {
              navigate(`/owners/${ownerId}/pets`);
            }
          }}
        >
          <SearchIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </Grid>
      {!!snackbarOpen.status && <SnackbarComponent />}
    </Grid>
  );
};
