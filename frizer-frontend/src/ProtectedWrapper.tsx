import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, ACTION_TYPE, DecodedToken } from './context/Context';
import App from './App';
import Login from './pages/Login.page';
import { jwtDecode } from 'jwt-decode';

function ProtectedWrapper() {
    const { state, dispatch } = useContext(GlobalContext);
    const [isAuth, setIsAuth] = useState<boolean>(!!state?.token);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                if (token.split('.').length !== 3) {
                    throw new Error('Invalid token format');
                }

                const decodedToken = jwtDecode<DecodedToken>(token);
                console.log('Decoded Token:', decodedToken);

                const currentUser = {
                    id: decodedToken.id,
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    email: decodedToken.email,
                    roles: decodedToken.authorities,
                    phoneNumber: decodedToken.phoneNumber
                };

                dispatch({ type: ACTION_TYPE.SET_USER, payload: currentUser });
                dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: token });
                setIsAuth(true);
            } catch (error) {
                console.error('Error decoding token:', error);
                // Clear invalid token and reset authentication state
                localStorage.removeItem('token');
                dispatch({ type: ACTION_TYPE.SET_USER, payload: null });
                dispatch({ type: ACTION_TYPE.SET_TOKEN, payload: null });
                setIsAuth(false);
            }
        } else {
            setIsAuth(false);
        }
    }, [dispatch]);

    useEffect(() => {
        setIsAuth(!!state?.token);
    }, [state?.token]);

    return <App isAuth={isAuth} />;
}

export default ProtectedWrapper;