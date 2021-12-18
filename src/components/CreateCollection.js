import React, { useRef } from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from './Firebase';
import formStyles from "./form.module.css";


export default function CreateCollection(optionalInitialData){
    const familyName = useRef();
    async function handleSubmit(event){
      event.preventDefault();
        try{
          await setDoc(doc(db, "families"), {
            familyName: familyName
          })
        }catch(error){
          console.group(error)
        }
    }

    return (
        <div className={formStyles.formContainer}>
               <form className={formStyles.form}>
                <h1>Create a New Family</h1>
                <input 
                    type="text" 
                    placeholder="Family Name" 
                    name="familyName"
                    aria-label="Family Name"
                    ref={familyName}
                />
                <button
                    type="submit"
                    className={formStyles.submitButton}
                    onClick={handleSubmit}>
                  Save Family
                </button>
                </form>  
            </div>
    );
}