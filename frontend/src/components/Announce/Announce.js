import React from 'react'
import "./Announce.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLikes, deleteAnnounce, removeLikes } from '../../Redux/actions/AnnouncementActions';
const Announce = ({el}) => {
  const dispatch = useDispatch()
  return (

    <div className="boxProduct">
  <div className="cardprod">
    <div className="card-header">
      <img src={el.image} alt="rover" />
    </div>
    <div className="cards-body">
      <span className={el.object.toUpperCase()==="MISSING ANNOUNCEMENT"? "tag tag-pink" : "tag tag-teal"}>{el.object}</span>
      <h4 className='heading'>
  {el.description}
      </h4>
     
      <p>
      {el.address}
      </p>
      <div className="user">
        <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="user" />
        <div className="user-info">
          <h5>{el.user.fullName}</h5>
          <small>{el.createdOn.slice(0,10)}</small>
        </div>
      </div>
    </div>

<div className='btnIcon'>
  <div className='actions'> 
     <i id="iconB" className="fa-solid fa-trash-can trash" onClick={()=>dispatch(deleteAnnounce(el._id))}></i>
 <Link to={`/editannounce/${el._id}`}><i id="iconB" className="fa-solid fa-pen-to-square"></i></Link>
 <Link to ={`/addannounce`}> <i id="iconB" className="fa-solid fa-circle-plus"></i></Link>
 </div>
 <div className='reaction'>
<Link to={`/details/${el._id}`}> <i  id="iconB" className="fa-solid fa-comment"></i></Link>
<i  id="iconB"  className="fa-solid fa-thumbs-up"  onClick={()=>dispatch(addLikes(el._id))}></i>
<i  id="iconB"  className="fa-solid fa-thumbs-down" onClick={()=>dispatch(removeLikes(el._id))}></i>
<span style={{fontSize:"20px"}}>{el.likes.length > 0 && <span>{el.likes.length}</span>}</span>
</div>
</div> 
</div>   
</div>


)}

export default Announce