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
    GET_COWORKINGS_SUCCESS,
    GET_COWORKINGS_BEGIN
} from './actions';

import { initialState } from './appContext';

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        };
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        };
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User created ! Redirecting...'
        }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login successful ! Redirecting...'
        }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'Update successful !'
        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null
        };
    }

    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value };
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
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
        return { ...state, ...initialState };
    }

    if (action.type === CREATE_COWORKING_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === CREATE_COWORKING_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New coworking Created!',
        };
    }
    if (action.type === CREATE_COWORKING_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        };
    }

    if (action.type === GET_COWORKINGS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
    }
    if (action.type === GET_COWORKINGS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            coworkings: action.payload.coworkings,
            totalCoworkings: action.payload.totalCoworkings,
            numOfPages: action.payload.numOfPages,
        };
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer