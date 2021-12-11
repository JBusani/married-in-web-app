import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./form.module.css";
import img from "../assets/signupbackground.jpg"
import { Link, useNavigate } from "react-router-dom";
  
const SignUp = () => {
  let navigate = useNavigate();
  const { createAccount } = useAuth();
    const [errors, setErrors] = useState("")
    const [ loading, setLoading ] = useState(false);
    const email = useRef('');
    const password = useRef('');
    const passwordConfirm = useRef('');


    const register = async (event) => {
      const e = email.current.value
      const p = password.current.value
      const pc = passwordConfirm.current.value
        event.preventDefault();
        if(p !== pc){
          return setErrors("Passwords do not match");
        }
        try {
          setErrors('');
          setLoading(true);
          await createAccount(e, p).then((value)=>{
            setLoading(false)
            navigate("/dashboard", {replace: true})
          })
        }catch(error){
          const message = error.code;
          switch (message){
            case 'auth/email-already-in-use':
              setErrors("Email address already registered")
              break;
            case 'auth/invalid-email':
              setErrors("Invalid Email Address")
              break;
            case 'auth/email-already-exists':
              setErrors("Email already exists")
              break;
            case 'auth/invalid-password':
              setErrors('Password is invalid. Be sure it is at least 6 characters')
              break;
            default:
              setErrors('Failed to create an account')   
          }
        }
      };

  
    return (
        <div className={styles.formContainer} >
        <form onSubmit={register} className={styles.form}>
          <h3 className={styles.title}> Register User </h3>
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
          <input
            aria-label="passwordConfrim"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Confirm Password..."
            ref={passwordConfirm}
          />
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            > Create User</button>
          <p>Already have an account? <Link to="../signin">Sign In</Link></p>
        </form>
        <img src={img} alt="sign up" />
        </div>
    )
  }

  export default SignUp;