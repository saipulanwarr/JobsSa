const initialState = {
    data: [],
    isLoading: false,
    userCount: []
}

export default applicant = (state = initialState, action) => {
    switch(action.type){
        
        case 'GET_APPLICANT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_APPLICANT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_APPLICANT_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data
            }

        case 'CREATE_APPLICANT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'CREATE_APPLICANT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'CREATE_APPLICANT_FULFILLED':
            state.data.push(action.payload.data);
            return{
                ...state,
                isLoading: false,
                data: state.data
            }

        case 'UPDATE_APPLICANT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'UPDATE_APPLICANT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'UPDATE_APPLICANT_FULFILLED':
           const objIndex = state.data.findIndex(obj => obj.id === action.payload.data.id);
           const updateObj = { ...state.data[objIndex], status: action.payload.data.status };
           const updateData = [
               ...state.data.slice(0, objIndex), updateObj,
               ...state.data.slice(objIndex + 1),
           ];
           
            return{
                ...state,
                isLoading: false,
                data: updateData
            }

        case 'GETCOUNTUSER_APPLICANT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GETCOUNTUSER_APPLICANT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GETCOUNTUSER_APPLICANT_FULFILLED':
            return{
                ...state,
                isLoading: false,
                userCount: action.payload.data
            }

        case 'DELETE_APPLICANT_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'DELETE_APPLICANT_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'DELETE_APPLICANT_FULFILLED':
            const newApplicantAfterDelete = state.data.filter(applicant => applicant.id != action.payload.data.id)
            return{
                ...state,
                isLoading: false,
                data: newApplicantAfterDelete
            }

        default:
            return state;
    }
}