import React from 'react'

//css
import familyStyles from "./familyCard.module.css";

//family should be an object with family data: family name, array of parents(headofhousehold), and array of children
const FamilyCard = ({family}) => {
    return (
        <div className={familyStyles.card}>
            <div className={familyStyles.familyContainer}>
                <div className={familyStyles.parentContainer}>{family.headOfHouse.map((parent, index) => (<p key={index} className={familyStyles.parent}>{parent}</p>))}</div>
                <div className={familyStyles.familyName}>{family.familyName}</div>
                <div className={familyStyles.childContainer}>{family.children.map((child,index) => ( <p key={index} className={familyStyles.child}>{child}</p>))}</div>
            </div>
            <button className={familyStyles.editButton}> Edit </button>
        </div>
    )
}
export default FamilyCard;