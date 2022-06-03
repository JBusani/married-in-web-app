import React, { useRef, useState, useEffect } from 'react'
import { collection, getDocs, writeBatch , doc, arrayUnion } from "firebase/firestore"; 
import { db } from './Firebase';
import formStyles from "./form.module.css";
import {MemberFieldSet, ExistingMemberFieldSet} from './form/memberFieldset';
import memberClass from './helperFunctions/member';

export default function CreateNewFamily(props){
    const familyName = useRef();
    //memberCollection is an array of objects
    const [ memberCollection, setMemberCollection ] = useState([]);
    const [ filteredCollection, setFilteredCollection ] = useState([]);
    const [ fieldMemberArray, setFieldMemberArray ] = useState([<MemberFieldSet key={1} memberNumber={1} />]);
    const [ existingMember, setExistingMember ] = useState(null)
    const [ openSearchExisting, setOpenSearchExisting ] = useState(false)
    const [ disableButton, setDisableButton ] = useState(false)

    function handleAddMember(){
      //create a new fieldset array
        setFieldMemberArray(prevState => ([
          ...prevState,
          <MemberFieldSet key={fieldMemberArray.length + 1} memberNumber={fieldMemberArray.length + 1} />
        ]))
    }
    function handleAddExistingMember(){
      setDisableButton(true);
      setOpenSearchExisting(true);
    }

    useEffect(()=>{
      
      //Query for All User's Members once in members collection and push to a local array for reducing database calls
      async function query(){
      const querySnapshot = await getDocs(collection(db, `users/${props.user}/members`));
      const dbMembers = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          dbMembers.push({
            id: doc.id,
            firstName: doc.data().firstName,
            familyName: doc.data().familyName,
            families: doc.data().families
          });
      })
      setMemberCollection(dbMembers);
    };
      query();
    },[])

    async function handleSubmit(event){  
      event.preventDefault();
      const formData = event.target;
      const family = familyName.current.value;
      console.group("running submit function", formData)
      
      try{
        const formDataFormated = () => {
        const familyMembers = formData.querySelectorAll("fieldset")
        console.group("Let's take a look at the fieldsets", familyMembers);
        let familyMembersArray = [];
        const membersCount = fieldMemberArray.length;
        
        //return all fieldsets from form into familyMemberArray
        //each as an family member object
        createFamilyMembers: for(let i = 0; i < membersCount; i++){
          const fields = familyMembers[i];
          const inputFields = fields.querySelectorAll("input")
          let familyMember = {
            firstName: "",
            parentRole: false,
            childRole: false,
            existing: false,
            id: "",
            familyName: family
          }
          inputFields.forEach(input => {
            switch(input.id){
              case "firstName":
                familyMember.firstName = input.value;
                break;
              case "parentRole":
                familyMember.parentRole = input.checked;
                break;
              case "childRole":
                familyMember.childRole = input.checked;
                break;
              case "existsCheckbox":
                familyMember.existing = input.checked;
                familyMember.id = input.value;
                break;
            }
          });
          familyMembersArray.push(familyMember);
          console.group("for loop finished. family members array complete");
        }//for loop finished
        return familyMembersArray
      }
      
      const batch = writeBatch(db);
      console.group("finished running formDataFormated function", formDataFormated(), "Now creating family ref...");
      const formFamilyRef = doc(collection(db, `users/${props.user}/families`))
      batch.set(formFamilyRef, {
        family: family,
        members: []
      })
      

      formDataFormated().forEach(member => {
        if(member.existing){
          const existingMember = doc(db, `users/${props.user}/members/${member.id}`);
          console.group('existing member is:', existingMember)
          //add family id to the member
          batch.update(existingMember,{families: arrayUnion(formFamilyRef.id)});
          //add member id to the family ref
          batch.update(formFamilyRef, {members: arrayUnion(
            {
              id: existingMember.id,
              headOfHousehold: member.parentRole,
            }
            )});
        }else{ 
          const newMemberRef = doc(collection(db, `users/${props.user}/members`));
          console.group("creating new member");
          //set member with member class object
          batch.set(newMemberRef, memberClass(member))
          //add family id to member
          batch.update(newMemberRef, {families: arrayUnion(formFamilyRef.id)})
          //add member id to family
          batch.update(formFamilyRef, {members: arrayUnion(
            {
              id: newMemberRef.id,
              headOfHousehold: member.parentRole,
            }
            )})
        }          
        });
      
      await batch.commit();
      props.handleCloseCollection();
    }catch(error){
      console.group(error);
      
    }
    }
    
    function checkForMember(event){
      const fname = event.target.value.toLowerCase();
      const filterResult = memberCollection.filter(member => member.firstName.toLowerCase() === fname);
      setFilteredCollection(filterResult)
      return filterResult;
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
                  {fieldMemberArray.map(member=> {
                    return member;
                  })}
                </div>
                <button
                id='addNewMember'
                onClick={handleAddMember} 
                  type='button'
                  className={formStyles.submitButton}
                  >
                    Add New Member
                </button>
                {
                  openSearchExisting ? (
                  <div>
                    <input type="text" id="search" onChange={checkForMember}/>
                    <ul style={{listStyle: "none"}}>
                      {filteredCollection.map((m, index) => {
                        function addExistingMember(){
                          setFieldMemberArray(prevState => ([
                            ...prevState,
                            <ExistingMemberFieldSet value={m} key={fieldMemberArray.length + 1} memberNumber={fieldMemberArray.length + 1} />
                          ]))
                          setOpenSearchExisting(false);
                          setDisableButton(false)
                        }
                        return (
                          <li type='button' onClick={addExistingMember} key={m.id} style={{border: "solid black 2px",  padding: "10px", marginBottom: "20px", cursor: "pointer"}}>
                            <p>
                              First Name: {m.firstName} </p>
                            <p>Belonging to: <br/>{m.families}</p>
                            <p>ID: {m.id} </p>
                          </li>
                        )  
                      })}
                    </ul>
                  </div>
                ) : null}
                
                <button
                  id='addExistingMember'
                  onClick={handleAddExistingMember} 
                  disabled={disableButton}
                  type='button'
                  className={formStyles.submitButton}
                  >
                    Add Existing Member
                </button>
                <button
                    disabled={disableButton}
                    id="submit"
                    type="submit"
                    className={formStyles.submitButton}>
                  Save Family
                </button>
                </form>  
                <button onClick={props.handleCloseCollection}>Cancel</button>
            </div>
    );
} 