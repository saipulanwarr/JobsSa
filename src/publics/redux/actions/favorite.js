import axios from 'axios';

export const createFavorite = (body) => {
    return{
        type: 'CREATE_FAVORITE',
        payload: axios({
            method: 'post',
            url: 'http://167.99.71.164:3333/api/v1/favorite',
            data: body
        })
    }
}

export const getFavorite = (id) => {
    return{
        type: 'GET_FAVORITE',
        payload: axios({
            method: 'get',
            url: `http://167.99.71.164:3333/api/v1/favorite/${id}`
        })
    }
}