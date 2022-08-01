import React from 'react'
import { 
  FaTimes, 
  FaHome, 
  FaUserAlt, 
  FaAddressBook,
  FaPlusCircle,
  FaPowerOff,
  FaSlidersH
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

import SidebarItem from '../SidebarItem'
import { Container, Content } from './style'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" />
       <Link to="/profile" style={{textDecoration:"none"}}> <SidebarItem Icon={FaUserAlt} Text="Profile" /></Link>
       <Link to="/announcelist" style={{textDecoration:"none"}}><SidebarItem Icon={FaPlusCircle} Text="Announcements" /></Link> 
        <SidebarItem Icon={FaSlidersH} Text="EditAnnounce" />
        <Link to= "/contact" style={{textDecoration:"none"}}> <SidebarItem Icon={FaAddressBook} Text="Contact" /></Link>
        <SidebarItem Icon={FaPowerOff} Text="Logout" />
      </Content>
    </Container>
  )
}

export default Sidebar