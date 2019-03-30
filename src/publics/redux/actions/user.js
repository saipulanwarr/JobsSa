import axios from 'axios';

export const getUser = (token) => {
    return{
        type: 'GET_USER',
        payload: axios.get('http://167.99.71.164:3333/api/v1/profile', { headers: { "Authorization": `Bearer ${token}` } })
    }
}

export const updateUser = (id, body) => {
    return{
        type: 'UPDATE_USER',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3333/api/v1/user/${id}`,
            data: body
        })
    }
}

export const getPersonUser = (id) => {
    return{
        type: 'GET_PERSON_USER',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/user/${id}`
        })
    }
}