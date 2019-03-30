const initialState = {
    data: [],
    isLoading: false,
    message: '',
    dataLength: 0
}

export default favorite = (state = initialState, action) => {
    switch(action.type){
        case 'CREATE_FAVORITE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'CREATE_FAVORITE_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'CREATE_FAVORITE_FULFILLED':
            let newdata;

            if(action.payload.data.message == "Favorite Has Been Added"){
                newdata = [...state.data, action.payload.data.favorite]
            }
            else{
                newdata = state.data.filter(favorite => favorite.job_id != action.payload.data.id)
            }

            return{
                ...state,
                isLoading: false,
                data: newdata,
                message: action.payload.data.message,
                dataLength: newdata.length
            }

        case 'GET_FAVORITE_PENDING':
            return{
                ...state,
                isLoading: true
            }

        case 'GET_FAVORITE_REJECTED':
            return{
                ...state,
                isLoading: false 
            }

        case 'GET_FAVORITE_FULFILLED':
            return{
                ...state,
                isLoading: false,
                data: action.payload.data,
                dataLength: action.payload.data.length
            }

        default:
            return state;
    }
}