const initialState = {
    data: [],
    isLoading: false,
    personUser: []
}

export default user = (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'GET_USER_REJECTED':
            return{
                ...state,
                isLoading: false
            }
        
        case 'GET_USER_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'UPDATE_USER_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'UPDATE_USER_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        
        case 'UPDATE_USER_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_PERSON_USER_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_PERSON_USER_REJECTED':
            return{
                ...state,
                isLoading: false
            }
        
        case 'GET_PERSON_USER_FULFILLED':
            return{
                ...state,
                isLoading: false,
                personUser: action.payload.data
            }

        default:
            return state;
    }
}