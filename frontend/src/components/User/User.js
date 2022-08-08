import React from 'react'
import "./User.css"
import { } from "react-icons/fa";
const User = ({user}) => {
  return (
    
<div className="cnn">
  <div className="row bootstrap snippets bootdeys"> 
  </div>
  <div className="member-entry"> 
    <div className="member-img"> 
      <img src={user.image} className="img-rounded"alt=""/> 
      <i className="fa fa-forward" /> 
    </div> 
    <div className="member-details"> 
      <h4>{user.fullName}</h4> 
      <div className="row info-list"> 
        <div className="col-sm-4"> 
          <i className="fa fa-briefcase" />
          <span> {user.role}</span>
        </div> 
        <div className="col-sm-4"> 
          <i className="fa fa-phone" /> 
          <span> {user.phone} </span> 
        </div> 

        <div className="clear" /> 
        <div className="col-sm-4"> 
          <i className="fa fa-location" /> 
          <span> {user.address}</span>
        </div> 
        <div className="col-sm-4"> 
          <i className="fa fa-envelope" /> 
          <span> {user.email}</span> 
        </div> 
      </div> 
    </div>
<div className="btnAction">
  <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fa fa-trash" /> </button>
  <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fa fa-edit" /> </button>
  <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle ml-2"><i className="fa fa-eye" /> </button> 
</div>

</div> 

</div>



  )
}

export default User