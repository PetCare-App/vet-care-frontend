import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProviderContext } from './context';
import { Home } from './pages/Home';
import { CreateOwner } from './pages/owner/CreateOwner';
import { PetsDashboard } from './pages/pets/PetsDashboard';
import { ChartsDashboard } from './pages/charts/ChartsDashboard';
import { CreatePet } from './pages/pets/CreatePet';
import { PetInfo } from './pages/pets/PetInfo';
import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { ChartPage } from './pages/charts/ChartPage';
import { CreateChart } from './pages/charts/CreateChart';
import { VaccinesDashboard } from './pages/vaccines/VaccinesDashboard';
import { VaccinesPage } from './pages/vaccines/VaccinesPage';
import { CreateVaccine } from './pages/vaccines/CreateVaccine';
import { CreateParasiteControl } from './pages/parasiteControl/CreateParasiteControl';
import { ParasiteControlPage } from './pages/parasiteControl/ParasiteControlPage';
import { ParasiteControlDashboard } from './pages/parasiteControl/ParasiteControlDashboard';
import { HygieneDashboard } from './pages/hygiene/HygieneDashboard';
import { HygienePage } from './pages/hygiene/HygienePage';
import { CreateHygiene } from './pages/hygiene/CreateHygiene';
import { VetLogin } from './pages/login/VetLogin';
import { VeterinaryDashboard } from './pages/VeterinaryDashboard';
import { HistoryDashboard } from './pages/history/HistoryDashboard';
import { HistoryPage } from './pages/history/HistoryPage';

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

const generalUrls = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

const veterinaryUrl = [
  {
    path: '/veterinary-dashboard',
    element: <VeterinaryDashboard />,
  },
  {
    path: '/owners/create',
    element: <CreateOwner />,
  },
];

const petsUrls = [
  {
    path: '/owners/:id/pets',
    element: <PetsDashboard />,
  },
  {
    path: '/owners/:id/pets/create',
    element: <CreatePet />,
  },
  {
    path: '/pets/:id',
    element: <PetInfo />,
  },
  {
    path: '/pets/:id/update',
    element: <PetInfo />,
  },
];

const chartsUrls = [
  {
    path: '/owners/:id/charts',
    element: <ChartsDashboard />,
  },
  {
    path: '/charts/:id',
    element: <ChartPage />,
  },
  {
    path: '/charts/:id/create',
    element: <CreateChart />,
  },
];

const vaccinesUrls = [
  {
    path: '/owners/:id/vaccines',
    element: <VaccinesDashboard />,
  },
  {
    path: '/vaccines/:id',
    element: <VaccinesPage />,
  },
  {
    path: '/vaccines/:id/create',
    element: <CreateVaccine />,
  },
];

const parasiteControlUrls = [
  {
    path: '/owners/:id/parasite-control',
    element: <ParasiteControlDashboard />,
  },
  {
    path: '/parasite-control/:id',
    element: <ParasiteControlPage />,
  },
  {
    path: '/parasite-control/:id/create',
    element: <CreateParasiteControl />,
  },
];

const hygieneUrls = [
  {
    path: '/owners/:id/hygiene',
    element: <HygieneDashboard />,
  },
  {
    path: '/hygiene/:id',
    element: <HygienePage />,
  },
  {
    path: '/hygiene/:id/create',
    element: <CreateHygiene />,
  },
];

const loginUrls = [
  {
    path: '/vet-login',
    element: <VetLogin />,
  },
];

const historyUrls = [
  {
    path: '/owners/:id/history',
    element: <HistoryDashboard />,
  },
  {
    path: '/history/:id',
    element: <HistoryPage />,
  },
];

const router = createBrowserRouter([
  ...generalUrls,
  ...veterinaryUrl,
  ...petsUrls,
  ...chartsUrls,
  ...vaccinesUrls,
  ...parasiteControlUrls,
  ...hygieneUrls,
  ...loginUrls,
  ...historyUrls,
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProviderContext>
        <RouterProvider router={router} />
      </ProviderContext>
    </ThemeProvider>
  </React.StrictMode>,
);
