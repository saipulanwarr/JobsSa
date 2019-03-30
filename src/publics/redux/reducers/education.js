const initialState = {
    data: [],
    isLoading: false
}

export default education = (state = initialState, action) => {
    switch(action.type){
        case 'GET_EDUCATION_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_EDUCATION_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_EDUCATION_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'CREATE_EDUCATION_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'CREATE_EDUCATION_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'CREATE_EDUCATION_FULFILLED':
            state.data.push(action.payload.data);
            return{
                ...state,
                data: state.data,
                isLoading: false
            }
        
        case 'UPDATE_EDUCATION_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'UPDATE_EDUCATION_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'UPDATE_EDUCATION_FULFILLED':
            const newEducationAfterUpdate = state.data.map(edu => {
                if(edu.id == action.payload.data.id){
                    return action.payload.data;
                }

                return edu;
            })
            return{
                ...state,
                data: newEducationAfterUpdate,
                idLoading: false
            }

        case 'DELETE_EDUCATION_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'DELETE_EDUCATION_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_EDUCATION_FULFILLED':
            const newEducationAfterDelete = state.data.filter(edu => edu.id != action.payload.data.id)
            return{
                ...state,
                isLoading: false,
                data: newEducationAfterDelete
            }

        default:
            return state;
    }
}