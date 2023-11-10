/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react';
import { Owner, ownerInit } from '../types/Owner';
import { ownersService } from '../services/ownersService';
import { AxiosResponse } from 'axios';
import { Pet, petInit } from '../types/Pet';
import { petService } from '../services/petService';
import { MedicalRecord, medicalRecordInit } from '../types/MedicalRecord';
import { medicalRecordService } from '../services/medicalRecordService';
import { Vaccine, vaccineInit } from '../types/Vaccine';
import { vaccineService } from '../services/vaccineService';

export const VetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner>(ownerInit);

  const [selectedPet, setSelectedPet] = useState(petInit);

  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState(medicalRecordInit);

  const [medicalRecordList, setMedicalRecordList] = useState<MedicalRecord[]>([
    // {
    //   id: 1,
    //   consultationDate: '2023-10-31T00:00:00.000Z',
    //   diagnosis: 'Perfeição',
    //   treatment: 'Beijinhos',
    //   prescription: 'Dar muitos beijinhos no Salem todo dia de manhã',
    //   notes: '',
    //   patientId: 1,
    // },
    // {
    //   id: 2,
    //   consultationDate: '2023-10-1T00:00:00.000Z',
    //   diagnosis: 'Perfeição',
    //   treatment: 'Beijinhos',
    //   prescription: 'Dar muitos beijinhos no Salem todo dia de manhã',
    //   notes: '',
    //   patientId: 1,
    // },
    // {
    //   id: 3,
    //   consultationDate: '2023-10-21T00:00:00.000Z',
    //   diagnosis: 'Perfeição',
    //   treatment: 'Beijinhos',
    //   prescription: 'Dar muitos beijinhos no Salem todo dia de manhã',
    //   notes: '',
    //   patientId: 1,
    // },
  ]);

  const [selectedVaccine, setSelectedVaccine] = useState(vaccineInit);
  const [vaccineList, setVaccineList] = useState<Vaccine[]>([
    vaccineInit,
    // {
    //   id: 2,
    //   consultationDate: '2023-10-1T00:00:00.000Z',
    //   diagnosis: 'Perfeição',
    //   treatment: 'Beijinhos',
    //   prescription: 'Dar muitos beijinhos no Salem todo dia de manhã',
    //   notes: '',
    //   patientId: 1,
    // },
    // {
    //   id: 3,
    //   consultationDate: '2023-10-21T00:00:00.000Z',
    //   diagnosis: 'Perfeição',
    //   treatment: 'Beijinhos',
    //   prescription: 'Dar muitos beijinhos no Salem todo dia de manhã',
    //   notes: '',
    //   patientId: 1,
    // },
  ]);

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

  //PETS

  const createPet = async (data: Pet) => {
    try {
      const response: AxiosResponse = await petService.create(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar o pet! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos cadastrar o pet, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };

  const getPetById = async (id: number) => {
    try {
      const response: any = await petService.getById(id);
      setSelectedPet(response.data);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos buscar este pet, tente novamente! :(',
      });
      console.log('error', error);
      return error.response;
    }
  };

  const updatePet = async (data: Pet) => {
    try {
      const response: AxiosResponse = await petService.update(data);

      if (response.status == 200) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao editar o pet! :)',
        });
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos editar o pet, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  //MEDICAL RECORDS

  const createMedicalRecord = async (data: MedicalRecord) => {
    try {
      delete data.id;
      const response: AxiosResponse = await medicalRecordService.create(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar o prontuário! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos cadastrar o prontuário, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };

  const getMedicalRecordById = async (id: number) => {
    try {
      const response: any = await medicalRecordService.getList();
      setMedicalRecordList(response.data);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos buscar este prontuário, tente novamente! :(',
      });
      console.log('error', error);
      return error.response;
    }
  };

  const updateMedicalRecord = async (data: MedicalRecord) => {
    try {
      const response: AxiosResponse = await medicalRecordService.update(data);

      if (response.status == 200) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao editar o prontuário! :)',
        });
        getMedicalRecordById(data.patientId);
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos editar o prontuário, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  const deleteMedicalRecord = async (data: MedicalRecord) => {
    try {
      const response: AxiosResponse = await medicalRecordService.delete(data);

      // if (response.status == 200) {
      setSnackbarOpen({
        status: true,
        type: 'success',
        message: 'Sucesso ao deletar o prontuário! :)',
      });
      // }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos deletar o prontuário, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  //VACCINES
  const createVaccine = async (data: Vaccine) => {
    try {
      delete data.id;
      const response: AxiosResponse = await vaccineService.create(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar a vacina! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos cadastrar a vacina, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };

  const getVaccineById = async (id: string) => {
    try {
      const response: any = await vaccineService.getList();
      setVaccineList(response.data);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos buscar esta vacina, tente novamente! :(',
      });
      console.log('error', error);
      return error.response;
    }
  };

  const updateVaccine = async (data: Vaccine) => {
    try {
      const response: AxiosResponse = await vaccineService.update(data);

      if (response.status == 200) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao editar a vacina! :)',
        });
        // getVaccineById(data?.patient);
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos editar a vacina, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  const deleteVaccine = async (data: Vaccine) => {
    try {
      const response: AxiosResponse = await vaccineService.delete(data);

      // if (response.status == 200) {
      setSnackbarOpen({
        status: true,
        type: 'success',
        message: 'Sucesso ao deletar a vacina! :)',
      });
      // }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Nós não conseguimos deletar a vacina, volte mais tarde! :(',
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
    selectedPet,
    selectedMedicalRecord,
    medicalRecordList,
    selectedVaccine,
    vaccineList,
  };

  const actions = {
    setOwners,
    createOwner,
    setSnackbarOpen,
    getOwnersList,
    getOwnerById,
    setSelectedMenuOption,
    updateOwner,
    createPet,
    setSelectedPet,
    getPetById,
    updatePet,
    setSelectedMedicalRecord,
    createMedicalRecord,
    updateMedicalRecord,
    getMedicalRecordById,
    deleteMedicalRecord,
    setSelectedVaccine,
    createVaccine,
    getVaccineById,
    updateVaccine,
    deleteVaccine,
  };

  return (
    <VetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </VetCareContext.Provider>
  );
}

export const useVetCareContext = () => useContext(VetCareContext);
