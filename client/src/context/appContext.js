import React, { useReducer, useContext, useEffect } from 'react'
import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  SEARCH_CONTACT_ERROR,
  SEARCH_CONTACT_SUCCESS,
  SEARCH_CONTACT_BEGIN,
  ADD_CONTACT_BEGIN,
  ADD_CONTACT_SUCCESS,
  HANDLE_CHANGE,
  

} from './actions'


const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  userLocation: '',

  users: [],
  projectedMessages: [],
  username: '',
  phoneNo: 2348140785264

}
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }


  const setupUser = async ({currentUser, endPoint, alertText}) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser, config)

      const { user, location } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText },
      })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = async () => {
    await authFetch.get('/auth/logout');
    dispatch({ type: LOGOUT_USER });
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const searchUser = async () => {
    const {phoneNo} = state
    let url = `/users/search?`

    if (phoneNo) {
      url = url + `phoneNo=${phoneNo}`
    }
    dispatch({ type: SEARCH_CONTACT_BEGIN })
    try {
      const {data} = await authFetch(url)
      const {users} = data
      console.log(users)
      dispatch({
        type: SEARCH_CONTACT_SUCCESS,
        payload: {
          users,
        }
      })
      console.log(users)
    } catch (error) {
      if (error.response.status !== 401) return
        dispatch({
          type: SEARCH_CONTACT_ERROR,
          payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const addContact = async (contactId) => {
    dispatch({ type: ADD_CONTACT_BEGIN })
    try {
      const {data} = await authFetch.patch(`/users/add/${contactId}`)
      const { user, location } = data
      
      dispatch({
        type: ADD_CONTACT_SUCCESS,
        payload: {
          user,
          location
        },
      })
    } catch (error) {
      console.log(error)
    }
  }




  
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch('/auth/getCurrentUser');
      const { user, location } = data;

      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();;
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        handleChange,
        searchUser,
        addContact
        
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
