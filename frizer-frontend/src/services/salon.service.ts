import { Salon } from '../interfaces/Salon.interface';
import axios from './config/axios';

const SalonService = {
    getSalons: () => {
        return axios.get<Salon[]>("/salons");
    },
    getTopNSalons: (n: number) => {
        return axios.get<Salon[]>(`/salons/top?count=${n}`);
    },
    searchSalons: (queryParams: string) => {
        return axios.get<Salon[]>(`/salons?${queryParams}`);
    }
}

export default SalonService;

