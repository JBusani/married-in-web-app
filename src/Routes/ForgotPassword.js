import React, {useState, useRef} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from '../components/form.module.css';
import img from "../assets/signupbackground.jpg"

const ForgotPassword = () => {

    let location = useLocation();
    let navigate = useNavigate();
  
    const { resetPassword } = useAuth();
      const [errors, setErrors] = useState("")
      const [message, setMessage] = useState("")
      const [ loading, setLoading ] = useState(false);
      const email = useRef('');
  
  
      const sendResetEmail = async (event) => {
        const e = email.current.value
          event.preventDefault();
          try {
            setMessage('')
            setErrors('');
            setLoading(true);
            await resetPassword(e).then(()=>{
              setMessage("Check your inbox for further instructions")
              setLoading(false)
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
              default:
                setErrors("Failed to reset password")   
            }
          }
          
          
        };
  
    
      return (
         <div className={styles.formContainer}>
          <form onSubmit={sendResetEmail} className={styles.form}>
            <h3 className={styles.title}> Password Reset</h3>
            <p className={styles.errors}>{errors}</p>
            <p>{message}</p>
            <input
              aria-label="email"
              id="email"
              name="email"
              placeholder="Email..."
              ref={email}
            />
            <button 
              type="submit" 
              disabled={loading}
              className={styles.submitButton}
              > Reset Password </button>
          </form>
          <p>Return to <Link to="../signin">Sign In</Link></p>
          <img src={img} alt="sign in" />
        </div>
      )
}
export default ForgotPassword;