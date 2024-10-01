import React from 'react'
import { useNavigate } from 'react-router-dom'
import HomeNavbar from '../navbar/HomeNavbar'

const Home = () => {
  const navigate = useNavigate()

  const handleClickLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <HomeNavbar></HomeNavbar>
    </div>
  )
}

export default Home