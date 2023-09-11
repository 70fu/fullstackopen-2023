import axios from 'axios'
const baseUrl = '/api/persons';

const getAll = ()=>{
    const request = axios.get(baseUrl);
    return request
    .then(response=>response.data)
    .catch(error =>{
        console.log(error.response.data.error);
        throw error;
    });
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject);
    return request
        .then(response=>response.data)
        .catch(error =>{
            console.log(error.response.data.error);
            throw error;
        });
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request
        .then(response=>response.data)
        .catch(error =>{
            console.log(error.response.data.error);
            throw error;
        });
}

const deleteRes = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`);
    return request
        .then(response=>response.data)
        .catch(error =>{
            console.log(error.response.data.error);
            throw error;
        });
}

export default {getAll, create, update, deleteRes}