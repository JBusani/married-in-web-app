import React from 'react';



const Layout = (props) => {
    //context of user id if there is one

    //navigation 
    //login if no user
    //register if no user
    //sign out if user

    return (
        <div>
            <h1>Married In</h1>
            {props.children}
        </div>
    )
}

export default Layout;