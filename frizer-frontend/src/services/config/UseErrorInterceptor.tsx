import { AxiosError, AxiosResponse } from 'axios';
import  instance  from './axios';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const useErrorInterceptor = () => {
  const navigate = useNavigate();
  const handleError = useCallback(
    (error: AxiosError) => {
      if (error.response) {
        console.error('Error Response:', error.response);

        if ([401, 500, 301].includes(error.response.status)) {
          navigate('/error', {
            state: {
              statusCode: error.response.status,
              message: error.response.data || 'An error occurred',
            },
          });
        }
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }

      return Promise.reject(error);
    },
    [navigate]
  );

  useEffect(() => {
    const interceptor = instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => handleError(error)
    );

    return () => {
      instance.interceptors.response.eject(interceptor);
    };
  }, [handleError]);
};

export default useErrorInterceptor;
