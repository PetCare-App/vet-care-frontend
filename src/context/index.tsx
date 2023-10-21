/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import { Owner, ownerInit } from '../types/Owner';
import { ownersService } from '../services/ownersService';
import { AxiosResponse } from 'axios';

export const VetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner>(ownerInit);
  const [snackbarOpen, setSnackbarOpen] = useState<{
    status: boolean;
    type: string;
    message: string;
  }>({
    status: false,
    type: '',
    message: '',
  });
  const [selectedMenuOption, setSelectedMenuOption] = useState(0);

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
      const response: any = await ownersService.getOwnerById(id);
      setSelectedOwner(response.data);
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos buscar este tutor, tente novamente! :(',
      });
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

  const updateOwner = async (data: Owner) => {
    try {
      const response: AxiosResponse = await ownersService.updateOwner(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar o editar o tutor! :)',
        });
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos editar o tutor, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };
  const states = {
    owners,
    snackbarOpen,
    selectedOwner,
    selectedMenuOption,
  };

  const actions = {
    setOwners,
    createOwner,
    setSnackbarOpen,
    getOwnersList,
    getOwnerById,
    setSelectedMenuOption,
    updateOwner,
  };

  return (
    <VetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </VetCareContext.Provider>
  );
}

export const useVetCareContext = () => useContext(VetCareContext);
