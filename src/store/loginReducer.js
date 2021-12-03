const defaultValueState = {
    authorizedUser: null
}

const LOGIN = "LOGIN";


export const authReducer = (state=defaultValueState, action)=>{
    switch(action.type){
        case LOGIN:
            return {...state, authorizedUser: action.payload};
        default:
            return state;
    }
}

export const loginAction = (payload)=>({type: LOGIN, payload});


