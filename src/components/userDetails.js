import React, { useContext } from 'react';
import UserContext from '../userContext';
import Phone from './phone';
import PropTypes from 'prop-types';

function UserDetails({onHide}){
    // use destructring
    const user = useContext(UserContext)
    const { 
        picture: {large = undefined} = {}, 
        name: {title = "", first = "", last = ""} = {}, 
        gender = "",
        registered : {date = ""} = {},
        email = "", 
        phone = "" } = user || {};

    const handleClick = () => {
        if(onHide){
            onHide(user);
        }
    }
    return (
        <div className="expandedView" onClick={handleClick}>
            <div>
                <img src={large} alt={`${first} ${last} `}></img>
                <div>
                    <span>{`${title} ${first} ${last} `}</span>
                    <div><span className='title'>Gender:</span><span>{gender}</span></div>
                    <div><span className='title'>Email:</span><span>{email}</span></div>
                    <div><span className='title'>Registered Since:</span><span>{new Date(date).toLocaleDateString()}</span></div>
                    <Phone phone={phone}/>
                </div>
            </div>
        </div>
    )
}


UserDetails.propTypes = {
    onHide: PropTypes.func.isRequired,
};

export default UserDetails;