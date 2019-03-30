const initialState = {
    data: [],
    isLoading: false
}

export default experience = (state = initialState, action) => {
    switch(action.type){
        case 'GET_EXPERIENCE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_EXPERIENCE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_EXPERIENCE_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'CREATE_EXPERIENCE_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'CREATE_EXPERIENCE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'CREATE_EXPERIENCE_FULFILLED':
            state.data.push(action.payload.data)
            return{
                ...state,
                data: state.data,
                isLoading: false
            }

        case 'UPDATE_EXPERIENCE_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'UPDATE_EXPERIENCE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'UPDATE_EXPERIENCE_FULFILLED':
            const newExperienceAfterUpdate = state.data.map(exp => {
                if(exp.id == action.payload.data.id){
                    return action.payload.data;
                }

                return exp;
            })
            return{
                ...state,
                data: newExperienceAfterUpdate,
                isLoading: false
            }

        case 'DELETE_EXPERIENCE_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'DELETE_EXPERIENCE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_EXPERIENCE_FULFILLED':
            const newExpAfterDelete = state.data.filter(exp => exp.id != action.payload.data.id)

            return{
                ...state,
                isLoading: false,
                data: newExpAfterDelete
            }

        default:
            return state;
    }
}