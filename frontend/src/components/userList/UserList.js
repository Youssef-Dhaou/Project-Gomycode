import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/actions/userActions';
import Spinner from '../alerts/Spinner';
import User from '../User/User';
import "./UserList.css"



const UserList = () => {

    const dispatch = useDispatch();

    const users = useSelector(state=>state.userReducer.AllUsers)

    useEffect(() => {
    dispatch(getAllUsers())
    }, [])
    const loading = useSelector((state) => state.userReducer.loading);

  return (
    <> 
   {loading? <Spinner/>: <div className="usList">

       <h1 className='headUser'> Members </h1>  
        {users.map(user=> <User key={user._id} user={user}/>)}
    </div>}
    </>
  )
}

export default UserList