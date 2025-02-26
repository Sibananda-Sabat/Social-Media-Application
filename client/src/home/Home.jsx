import React from 'react'
import './Home.css'
import ProfileSide from '../components/profileSide/ProfileSide'
import PostSide from '../components/PostSide/PostSide'
import RightSide from '../components/RightSide/RightSide'

const Home = () => {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
      <div className="RightSide">Rightside</div>
    </div>
  )
}

export default Home
