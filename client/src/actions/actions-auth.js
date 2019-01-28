import {
  AUTH_USER,
  AUTH_ERROR
} from './types';


//post a user's login information
export const login = (data, callback) => dispatch => {
  fetch('/auth/signin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(async (jsonRes) => {
      if (jsonRes.error) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Error signing in'
        });
      } else {
        localStorage.setItem('token', jsonRes.token)
        await dispatch({
          type: AUTH_USER,
          payload: jsonRes
        });
        await dispatch({
          type: AUTH_ERROR,
          payload: ''
        })
        await callback();
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
        payload: 'Error signing in'
      });
    })
};

//register a new user
export const signup = data => dispatch => {
  fetch('/auth/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
      body: JSON.stringify(data)
    })
    .then(res => res.json()
      .then(data => {
        dispatch({
          type: AUTH_USER,
          payload: data
        });
        localStorage.setItem('token', data.token)
      })
    )
}

//signout a user and clear their token
export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  }
}