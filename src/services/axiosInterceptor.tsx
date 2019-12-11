import axios, { AxiosResponse, AxiosError } from 'axios';

export default (logout: () => void) =>  {
    axios.interceptors.response.use((response: AxiosResponse) => {
        return response;
    }, (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            logout();
        }
    });
};
