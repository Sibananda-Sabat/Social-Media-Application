import React, { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import {getUser} from '../../api/UserRequests'
import { addMessage, getMessages } from '../../api/MessageRequests'
import {format} from 'timeago.js';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({chat, currentUser, setSendMessage, receiveMessage}) => {

  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");

  const scroll = useRef()

  useEffect(()=>{
    if(receiveMessage !==null && receiveMessage.chatId===chat._id){
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage])

  //Fetching data for header
  useEffect(()=>{
    const userId = chat?.members?.find((id)=>id!==currentUser)
    const getUserData = async ()=>{
      try {
        const {data} = await getUser (userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if(chat!==null) getUserData();
  }, [chat,currentUser])


  //Fetching data for messages
  useEffect(()=>{
    const fetchMessages = async ()=>{
      try {
        const {data} = await getMessages(chat._id);
        console.log(data)
        setMessages(data)
      } catch (error) {
        console.log(error) 
      }
    };
    if(chat!==null) fetchMessages();
  },[chat])

  //handle change
  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }
  //handle Send
  const handleSend = async (e)=>{
    e.preventDefault();
    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage      
    }
    //Send message database
    try {
      const {data} = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage("")
    } catch (error) {
      console.log(error)
    }

    //Send message to socket server
    const receiverId = chat.members.find((id)=> id!== currentUser)
    setSendMessage({...message, receiverId})
  }

  //Always scroll to the last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <>
    <div className="ChatBox-container">
      {chat? (
      <>
      <div className="chat-header">
        <div className="follower">
          <div>
              <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'}
                className='followerImage' style={{width: "50px", height: "50px", borderRadius: "50%"}} alt="" />
              <div className="name" style={{fontSize: "0.8rem"}}>
                <span>{userData?.firstname} {userData?.lastname}</span>
              </div>
            </div>
          </div>
          <hr style={{width: "85%", border: "0.1px solid #ececec"}} />
        </div>
        {/* Chatbox messages */}
        <div className="chat-body">
          {messages.map((message)=>(
            <>
            <div ref={scroll} className={message.senderId === currentUser? "message own": "message"}>
              <span>{message.text}</span>
              <span>{format(message.createdAt)}</span>
            </div>
            </>
          ))}
        </div>
        {/* chat-sender */}
        <div className="chat-sender">
          <div>+</div>
          <InputEmoji value={newMessage} onChange={handleChange} />
          <div className="send-button button" onClick={handleSend}>Send</div>
        </div>
      </>
      ) : (
        <span className='chatbox-empty-message'>
          Tap on a Chat to start conversation...
        </span>
      )}
    </div>
    </>
  )
}

export default ChatBox
