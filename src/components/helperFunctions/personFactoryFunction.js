import PropTypes from 'prop-types';

//return a person object

export default function createPerson(firstName, parentRole, childRole, id = "", familyName ){
    return {
        firstName,
        parentRole,
        childRole,
        id,
        familyName
      }
};

createPerson.propTypes = {
    firstName: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
    parentRole: PropTypes.bool,
    childRole: PropTypes.bool,
    id: PropTypes.string,
    familyName: PropTypes.string.isRequired,
}