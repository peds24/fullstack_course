import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const response = axios.post(baseUrl, newObject)
    return response.then((response) => response.data)
}
const deleteEntry = (id) => {
    const response = axios.delete(`${baseUrl}/${id}`)
    return response.then((response) => response.data)
}
const updateEntry = (id, newObject) => {
    const response = axios.put(`${baseUrl}/${id}`, newObject)
    return response.then((response) => response.data)
}

export default {getAll, create, deleteEntry, updateEntry}