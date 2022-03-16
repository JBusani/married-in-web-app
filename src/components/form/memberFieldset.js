import React, {useRef} from 'react';

const MemberFieldSet = ({memberNumber}) => {

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
                        name={`member${memberNumber}`}
                        required={true}
                      />
                    </label>
                    <label>Child:
                      <input
                        type="radio"
                        id='childRole'
                        name={`member${memberNumber}`}
                        required={true}
                      />
                    </label>
                  </div>
                </fieldset>
        </>
    )
}

export default MemberFieldSet;