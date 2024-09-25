import { Coordinate } from "../interfaces/Coordinate.interface";

const ValidatorService = {
  isPhoneValid: (phoneNumber: string): boolean => {
    if (!phoneNumber) return false;

    return (
      (phoneNumber.length === 9 && phoneNumber.startsWith("07")) ||
      (phoneNumber.length === 12 && phoneNumber.startsWith("+3897"))
    );
  },
  isNameOrSurnameValid: (name: string) => {
    const hasOnlyLettersAndSpaces =
      /^[A-Za-zА-Яа-яЁё\u0400-\u04FF\u0500-\u052F\s]+$/.test(name);
    return name !== null && name.length > 3 && hasOnlyLettersAndSpaces;
  },
  isPasswordValid: (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  },
  isCorrdinateInValid: (coordinate: Coordinate) => {
    return (
      coordinate.latitude < 40.873926 ||
      coordinate.latitude > 42.376477 ||
      coordinate.longitude < 20.453475 ||
      coordinate.longitude > 23.040348
    );
  },
};

export default ValidatorService;