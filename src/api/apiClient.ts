import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://test-machine.gintonic.work/api',
    headers: {
        'Content-type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('SERVER ERROR', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;

//test-machine.gintonic.work/api/users/705283995/points