import React, { useState } from 'react'
import { Salon } from '../../../interfaces/Salon.interface';
import { User } from '../../../context/Context';
import styles from './ImageAddForm.module.scss'
import SalonService from '../../../services/salon.service';
import { Image } from '../../../interfaces/Image.interface';

interface ImageAddFormProps {
    salon?: Salon;
    user?: User;
    onImageAdd: (salon: Salon) => void;

}
function ImageAddForm({salon,user,onImageAdd}:ImageAddFormProps) {
   
    const [image, setImage] = useState<File | null>(null);
    const [imageNo, setImageNo] = useState<number>(0);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          setImage(files[0]);
        }
      };
    
      const handleImageNoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setImageNo(Number(e.target.value));
      };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const formData = new FormData();
      if (image) {
        formData.append('image', image);
      
  
      try {
        const response = await SalonService.addImageToSalon(salon?.id ?? -1, image);
        onImageAdd(response.data);
    } catch (error) {
      }
    }
    };
  
  
    return (
      <>
  {user?.id === salon?.ownerId && (        
    <form onSubmit={handleSubmit}
    className={styles.imageAddForm}
    encType="multipart/form-data">
          <h2>Додади слика</h2>
          <label htmlFor="image">Слика</label>
          <input type="file" name="image" id="image" onChange={handleImageChange} required />
          
          <label htmlFor="imageNo">Број на слика: </label>
          <select name="imageNo" id="imageNo" value={imageNo} onChange={handleImageNoChange}>
            <option value="1">Слика 1</option>
            <option value="2">Слика 2</option>
            <option value="3">Слика 3</option>
            <option value="4">Слика 4</option>
          </select>
  
          <button type="submit" className="primaryButton">
            Промени
          </button>
        </form>
    )
  }
  </>
  );
}

export default ImageAddForm
