import React, { useState, useReducer, useContext } from 'react';

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
};
const AppContext = React.createContext();

const registerUser = async (currentUser) => {
    console.log(currentUser)
}

const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    return (
        <AppContext.Provider
            value={{
                ...state, registerUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider };