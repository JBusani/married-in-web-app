import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "../components/form.module.css";
import img from "../assets/signupbackground.jpg"
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
  
const ProfileSettings = () => {
  let navigate = useNavigate();
  const {
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    currentUser
  } = useAuth();
    const [errors, setErrors] = useState("")
    const [ loading, setLoading ] = useState(false);
    const email = useRef('');
    const password = useRef('');
    const passwordConfirm = useRef('');
    const update = (event) => {
      const e = email.current.value
      const p = password.current.value
      const pc = passwordConfirm.current.value
        event.preventDefault();
        if(p !== pc){
          return setErrors("Passwords do not match");
        }
        const promises = []
        if (e !== currentUser.email){
          promises.push(updateUserEmail(e));
        }
        if(p){
          promises.push(updateUserPassword(p));
        }

        Promise.all(promises).then(()=>{
          setLoading(false);
          navigate("/dashboard", {replace: true})
        }).catch((error)=> {
          setErrors("Failed to update account");
          console.log(error)
        })
      };
    function deleteAccount(){
      
      deleteUser(currentUser);

    }

  
    return (
        <div className={styles.formContainer} >
        <form onSubmit={update} className={styles.form}>
          <h3 className={styles.title}> Update Profile</h3>
          <p className={styles.errors}>{errors}</p>
          <input
            aria-label="email"
            id="email"
            name="email"
            placeholder="Email..."
            defaultValue={currentUser.email}
            ref={email}
          />
            <input
              aria-label="password"
              id="password"
              name="password"
              type="password"
              placeholder="Leave blank to keep the same"
              ref={password}
            />
          <input
            aria-label="passwordConfrim"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            placeholder="Leave blank to keep the same"
            ref={passwordConfirm}
          />
          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
            > Update </button>
          <p><Link to="../dashboard">Cancel</Link></p>
        </form>
        <button type="button" onClick={deleteAccount} style={{
          backgroundColor: "red", 
          color: "white", 
          width: "100px",
          }}>Delete Account</button>
        </div>
    )
  }

  export default ProfileSettings;