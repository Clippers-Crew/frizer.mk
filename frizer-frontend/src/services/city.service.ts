import axios from "./config/axios";
import { City } from "../interfaces/City.interface";

const CityService = {
    getTopNCitiesBySalonsCount: (count: number) => {
        return axios.get<City[]>(`/cities/top?count=${count}`);
    }
}

export default CityService;