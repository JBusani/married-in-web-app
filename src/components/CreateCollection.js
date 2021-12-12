import React from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import formStyles from "./form.module.css";


export default function CreateCollection(optionalInitialData){
    
    return (
        <div className={formStyles.formContainer}>
               <form className={formStyles.form}>
                <input 
                    type="text" 
                    placeholder="Family Name" 
                    name="familyName"
                    aria-label="Family Name"
                />
                <input 
                    type="text" 
                    placeholder="Middle Name" 
                    name="middleName"
                    aria-label="Middle Name"
                />
                <input 
                    type="text" 
                    placeholder="First Name" 
                    name="firstName"
                    aria-label="First Name"
                />
                <button className={formStyles.submitButton}>Save Creation</button>
                </form>  
            </div>
    );
}