import React from 'react';

//take in the unverified deliveries and return them in a dropdown
const UnverifiedDeliveries = (props) => {
  
  if(!props.unverifiedDeliveries) {
    return (<p>Loading...</p>)
  }

  const UnverifiedDelivery = ({ item }) => {
    return (
      <option value={item}>{item}</option>
    )
  }

  const list = props.unverifiedDeliveries.map((delivery,index) => {
    return (<UnverifiedDelivery key={index} item={delivery} />)
  })

  return (
  <select onChange={e => props.handleDropdownChange(e.target.value)}>
    <option>Select a delivery ID to verify</option>
    {list}
  </select>
  )
}



export default UnverifiedDeliveries;