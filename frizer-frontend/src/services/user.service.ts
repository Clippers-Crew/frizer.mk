import { jwtDecode } from "jwt-decode";
import { DecodedToken, User } from "../context/Context";

const UserService = {
    getCurrentUser:() => {
      const token = localStorage.getItem('token');
      if(token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const currentUser : User = {
          id: decodedToken.id ?? -1,
          firstName: decodedToken.firstName ?? '',
          lastName: decodedToken.lastName ?? '',
          email: decodedToken.email ?? '',
          phoneNumber: decodedToken.phoneNumber ?? '',
          authorities: decodedToken.authorities ?? '',
          roles: decodedToken.roles ?? []
        };
        return currentUser;
      }
      return undefined;
    }
};
export default UserService;