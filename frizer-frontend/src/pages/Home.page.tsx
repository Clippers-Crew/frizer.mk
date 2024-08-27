import React, { useEffect, useState } from "react";
import SalonCard from "../components/fragments/SalonCard/SalonCard.component";
import SalonService from "../services/salon.service";
import { Salon } from "../interfaces/Salon.interface";

function Home() {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const getSalons = async () => {
      try {
        const response = await SalonService.getSalons();
        setSalons(response.data);
      } catch (error) {
        console.error("Failed to fetch salons:", error);
      }
    };

    getSalons();
  }, []);

  return (
    <div>
      {salons.map((salon, i) => (
        <SalonCard key={i} salon={salon}/>
      ))}
    </div>
  );
}

export default Home;
