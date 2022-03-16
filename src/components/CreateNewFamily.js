import React, { useRef, useState, useEffect } from 'react'
import { collection, addDoc, setDoc, doc, documentId } from "firebase/firestore"; 
import { db } from './Firebase';
import formStyles from "./form.module.css";
import MemberFieldSet from './form/memberFieldset';
/*
members : [
    id : {
      firstName: Jake
      lastName: Bersani
      image: *.jpg
      }
    ]


*/

export default function CreateNewFamily(props){
    const familyName = useRef();
    const [ memberArray, setMemberArray ] = useState([<MemberFieldSet key={1} memberNumber={1} />]);

    function handleAddMember(event){
      //create a new fieldset array
      setMemberArray([
        ...memberArray,
        <MemberFieldSet key={memberArray.length + 1} memberNumber={memberArray.length + 1} />
      ])
    }


    async function handleSubmit(event){  
      event.preventDefault();
      const formData = event.target;

      const formDataFormated = () => {
        const familyMembers = formData.querySelectorAll("fieldset")
        let familyMembersArray = [];
        const membersCount = memberArray.length;
        
        //fieldset members formatted array. how many members.
        for(let i = 0; i < membersCount; i++){
          const fields = familyMembers[i];
          const inputFields = fields.querySelectorAll("input")
          let familyMember = {
            firstName: "",
            parentRole: false,
            childRole: false
          }
          inputFields.forEach(input => {
            console.log(inputFields.length)
            switch(input.id){
              case "firstName":
                familyMember.firstName = input.value;
                break;
              case "parentRole":
                familyMember.parentRole = input.checked;
                break;
              case "childRole":
                familyMember.childRole = input.checked;
            }
          });
          familyMembersArray.push(familyMember);
          
        }//for loop finished
        console.group(familyMembersArray)
        return familyMembersArray
      }
      formDataFormated();
        /*try{
          //to create or overwrite a single document use set()
          //if not exist, it'll be created
          //if exist it will be overwritten with the newly provided data unless you specify it should be merged.

          
          //in the families collection, add a family with this data object
          const familyRef = await addDoc(collection(db, `users/${props.user}/families`), {
            family: familyName.current.value,
            members: [{

            }]
          })
          console.log(familyRef)

          //in the families collection, add a family with this data object
          const membersRef = await addDoc(collection(db, `users/${props.user}/members`),{
            familyName: familyName.current.value,
            firstName: "",
          })
          console.log(membersRef)
        }catch(error){
          console.group(error)
        }*/

    }
    return (
        <div className={formStyles.formContainer}>
               <form className={formStyles.form} name="FamilyForm" onSubmit={handleSubmit}>
                <h1>Create a New Family</h1>
                <input 
                    type="text" 
                    placeholder="Family Name" 
                    name="familyName"
                    aria-label="Family Name"
                    ref={familyName}
                />
                <p>Members</p>
                <div id='members'>
                  {memberArray.map(member=> {
                    return member;
                  })}
                </div>
                <button
                onClick={handleAddMember} 
                  type='button'
                  className={formStyles.submitButton}
                  >
                    Add Member
                </button>
                <button
                    id="submit"
                    type="submit"
                    className={formStyles.submitButton}>
                  Save Family
                </button>
                </form>  
            </div>
    );
}