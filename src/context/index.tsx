/* eslint-disable no-extra-boolean-cast */
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
import { ParasiteControl, parasiteControlInit } from '../types/ParasiteControl';
import { parasiteControlService } from '../services/parasiteControlService';
import { Hygiene, hygieneInit } from '../types/Hygiene';
import { hygieneService } from '../services/hygieneService';
import { loginService } from '../services/loginService';

export const VetCareContext = createContext({} as any);

export function ProviderContext({ children }: any) {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner>(ownerInit);

  const [selectedPet, setSelectedPet] = useState(petInit);

  const [selectedMedicalRecord, setSelectedMedicalRecord] =
    useState(medicalRecordInit);

  const [medicalRecordList, setMedicalRecordList] = useState<{
    patientMedicalRecord: MedicalRecord[];
  }>({
    ...petInit,
    patientMedicalRecord: [],
  });

  const [selectedVaccine, setSelectedVaccine] = useState(vaccineInit);
  const [vaccineList, setVaccineList] = useState<{ vaccines: Vaccine[] }>({
    ...petInit,
    vaccines: [],
  });

  const [selectedParasiteControl, setSelectedParasiteControl] =
    useState(parasiteControlInit);
  const [parasiteControlList, setParasiteControlList] = useState<{
    parasiteControl: ParasiteControl[];
  }>({
    ...petInit,
    parasiteControl: [],
  });

  const [selectedHygiene, setSelectedHygiene] = useState(hygieneInit);
  const [hygieneList, setHygieneList] = useState<{ hygiene: Hygiene[] }>({
    ...petInit,
    hygiene: [],
  });

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

  const [user, setUser] = useState();

  const [historyList, setHistoryList] = useState<any>({
    ...petInit,
    history: [],
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
      data.password = 'senha123';
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
      delete data.patients;
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
    console.log('data', data);
    try {
      delete data.id;
      delete data.owner;
      delete data.patientMedicalRecord;
      delete data.vaccines;
      delete data.parasiteControl;
      delete data.hygiene;
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
      delete data.owner;
      delete data.patientMedicalRecord;
      delete data.vaccines;
      delete data.parasiteControl;
      delete data.hygiene;
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
      const response: any = await petService.getById(id);
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

  const getVaccineById = async (id: number) => {
    try {
      const response: any = await petService.getById(id);
      delete response.data.hygiene;
      delete response.data.parasiteControl;
      delete response.data.patientMedicalRecord;
      console.log('response.data', response.data);
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

  //PARASITE CONTROL
  const createParasiteControl = async (data: ParasiteControl) => {
    try {
      delete data.id;
      const response: AxiosResponse = await parasiteControlService.create(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message:
            'Sucesso ao cadastrar o registro de controle parasitário! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos cadastrar o registro de controle parasitário, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };

  const getParasiteControlById = async (id: number) => {
    try {
      const response: any = await petService.getById(id);
      setParasiteControlList(response.data);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos buscar este registro de controle parasitário, tente novamente! :(',
      });
      console.log('error', error);
      return error.response;
    }
  };

  const updateParasiteControl = async (data: ParasiteControl) => {
    try {
      const response: AxiosResponse = await parasiteControlService.update(data);

      if (response.status == 200) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao editar o registro de controle parasitário! :)',
        });
        // getVaccineById(data?.patient);
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos editar o registro de controle parasitário, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  const deleteParasiteControl = async (data: ParasiteControl) => {
    try {
      const response: AxiosResponse = await parasiteControlService.delete(data);

      // if (response.status == 200) {
      setSnackbarOpen({
        status: true,
        type: 'success',
        message: 'Sucesso ao deletar o registro de controle parasitário! :)',
      });
      // }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos deletar o registro de controle parasitário, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  // HYGIENE
  const createHygiene = async (data: Hygiene) => {
    try {
      delete data.id;
      const response: AxiosResponse = await hygieneService.create(data);

      if (response.status == 201) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao cadastrar o registro de higiene! :)',
        });
      }
      return response;
    } catch (error) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos cadastrar o registro de higiene, volte mais tarde! :(',
      });
      console.log('error', error);
    }
  };

  const getHygieneById = async (id: number) => {
    try {
      const response: any = await petService.getById(id);
      setHygieneList(response.data);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos buscar este registro de higiene, tente novamente! :(',
      });
      console.log('error', error);
      return error.response;
    }
  };

  const updateHygiene = async (data: Hygiene) => {
    try {
      const response: AxiosResponse = await hygieneService.update(data);

      if (response.status == 200) {
        setSnackbarOpen({
          status: true,
          type: 'success',
          message: 'Sucesso ao editar o registro de higiene! :)',
        });
        // getVaccineById(data?.patient);
      }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos editar o registro de higiene, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  const deleteHygiene = async (data: Hygiene) => {
    try {
      const response: AxiosResponse = await hygieneService.delete(data);

      // if (response.status == 200) {
      setSnackbarOpen({
        status: true,
        type: 'success',
        message: 'Sucesso ao deletar o registro de higiene! :)',
      });
      // }
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message:
          'Nós não conseguimos deletar o registro de higiene, volte mais tarde! :(',
      });
      console.log('error', error);
      return error?.response;
    }
  };

  //LOGIN

  const getUser = async (id: number) => {
    try {
      const response: any = await loginService.getUser(id);
      setUser(response.data);
      return;
    } catch (e) {
      console.log('e', e);
    }
  };

  const vetLogin = async (data: any) => {
    try {
      const response: any = await loginService.vetLogin(data);
      localStorage.setItem('jwtToken', response.data.token);
      return response;
    } catch (error: any) {
      setSnackbarOpen({
        status: true,
        type: 'error',
        message: 'Erro ao realizar o login, tente novamente! :(',
      });
      return error.response;
    }
  };

  // HISTORY

  const normalizeDate = (array: any) =>
    array.map((item: any) => {
      if (item.consultationDate) {
        item.displayDate = item.consultationDate;
      }
      if (item.dateAdministered) {
        item.displayDate = item.dateAdministered;
      }
      if (item.controlDate) {
        item.displayDate = item.controlDate;
      }
      if (item.serviceDate) {
        item.displayDate = item.serviceDate;
      }

      delete item.id;
      delete item.patientId;
      delete item.createdAt;
      return item;
    });

  const getHistory = async (id: number) => {
    try {
      const response = await petService.getById(id);
      const normalizedMedicalRecord = normalizeDate(
        response.data.patientMedicalRecord,
      );
      const normalizedVaccines = normalizeDate(response.data.vaccines);
      const normalizedParasiteControl = normalizeDate(
        response.data.parasiteControl,
      );
      const normalizedHygiene = normalizeDate(response.data.hygiene);

      const history = [
        ...normalizedMedicalRecord,
        ...normalizedVaccines,
        ...normalizedParasiteControl,
        ...normalizedHygiene,
      ];

      response.data.history = history.sort(
        (a, b) => a.displayDate - b.displayDate,
      );

      delete response.data.patientMedicalRecord;
      delete response.data.vaccines;
      delete response.data.parasiteControl;
      delete response.data.hygiene;
      setHistoryList(response.data);
    } catch (e) {
      console.log('e', e);
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
    selectedParasiteControl,
    parasiteControlList,
    selectedHygiene,
    hygieneList,
    user,
    historyList,
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
    createParasiteControl,
    getParasiteControlById,
    updateParasiteControl,
    deleteParasiteControl,
    setSelectedParasiteControl,
    createHygiene,
    getHygieneById,
    updateHygiene,
    deleteHygiene,
    setSelectedHygiene,
    vetLogin,
    getUser,
    getHistory,
  };

  return (
    <VetCareContext.Provider value={{ ...states, ...actions }}>
      {children}
    </VetCareContext.Provider>
  );
}

export const useVetCareContext = () => useContext(VetCareContext);
