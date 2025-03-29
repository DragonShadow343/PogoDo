import React from 'react'
import Sidebar from "./../../components/adminComponents/Sidebar"
import PermissionRightBar from '../../components/adminComponents/PermissionRightBar/PermissionRightBar'

const TeamMember = () => {
  return (
    <section className='flex'>
      <Sidebar />
      <PermissionRightBar />
    </section>
  )
}

export default TeamMember
