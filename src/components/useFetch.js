import { useNavigate } from 'react-router-dom';

export const useFetch = (url, options) => {
    const navigate = useNavigate();
    const response = fetch(url, options);

    response.then(res => {
        if (res.status === 401) {
            navigate('/register');
        }
    });

    return response;
};