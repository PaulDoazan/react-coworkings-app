import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import reducer from './reducer';

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_COWORKING_BEGIN,
    CREATE_COWORKING_SUCCESS,
    CREATE_COWORKING_ERROR,
} from './actions'

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    showSidebar: false,
    isEditing: false,
    editCoworkingId: '',
    coworkingName: '',
    coworkingSuperficy: '',
    coworkingCapacity: '',
    addressNumber: '',
    addressStreet: '',
    addressPostCode: '',
    priceHour: '',
    priceDay: '',
    priceMonth: ''
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({
            type: DISPLAY_ALERT,
        });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            });
        }, 3000);
    };

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const response = await axios.post('http://localhost:3001/api/users/signup', currentUser);
            const { user, token } = response.data;
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: {
                    user,
                    token
                },
            });

            addUserToLocalStorage({
                user,
                token
            })
        } catch (error) {
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN });
        try {
            const response = await axios.post('http://localhost:3001/api/users/login', currentUser);
            const { user, token } = response.data;
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user,
                    token
                },
            });

            addUserToLocalStorage({
                user,
                token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const updateUser = async (currentUser) => {
        try {
            const { data } = await axios.put(`http://localhost:3001/api/users/${currentUser.id}`, currentUser, {
                headers: {
                    Authorization: `Bearer ${state.token}`,
                },
            });

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: {
                    user: data.user,
                    token: data.token
                },
            });

            removeUserFromLocalStorage();
            addUserToLocalStorage({
                user: data.user,
                token: data.token
            })
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value },
        })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createCoworking = async () => {
        dispatch({ type: CREATE_COWORKING_BEGIN });
        try {
            console.log(state)
            const { coworkingName, coworkingSuperficy, coworkingCapacity, addressStreet, addressNumber, addressPostCode, priceHour, priceDay, priceMonth } = state;

            await axios.post('http://localhost:3001/api/coworkings', {
                name: coworkingName,
                superficy: coworkingSuperficy,
                capacity: coworkingCapacity,
                address: {
                    number: addressNumber,
                    street: addressStreet,
                    postCode: addressPostCode,
                    city: 'Bordeaux'
                },
                price: {
                    hour: priceHour,
                    day: priceDay,
                    month: priceMonth
                },
            });
            dispatch({
                type: CREATE_COWORKING_SUCCESS,
            });
            // call function instead clearValues()
            dispatch({ type: CLEAR_VALUES });
        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: CREATE_COWORKING_ERROR,
                payload: { msg: error.response.data.message },
            });
        }
        clearAlert();
    };

    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createCoworking
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };