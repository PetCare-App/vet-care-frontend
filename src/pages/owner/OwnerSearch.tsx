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

export const OwnerSearch = () => {
  const { owners, getOwnersList, getOwnerById, selectedOwner } =
    useVetCareContext();

  const [ownerName, setOwnerName] = useState('');

  useEffect(() => {
    getOwnersList();
  }, []);

  console.log('selectedOwner', selectedOwner);

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
          value={ownerName}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Selecione"
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
          onClick={() => {
            getOwnerById(ownerName);
          }}
          href={!!selectedOwner ? `/owner/${ownerName}` : '/owners'}
        >
          <SearchIcon sx={{ fontSize: '35px' }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};