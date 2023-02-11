import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
    SEARCH_CONTACT_BEGIN,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_ERROR,
    ADD_CONTACT_BEGIN,
    ADD_CONTACT_SUCCESS,
    HANDLE_CHANGE,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    GET_MSGS_BEGIN,
    GET_MSGS_SUCCESS,
    CREATE_MSG_BEGIN,
    CREATE_MSG_SUCCESS,
    CREATE_MSG_ERROR,
    TOGGLE_CONTACT,
    
} from './actions'
import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === TOGGLE_CONTACT) {
    return {
      ...state,
      showContact: !state.showContact,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === HANDLE_CHANGE) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
    }

  if (action.type === SEARCH_CONTACT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false }
  }
  if (action.type === SEARCH_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users
    }
  }

  if (action.type === SEARCH_CONTACT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  
  }

  if (action.type === ADD_CONTACT_BEGIN) {
    return { ...state, isLoading: true}
  }
  if (action.type === ADD_CONTACT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location,
    }
  }

  if (action.type === GET_USERS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users
    };
  }


  if (action.type === GET_MSGS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_MSGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projectedMessages: action.payload.projectedMessages,
    };
  }

  
  if (action.type === CREATE_MSG_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_MSG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Message Created!',

    };
  }
  if (action.type === CREATE_MSG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }


  if (action.type === GET_CURRENT_USER_BEGIN) {
    return { ...state, userLoading: true, showAlert: false };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
      userLocation: action.payload.location
    };
  }


  


  throw new Error(`no such action : ${action.type}`)
}

export default reducer

