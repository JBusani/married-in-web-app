import React, {useState} from 'react';

const MemberFieldSet = ({memberNumber}) => {
//may need state to replace values if includes in membercollection on change.
//then need to update that members families field with the family name
//need to update family with member name
    return (
        <>
        <fieldset id={`member${memberNumber}`} name={`member${memberNumber}`}>
            <legend>Member{memberNumber}</legend>
                  <input 
                    type="text" 
                    id='firstName'
                    placeholder="First Name" 
                    name={`firstNameMember${memberNumber}`}
                    aria-label="first Name"
                    required={true}
                  />
                  <div>
                    <label>Parent:
                      <input
                        type="radio"
                        id='parentRole'
                        name={`memberRole${memberNumber}`}
                        required={true}
                      />
                    </label>
                    <label>Child:
                      <input
                        type="radio"
                        id='childRole'
                        name={`memberRole${memberNumber}`}
                        required={true}
                      />
                    </label>
                  </div>
                </fieldset>
        </>
    )
}

const ExistingMemberFieldSet = ({memberNumber, value}) => {
  //may need state to replace values if includes in membercollection on change.
  //then need to update that members families field with the family name
  //need to update family with member name
      return (
          <>
          <fieldset id={value.id} name={`member${memberNumber}`}>
              <legend>Member{memberNumber}</legend>
                    <input 
                      type="text" 
                      id='firstName'
                      placeholder="First Name" 
                      name={`firstNameMember${memberNumber}`}
                      aria-label="first Name"
                      required={true}
                      disabled={true}
                      value={value.firstName}
                    />
                    <div>
                      <label>Parent:
                        <input
                          type="radio"
                          id='parentRole'
                          name={`memberRole${memberNumber}`}
                          required={true}
                        />
                      </label>
                      <label>Child:
                        <input
                          type="radio"
                          id='childRole'
                          name={`memberRole${memberNumber}`}
                          required={true}
                        />
                      </label>
                    </div>
                  </fieldset>
          </>
      )
  }
export {
  MemberFieldSet,
  ExistingMemberFieldSet
}