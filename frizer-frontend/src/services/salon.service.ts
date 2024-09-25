import { Salon } from '../interfaces/Salon.interface';
import axios from './config/axios';

const SalonService = {
    getSalons: () => {
        return axios.get<Salon[]>("/salons");
    },
    getSalon: (id: number) => {
        return axios.get<Salon>(`/salons/${id}`);
    },
    getSalonsByIds: (ids: number[]) => {
        const params = new URLSearchParams();
        ids.forEach(id => params.append('ids', id.toString()));
        
        return axios.get<Salon[]>('/salons/ids', { params });
      },
    getTopNSalons: (n: number) => {
        return axios.get<Salon[]>(`/salons/top?count=${n}`);
    },
    searchSalons: (queryParams: string) => {
        return axios.get<Salon[]>(`/salons?${queryParams}`);
    },
    getImage: async (salonId: number, imageId: number): Promise<Blob> => {
        const response = await axios.get(`/salons/${salonId}/image/${imageId}`, {
            responseType: 'blob', 
        });
        return response.data;
    },

    getSalonImageUrl(salonId: number, imageId: number): string {
        const baseUrl = 'http://localhost:8080/api/salons';
        return `${baseUrl}/${salonId}/image/${imageId}`;
    },

    addImageToSalon: async (salonId: number, image: File) => {
        const formData = new FormData();
        formData.append('image', image);
       
        return await axios.post<Salon>(`/salons/${salonId}/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }


};
    
export default SalonService;

