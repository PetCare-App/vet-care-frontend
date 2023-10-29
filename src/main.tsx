import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProviderContext } from './context';
import { Home } from './pages/Home';
import { OwnerSearch } from './pages/owner/OwnerSearch';
import { CreateOwner } from './pages/owner/CreateOwner';
import { PetsDashboard } from './pages/pets/PetsDashboard';
import { ChartsDashboard } from './pages/charts/ChartsDashboard';
import { CreatePet } from './pages/pets/CreatePet';
import { PetInfo } from './pages/pets/PetInfo';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/owners',
    element: <OwnerSearch />,
  },
  {
    path: '/owners/create',
    element: <CreateOwner />,
  },
  {
    path: '/owners/:id/pets',
    element: <PetsDashboard />,
  },
  {
    path: '/owners/:id/pets/create',
    element: <CreatePet />,
  },
  {
    path: '/owners/:id/charts',
    element: <ChartsDashboard />,
  },
  {
    path: '/pets/:id',
    element: <PetInfo />,
  },
  {
    path: '/pets/:id/update',
    element: <PetInfo />,
  },
]);
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#48b281',
    },
    secondary: {
      main: '#08869c',
    },
  },
};

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProviderContext>
        <RouterProvider router={router} />
      </ProviderContext>
    </ThemeProvider>
  </React.StrictMode>,
);
