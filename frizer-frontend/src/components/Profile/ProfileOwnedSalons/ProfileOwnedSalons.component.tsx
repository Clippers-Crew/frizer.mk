import React, { useEffect, useState } from "react";
import { Salon } from "../../../interfaces/Salon.interface";
import SalonService from "../../../services/salon.service";
import SalonProfileCard from "../../fragments/SalonProfileCard/SalonProfileCard.component";
import styles from "./ProfileOwnedSalons.module.scss";

function ProfileOwnedSalons() {
  const [salons, setSalons] = useState<Salon[]>([]);

  useEffect(() => {
    const getSalons = async () => {
      try {
        const response = await SalonService.getAllOwnedSalons();
        setSalons(response.data);
      } catch (error) {
        console.error("Failed to fetch salons:", error);
      }
    };

    getSalons();
  }, []);
  return (
    <div className={styles.cardsContainer}>
      {salons.map((salon, i) => (
        <SalonProfileCard key={i} salon={salon} />
      ))}
    </div>
  );
}

export default ProfileOwnedSalons;
