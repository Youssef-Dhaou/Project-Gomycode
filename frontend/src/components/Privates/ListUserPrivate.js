import React from 'react'
import { Navigate } from 'react-router-dom'

const ListUserPrivate = ({children, user}) => {
  return (
    <div>
    {localStorage.getItem("token")? children : <Navigate to="/announcelist"/>}
</div>

  )
}

export default ListUserPrivate