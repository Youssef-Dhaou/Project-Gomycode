import React from 'react'
import { Navigate } from 'react-router-dom'

const ListUserPrivate = ({children, user}) => {
  return (
    <div>
    {localStorage.getItem("token") && user.role=="admin"? children : <Navigate to="/announcelist"/>}
</div>

  )
}

export default ListUserPrivate