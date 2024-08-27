import { Salon } from '../interfaces/Salon.interface';
import axios from './config/axios';

const SalonService = {
    getSalons: () => {
        return axios.get<Salon[]>("/salons");
    }
}

export default SalonService;

