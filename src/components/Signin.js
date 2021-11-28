import React, { useState } from 'react'

export default function Signin() {
    const [state , setState ] = useState();

    function handleSubmit(event){
        alert('A form was submitted : ' + state.value)
        event.preventDefault();
    }
    return (
        <>
            <div className="card">
                <div className="cardBody">
                    <h2 className="text">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input type="email" name="email" />
                        </label>
                        <label>
                            Password:
                            <input type="text" name="password"></input>
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
            <div className="">
                Forgot Password? Reset Password
            </div>
        </>
    )
}