import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";



const Auth = () => {
  
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
/*   const ErrData = useSelector((state)=>state.authReducer.error) */
  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: ""
  })
  const [confirmPass, setConfirmPass] = useState(true)
  const handleChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  } 

  const handleSubmit = (e)=>{
    e.preventDefault();

      if (isSignUp){
        data.password === data.confirmpass 
        ? dispatch(signUp(data)) 
        : setConfirmPass(false);
      }else{
        dispatch(logIn(data));
      }
    }

  const resetForm = ()=>{
    setConfirmPass(true)
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: ""
    })
  }

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div className="Webname">
          <h1>PITS</h1>
          <h6>PRETTY INTEREST TO SHARE</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit} >
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
                required
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass? "none": "block"              
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
                color: "orange"
              }} onClick = {()=>{setIsSignUp((prev)=>!prev); resetForm()}}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

/* function LogIn(){
  return(
    <div className="a-right">
      <form className='infoForm authForm'>
        <h3>Log In</h3>
        <div>
          <input type="text" placeholder='Username' className='infoInput' name='username' />
        </div>
        <div>
          <input type="password" placeholder='Password' className='infoInput' name='password' />
        </div>
        <div>
          <span style={{fontSize: "12px"}}>
            Don't have an account Sign up
          </span>
          <button className='button infoButton'>Login</button>
        </div>
      </form>
    </div>
  );
}


function SignUp(){
    return(
      <div className="a-right">
        <form action="" className='infoForm authForm'>
          <h3>Sign up</h3>
          <div>
            <input type="text" placeholder='First Name' className='infoInput' name='firstname' />
            <input type="text" placeholder='Last Name' className='infoInput' name='lastname' />
          </div>
          <div>
            <input type="text" placeholder='Username' className='infoInput' name='username' />
          </div>
          <div>
            <input type="password" placeholder='Password' className='infoInput' name='password' />
            <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' />
          </div>
          <div>
            <span style={{fontSize: "12px"}}>Already have an account. Login!</span>
          </div>
          <button className="button infoButton" type='submit'>
            Signup
          </button>
        </form>
      </div>
    );
}
 */
//export default Auth
