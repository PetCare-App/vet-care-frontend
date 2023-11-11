import { Avatar, Box, Grid, Link } from '@mui/material';
import { useVetCareContext } from '../context';
import VetCareLogo from './../assets/vetcare-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MenuItem = ({
  selectedMenuOption,
  setSelectedMenuOption,
  index,
  item,
}: {
  selectedMenuOption: number;
  setSelectedMenuOption: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  item: { url: string; label: string };
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { selectedOwner } = useVetCareContext();

  const handleUrlChange = () => {
    if (
      location.pathname.includes('owners') &&
      !location.pathname.includes('create')
    )
      navigate(`..${item.url}`, { relative: 'path' });
    else navigate(`/owners/${selectedOwner.id}${item.url}`);
  };
  return (
    <Box
      key={`box-${index}`}
      sx={{
        width: '100%',
        backgroundColor: `${
          selectedMenuOption == index ? '#48b281' : '#EAEAEA'
        }`,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#48b281',
        },
      }}
      onClick={() => {
        setSelectedMenuOption(index);
        handleUrlChange();
      }}
    >
      <Link
        key={`link-${index}`}
        component="button"
        variant="h6"
        sx={{
          height: '50px',
          color: '#000',
          ml: '30px',
        }}
        underline="none"
        onClick={() => {
          setSelectedMenuOption(index);
          handleUrlChange();
        }}
      >
        {item.label}
      </Link>
    </Box>
  );
};

export const Menu = () => {
  const location = useLocation();

  const { selectedMenuOption, setSelectedMenuOption } = useVetCareContext();
  const menuList: { url: string; label: string }[] = [
    {
      url: `/pets`,
      label: 'Pets',
    },
    {
      url: `/charts`,
      label: 'Prontuários',
    },
    {
      url: '/vaccines',
      label: 'Vacinas',
    },
    {
      url: '/parasite-control',
      label: 'Controle Parasitário',
    },
    {
      url: '/hygiene',
      label: 'Higiene',
    },
    {
      url: '/history',
      label: 'Histórico',
    },
  ];

  useEffect(() => {
    setSelectedMenuOption(
      menuList.findIndex((item) => location.pathname.includes(item.url)),
    );
  }, []);

  return (
    <Grid
      container
      sx={{
        background: '#EAEAEA',
        width: '300px',
        padding: '0px',
        justifyContent: 'center',
        alignContent: 'flex-start',
        height: '100vh',
      }}
    >
      <Avatar
        alt="vetcare logo"
        src={VetCareLogo}
        sx={{
          width: 200,
          height: 200,
          marginTop: '50px',
          '> img': { objectFit: 'fill' },
        }}
      />
      <Grid sx={{ height: 'calc(100% + 100px)', background: '#EAEAEA' }}>
        <Grid
          container
          sx={{
            width: '100%',
            marginTop: '50px',
          }}
        >
          {menuList.map((item, index) => (
            <MenuItem
              key={Math.random()}
              selectedMenuOption={selectedMenuOption}
              setSelectedMenuOption={setSelectedMenuOption}
              index={index}
              item={item}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
