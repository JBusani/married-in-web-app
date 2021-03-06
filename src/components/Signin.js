import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./form.module.css";
import img from "../assets/signupbackground.jpg"
import { Link, useNavigate, useLocation } from "react-router-dom";

  
const SignIn = () => {
  const [cta, setCta] = useState(false)
  let location = useLocation();
  let navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";
  const { signin } = useAuth();
  const [errors, setErrors] = useState("")
  const [ loading, setLoading ] = useState(false);
  const email = useRef('');
  const password = useRef('');

  const signinAccount = async (event) => {
      const e = email.current.value
      const p = password.current.value
        event.preventDefault();
        try {
          setErrors('');
          setLoading(true);
          await signin(e, p).then(()=>{
            setLoading(false)
            navigate(from, {replace: true})
          })
        }catch(error){
          const message = error.code;
          setLoading(false);
          switch (message){
            case 'auth/wrong-password':
              setErrors("Incorrect Password")
              break;
            case 'auth/invalid-email':
              setErrors("Invalid Email Address")
              break;
            case 'auth/user-not-found':
              setCta(true);
              setErrors(`User not found. Please sign up!`)
              break;
            case 'auth/too-many-requests':
              setErrors('Too many requests. Please try again later or reset password')
              break;
            default:
              setErrors("Failed to sign in")   
          }
          
        }
        
        
      };

  
    return (
       <div className={styles.formContainer}>
            
        <form onSubmit={signinAccount} className={styles.form}>
          <h3 className={styles.title}> Log In</h3>
          <p className={styles.errors}>{errors}</p>
          <input
            aria-label="email"
            id="email"
            name="email"
            placeholder="Email..."
            ref={email}
          />
            <input
              aria-label="password"
              id="password"
              name="password"
              type="password"
              placeholder="Password..."
              ref={password}
            />
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            > Log In</button>
        </form>
        <p style={cta ? {backgroundColor: "rgb(74,85,131)", padding:"9px",borderRadius:"50px", color:"white"} : {backgroundColor: "inherit"}}>Need an Account? <Link to="../signup">Sign Up</Link></p>
        <p>Forgot Password? <Link to="../forgot-password">Reset Password</Link></p>
        <img src={img} alt="sign in" />
      </div>
    )
  }

  export default SignIn;