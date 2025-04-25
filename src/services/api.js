import axios from "axios";

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws', //URL DA API QUE DESEJA UTILIZAR
});

export default api;