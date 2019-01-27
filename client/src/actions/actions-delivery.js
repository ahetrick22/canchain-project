import {
  FETCHING_DATA,
  GET_DELIVERIES,
  SET_PARAMS
} from './types';

//center creates a delivery (DB action, not chain action)
export const createDelivery = deliveryInfo => dispatch => {
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
      dispatch({
        type: FETCHING_DATA
      });
    }).catch(error => {
      console.error(error);
    })
}

//plant verifies a delivery (DB action, not chain action)
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
      await getDeliveries('');
      await dispatch({
        type: FETCHING_DATA
      });
    }).catch(error => {
      console.error(error);
    })
}

//toggle a loading status for getting or recording new deliveries
export const toggleFetch = () => {
  return {
    type: FETCHING_DATA
  }
}

//get deliveries based on the currently selected parameters - either a center ID, or verified/not verified/discrepancies
export const getDeliveries = params => dispatch => {
  fetch(`/deliveries${params}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_DELIVERIES,
        payload: data
      });
    })
    .catch(error => {
      console.log(error);
    });
}


//set the parameter string to be able to fetch the desired deliveries
export const setDeliveryParams = paramStr => {
  return {
    type: SET_PARAMS,
    payload: paramStr
  }
}