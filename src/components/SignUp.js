import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
    const [state , setState ] = useState();
    const { signup, currentUser } = useAuth();
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(event){
        alert('A form was submitted : ' + state.value)
        console.log(emailRef);
        console.log(passwordRef);
        
        event.preventDefault();        
        if (passwordRef.current.value !== passwordConfirmRef.current.ref){
            return setError("Passwords do not match");
        }

        try{
            setError('');
            setLoading(true);
           await signup(emailRef.current.value, passwordRef.current.value)
        }catch{
            setError("Failed to create an account");
        }

        setLoading(false);
    }

    return (
        <>
            <div>
                <div>
                    <h2 className="text">Sign Up</h2>
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit} >
                        <label>
                            First and Last Name:
                            <input type="text" name="fullName" required />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" required ref={emailRef} />
                        </label>
                        <label>
                            Password:
                            <input type="text" name="password" required ref={passwordRef}></input>
                        </label>
                        <label>
                            Confirm Password:
                            <input type="text" name="passwordConfirm" required ref={passwordConfirmRef}></input>
                        </label>
                        <input disabled={loading} type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            <div className="">
                Alread have an account? Log In;
            </div>
        </>
    )
}