const initialState = {
    data: [],
    isLoading: false
}

export default job = (state = initialState, action) => {
    switch(action.type){
        case 'GET_JOB_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_JOB_REJECTED':
            return{
                ...state,
                isLoading: false,
            }
        
        case 'GET_JOB_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'SEARCH_JOB_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'SEARCH_JOB_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'SEARCH_JOB_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        default:
            return state;
    }
}