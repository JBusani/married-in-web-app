import React from 'react'

//css
import familyStyles from "./familyCard.module.css";

const FamilyCard = ({dashboardFamilyArray, view}) => {
    console.group(dashboardFamilyArray)
    return (
            <div className={familyStyles.card}>
                <div className={familyStyles.familyContainer}>
                    <div className={familyStyles.parentContainer}>{""}</div>
                    <div className={familyStyles.familyName}>{dashboardFamilyArray[view] === undefined ? "No family selected" : dashboardFamilyArray[view].family}</div>
                    <div className={familyStyles.childContainer}>{""}</div>
                </div>
            <button className={familyStyles.editButton}> Edit </button>
        </div>
    )
}
export default FamilyCard;