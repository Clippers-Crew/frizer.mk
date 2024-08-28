import React, { useEffect, useState } from 'react'
import { CYRILLIC_CITIES } from '../../../data/cyrilic-cities';
import { City } from '../../../interfaces/City.interface';
import styles from './Search.module.scss';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function Search() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [formValues, setFormValues] = useState({
    name: '',
    city: '',
    distance: '',
    rating: 0,
  });

  const handleChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSubmit = (e: any) => {
      e.preventDefault();
  }

  const requestUserLocation = () => {
    // Logic to request user location
  };

  useEffect(() => {
    setCities(CYRILLIC_CITIES);
  }, [])


  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`${styles.searchByNameInput}`}
        name="name"
        type="text"
        placeholder="Име на фитнес центарот..."
        value={formValues.name}
        onChange={handleChange}
      />
      <button type="submit" className="primaryButton">
        Пребарај
      </button>
      <a className={`${styles.advancedToggle}`} onClick={toggleMenu}>
        Напредно {menuOpen ? <FaArrowUp/>: <FaArrowDown/>}
      </a>
      {menuOpen && (
        <div className={`${styles.advancedMenu}`}>
          <label htmlFor="city">Град</label>
          <select id="city" name="city" value={formValues.city} onChange={handleChange}>
            {cities.map((city, index) => (
              <option key={index} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
          <label htmlFor="distance">Далечина</label>
          <div className={`${styles.distanceInputContainer}`}>
            <input
              type="text"
              name="distance"
              id="distance"
              value={formValues.distance}
              onClick={requestUserLocation}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="rating">Рејтинг</label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="0"
            max="5"
            value={formValues.rating}
            onChange={handleChange}
          />
        </div>
      )}
    </form>
  )
}

export default Search;