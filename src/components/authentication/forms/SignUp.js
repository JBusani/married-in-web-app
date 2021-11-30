import React from 'react'


const [registerEmail, setRegisterEmail] = useState("");
const [registerPassword, setRegisterPassword] = useState("");
 const [registerConfirmPassword, setConfirmPassword] = useState("");
  


export const SignUp = (props) => {

    return (
        <div>
            <h3> Register User </h3>
            <input
                type="password"
                placeholder="Email..."
                onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Password..."
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
            />
            <input

              placeholder="Confirm Password..."
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <button onClick={register}> Create User</button>
        </div>
    )
}