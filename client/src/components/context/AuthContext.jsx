import {createContext, useEffect, useReducer} from 'react'

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error:null,
    isVerified: false
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN_START':
            return {
                user:null,
                loading: true,
                error:null,
                isVerified: false
            };
        case 'LOGIN_VERIFICATION':
            return {
                user:action.payload,
                loading: true,
                error: null,
                isVerified: false
            };
        case 'LOGIN_SUCCESS':
            return {
                user:action.payload,
                loading: false,
                error:null,
                isVerified: true
            };
        case 'LOGIN_FAIL':
            return {
                user:null,
                loading: true,
                error:action.payload,
                isVerified: false
            };
        case 'LOGOUT':
            return {
                user:null,
                loading: false,
                error:null,
                isVerified: false
            };
        default:
            return state;
    }
};


export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

        return(
            <AuthContext.Provider value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                isVerified: state.isVerified,
                dispatch,
            }}>
                {children}
            </AuthContext.Provider>
        )
};