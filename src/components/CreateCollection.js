import React, { useRef } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import formStyles from "./form.module.css";


export default function CreateCollection(optionalInitialData){
    const familyName = useRef();
    async function handleSubmit(event){
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "users"), {
              family: familyName,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
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
                    className={formStyles.submitButton}
                    onSubmit={handleSubmit}>
                  Save Family
                </button>
                </form>  
            </div>
    );
}