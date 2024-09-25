import React, { useEffect, useState } from "react";
import styles from "./ProfileEditSalonForm.module.scss";
import { SalonEditRequest } from "../../../interfaces/forms/SalonEditRequest.interface";
import { Salon } from "../../../interfaces/Salon.interface";
import { SALON_MOCK } from "../../../mock/salon.mock";

function ProfileEditSalonForm() {
  const [salon, setSalon] = useState<Salon>();

  const [formData, setFormData] = useState<SalonEditRequest>({
    name: "",
    description: "",
    phoneNumber: "",
    location: "",
  });

  useEffect(() => {
    setSalon(SALON_MOCK);
  }, []);

  useEffect(() => {
    if (salon) {
      setFormData({
        name: salon.name || "",
        description: salon.description || "",
        phoneNumber: salon.phoneNumber || "",
        location: salon.location || "",
      });
    }
  }, [salon]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editSalonForm}>
      <h2>Промени информации</h2>

      <label htmlFor="name">Име</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Опис</label>
      <input
        type="text"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label htmlFor="phoneNumber">Телефонски број</label>
      <input
        type="text"
        name="phoneNumber"
        id="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <label htmlFor="location">Локација</label>
      <input
        type="text"
        name="location"
        id="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <button type="submit" className={`primaryButton ${styles.primaryButton}`}>
        Промени
      </button>
    </form>
  );
}

export default ProfileEditSalonForm;
