import { Treatment } from '../interfaces/Treatment.interface';
import axios from './config/axios';

const TreatmentService = {
    getTreatments: () => {
        return axios.get<Treatment[]>("/treatments");
    },
    getTreatment: (id: number) => {
        return axios.get<Treatment>(`/treatments/${id}`);
    },
    getTreatmentsByIds: (salonTreatmentIds: number[]) => {
        const params = salonTreatmentIds.join(',');
        return axios.get(`/treatments/ids?ids=${params}`);
      }
  
};

export default TreatmentService;


