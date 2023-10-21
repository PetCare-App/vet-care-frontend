import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ProviderContext } from './context';
import App from './pages/App';
import { Home } from './pages/Home';
import { OwnerSearch } from './pages/owner/OwnerSearch';
import { CreateOwner } from './pages/owner/CreateOwner';
import { PetsDashboard } from './pages/pets/PetsDashboard';
import { ChartsDashboard } from './pages/charts/ChartsDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    path: '/owners/:id/charts',
    element: <ChartsDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProviderContext>
      <RouterProvider router={router} />
    </ProviderContext>
  </React.StrictMode>,
);
