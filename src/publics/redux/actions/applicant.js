import axios from 'axios';

export const createApplicant = (body) => {
    return{
        type: 'CREATE_APPLICANT',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3333/api/v1/applicant',
            data: body
        })
    }
}

export const getApplicant = () => {
    return{
        type: 'GET_APPLICANT',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3333/api/v1/applicant/' 
        })
    }
}

export const updateApplicant = (id, body) => {
    return{
        type: 'UPDATE_APPLICANT',
        payload: axios({
            method: 'patch',
            url: `http://167.99.71.164:3333/api/v1/applicant/${id}`,
            data: body
        })
    }
}

export const getUserApplicant = (id) => {
    return{
        type: 'GETCOUNTUSER_APPLICANT',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/countuser/${id}`
        })
    }
}

export const deleteApplicant = (id) => {
    return{
        type: 'DELETE_APPLICANT',
        payload: axios({
            method: 'delete',
            url: `http://167.99.71.164:3333/api/v1/applicant/${id}`
        })
    }
}