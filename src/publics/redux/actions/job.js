import axios from 'axios';

export const getJob = (id) => {
    return{
        type: 'GET_JOB',
        payload: axios({
            method: 'get',
            url: 'http://167.99.71.164:3333/api/v1/job'
        })
    }
}

export const searchJob = (search) => {
    return{
        type: 'SEARCH_JOB',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/job?search=${search}`
        })
    }
}