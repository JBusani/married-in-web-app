import React, { useRef, useState } from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from './Firebase';
import formStyles from "./form.module.css";

/*
members : [
    id : {
      firstName: Jake
      lastName: Bersani
      image: *.jpg
      }
    ]


*/

export default function CreateCollection(props){
    const familyName = useRef();

    const [ memberArray, setMemberArray ] = useState([]);
    
    function handleMember(event){
      console.log(event.target.value)
      setMemberArray([...memberArray, {
        //can I get the fieldset data as a group? or do i need to track each individual item?
      }])

    }

console.group(memberArray)

    async function handleSubmit(event){  
      event.preventDefault();
      console.group(event.target);
        try{
          const familyRef = await addDoc(collection(db, `users/${props.user}/families`), {
            family: familyName.current.value,
            members: []
          })

          const membersRef = await addDoc(collection(db, `users/${props.user}/members`),{
            familyName: familyName.current.value,
            firstName: "",

          })
          
        }catch(error){
          console.group(error)
        }
    }
console.group(props.user)
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
                <p>Members</p>
                <fieldset onBlur={handleMember}>
                  <legend>Member</legend>
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    name="firstName"
                    aria-label="first Name" 
                    
                  />
                  <label>Parent:
                    <input
                      type="radio"
                      name='role'
                      
                    />
                  </label>
                  <label>Child:
                    <input
                      type="radio"
                      name='role'
                    />
                  </label>
                </fieldset>
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