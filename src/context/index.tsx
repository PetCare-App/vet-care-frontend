/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import { Owner } from '../types/Owner';
import { ownersService } from '../services/ownersService';
import { AxiosResponse } from 'axios';

export const VetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState({} as Owner);
  const [snackbarOpen, setSnackbarOpen] = useState<{
    status: boolean;
    type: string;
    message: string;
  }>({
    status: false,
    type: '',
    message: '',
  });

  //OWNERS

  const getOwnersList = async () => {
    try {
      const response: AxiosResponse = await ownersService.getOwnersList();
      setOwners(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getOwnerById = async (id: number) => {
    try {
      const response: AxiosResponse = await ownersService.getOwnerById(id);
      setSelectedOwner(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const createOwner = async (data: Owner) => {
    try {
      const response: AxiosResponse = await ownersService.createOwner(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar o tutor! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos cadastrar o tutor, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };
  const states = {
    owners,
    snackbarOpen,
    selectedOwner,
  };

  const actions = {
    setOwners,
    createOwner,
    setSnackbarOpen,
    getOwnersList,
    getOwnerById,
  };

  return (
    <VetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </VetCareContext.Provider>
  );
}

export const useVetCareContext = () => useContext(VetCareContext);
