import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
  
const SignUp = () => {
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
          await createAccount(e, p);
        } catch (error) {
          setErrors("Failed to create an account");
          console.log(errors)
          
        }
        setLoading(false);
      };

  
    return (
        <div>
        {errors}
        <form onSubmit={register} style={{display:"block"}}>
          <h3> Register User </h3>
          <input
            placeholder="Email..."
            ref={email}
          />
          <input
            type="password"
            placeholder="Password..."
            ref={password}
          />
          <input
            type="password"
            placeholder="Confirm Password..."
            ref={passwordConfirm}
          />
          <button type="submit" disabled={loading}> Create User</button>
        </form>
        </div>
    )
  }

  export default SignUp;