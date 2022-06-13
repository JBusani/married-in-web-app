import PropTypes from 'prop-types';

//return a specific person object for writing to the firebase firestore database.

//existing will determine if person needs to be merged or not

export default function createPersonByFormData(inputFields, familyName){
     //template of a person
     let familyMember = {
        firstName: "",
        parentRole: false,
        childRole: false,
        existing: false,
        id: "",
        familyName: familyName
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
      return familyMember;
};

createPersonByFormData.propTypes = {
    inputFields: PropTypes.array.isRequired,
    familyName: PropTypes.string.isRequired
}