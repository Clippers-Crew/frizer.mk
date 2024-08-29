import React from 'react'
import styles from './EmployeeItem.module.scss';
import { Employee } from '../../../interfaces/Employee.interface';
import { FaStar } from 'react-icons/fa6';
interface EmployeeItemProps {
    employee?: Employee
}
function EmployeeItem({employee} :EmployeeItemProps) {
    const formattedDate = employee?.employmentDate
    ? new Date(employee.employmentDate).toLocaleDateString()
    : '/';
  return (
    <div className= {`${styles.card}`}>
              <img className= {`${styles.image}`}
                src="/assets/salons/default_barber.jpg" 
                alt="Barber image"
              />
            <div className= {`${styles.title}`}>
              <h2>{employee?.firstName}</h2>
            </div>
            <p className= {`${styles.rating}`}>
            <FaStar />
            <span>
                {employee?.rating.toFixed(2)}
              </span>
              <span>
              ({employee?.numberOfReviews} рецензии)
              </span>
            </p>
            <span>Работи од {formattedDate}</span>
          </div>
  )
}

export default EmployeeItem;
