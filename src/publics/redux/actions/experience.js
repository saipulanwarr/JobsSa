import axios from 'axios';

export const getExperience = (id) => {
    return{
        type: 'GET_EXPERIENCE',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/experience/${id}`
        })
    }
}

export const createExperience = (body) => {
    return{
        type: 'CREATE_EXPERIENCE',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3333/api/v1/experience/',
            data: body
        })
    }
}

export const updateExperience = (id, body) => {
    return{
        type: 'UPDATE_EXPERIENCE',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3333/api/v1/experience/${id}`,
            data: body
        })
    }
}

export const deleteExperience = (body) => {
    return{
        type: 'DELETE_EXPERIENCE',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3333/api/v1/experience/${body.id}`
        })
    }
}