import React, { useEffect, useState } from "react";
import styles from "./ProfileEditSalonForm.module.scss";
import { SalonEditRequest } from "../../../interfaces/forms/SalonEditRequest.interface";
import { Salon } from "../../../interfaces/Salon.interface";
import SalonService from "../../../services/salon.service";

interface ProfileEditSalonFormProps {
  currentSalonEdit: Salon | null;
  setCurrentSalonEdit: (salon: Salon | null) => void;
  updateSalonAfterEdit: (salon: Salon) => void;
}

function ProfileEditSalonForm({ currentSalonEdit, setCurrentSalonEdit, updateSalonAfterEdit }: ProfileEditSalonFormProps) {
  const [formData, setFormData] = useState<SalonEditRequest>({
    name: "",
    description: "",
    phoneNumber: "",
    location: "",
  });

  useEffect(() => {
    if (currentSalonEdit) {
      setFormData({
        name: currentSalonEdit.name || "",
        description: currentSalonEdit.description || "",
        phoneNumber: currentSalonEdit.phoneNumber || "",
        location: currentSalonEdit.location || "",
      });
    }
  }, [currentSalonEdit]);

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

    if (currentSalonEdit)
      SalonService.editSalon(currentSalonEdit.id, formData)
        .then((response) => {
          alert("Успешно променет салон");
          updateSalonAfterEdit(response.data);
          clearForm();
        })
        .catch((error) => console.error("Грешка во промените на салонот: ", error));
        
  };

  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      phoneNumber: "",
      location: "",
    });
    
    setCurrentSalonEdit(null);
  }

  return (
    <>
      {currentSalonEdit && (
        <form onSubmit={handleSubmit} className={styles.editSalonForm}>
          <h2>Промени информации за салон {currentSalonEdit?.name}</h2>

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

          <button
            type="submit"
            className={`primaryButton ${styles.primaryButton}`}
          >
            Промени
          </button>
        </form>
      )}
    </>
  );
}

export default ProfileEditSalonForm;
