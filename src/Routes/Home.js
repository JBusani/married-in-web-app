import React from 'react';
import Layout from '../components/Layout';
import noseTouch from "../assets/weddingNose.jpg";
import homeStyles from './homeStyles.css';

const Home = () => {

    return(
        <main>
            <div className={homeStyles.card}>
                <img src={noseTouch} />
                <div>
                    <h2>You got married! Great!</h2>
                    <h3>But whose nose are you smooshing with right now?</h3>
                    <h3>Never forget the names of your extended family again! <b>Married In to the rescue.</b></h3>
                    
                </div>
            </div>
        </main>
    )
}
export default Home;