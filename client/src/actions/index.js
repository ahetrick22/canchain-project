import { AUTH_USER, AUTH_ERROR, FETCHING_DATA, GET_DELIVERIES } from './types';

//post a user's login information
export const login = (data, callback) => dispatch => {
  fetch('/auth/signin', {
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, 
    mode: "cors", 
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(async (jsonRes) => {
        localStorage.setItem('token', jsonRes.token)
        await dispatch({ type: AUTH_USER, payload: jsonRes });
        await callback();
      })
    .catch(err => {
      dispatch({ type: AUTH_ERROR, payload: 'Error signing in' });
    })
    };

//register a new user
export const signup = (data, callback) => dispatch => {
  fetch('/auth/signup', {
    method: 'POST', 
    headers: {"Content-Type": "application/json"}, 
    mode: "cors", 
    body: JSON.stringify(data)
  })
    .then(res => res.json()
    .then(data => {
      console.log(data);
      dispatch({ type: AUTH_USER, payload: data });
      // dispatch({type: SET_USER, payload: data.user })
      localStorage.setItem('token', data.token)
      callback();
    })
    .catch(err => {
      dispatch({ type: AUTH_ERROR, payload: 'Error signing in' });
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

export const createDelivery = deliveryInfo => dispatch => {
  //the center that is creating the delivery
  //send the delivery to the SQL DB
  fetch('/delivery', {
    method: 'POST',
    mode: 'cors',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-type": "application/json"
  },
  body: JSON.stringify(deliveryInfo)     
  }).then(res => res.json())
    .then(data => {
      dispatch({type: FETCHING_DATA});
      }).catch(error => {
        console.error(error);
  })
}

export const verifyDelivery = deliveryInfo => dispatch => {
  fetch('/verifydelivery', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-type": "application/json"
  },
  body: JSON.stringify(deliveryInfo) 
  }).then(res => res.json())
    .then(async (data) => {
      await getDeliveriesForPlant();
      await dispatch({type: FETCHING_DATA});
  }).catch(error => {
    console.error(error);
  })
}

export const toggleFetch = () => {
  return {
    type: FETCHING_DATA
  }
}

export const getDeliveriesForSingleCenter = (userId, params) => dispatch => {
  fetch(`/deliveries/${userId}?${params}`,
  {
    headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(res => res.json())
    .then(data => {
      console.log('delivery data', data)
      dispatch({type: GET_DELIVERIES, payload: data});
      })
  .catch(error => {
    console.log(error);
  });  
}

export const getDeliveriesForPlant = (params) => dispatch => {
  fetch(`/deliveries?${params}`, 
  {
    headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
    }
  })
  .then(res => res.json())
    .then(data => {
      dispatch({type: GET_DELIVERIES, payload: data});
    })
    .catch(error => {
      console.log(error);
    });  
}