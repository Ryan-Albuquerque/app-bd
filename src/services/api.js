import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: config.apiUrl
});

export const getErrorMessage = (error) => {
    try {
        if (error?.response?.data?.message) 
            return error.response.data.message;
        if (error?.response?.status === 404)
            return 'Link para o Servidor não encontrado(404)';
        if (error?.response?.status === 500)
            return 'Tivemos um problema com o servidor, entre em contato!';
    } catch (erro) {
        return 'Erro Desconhecido';
    }
  };
  

export default api;