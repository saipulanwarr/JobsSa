import axios from 'axios';

export const getEducation = (id) => {
    return{
        type: 'GET_EDUCATION',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/education/${id}`
        })
    }
}

export const createEducation = (body) => {
    return{
        type: 'CREATE_EDUCATION',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3333/api/v1/education/',
            data: body
        })
    }
}

export const updateEducation = (id, body) => {
    return{
        type: 'UPDATE_EDUCATION',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3333/api/v1/education/${id}`,
            data: body
        })
    }
}

export const deleteEducation = (body) => {
    return{
        type: 'DELETE_EDUCATION',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3333/api/v1/education/${body.id}`
        })
    }
}