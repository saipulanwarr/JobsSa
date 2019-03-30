import { AsyncStorage } from 'react-native';

const initialState = {
    data: [],
    isLoading: false,
    tokenUser: null,
    msgLogin: false
}

export default login = (state = initialState, action) => {
    switch(action.type){
        case 'GET_LOGIN_PENDING':
            return{
                ...state,
                isLoading: true
            }
        
        case 'GET_LOGIN_REJECTED':
            return{
                ...state,
                isLoading: false
            }

        case 'GET_LOGIN_FULFILLED':
            if(action.payload.data.message == "You first need to register"){
                msgLogin = false
                tokenUser = state.tokenUser
            }else{
                msgLogin = true
                if(action.payload.data.token.token){
                    AsyncStorage.setItem('tokenUser', action.payload.data.token.token);
                }

                tokenUser = action.payload.data.token.token
            }
            
            return{
                ...state,
                isLoading: false,
                msgLogin : msgLogin,
                data: action.payload.data,
                tokenUser: tokenUser
            }
        
        default:
            return state;
    }
}