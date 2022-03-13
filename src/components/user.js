import Address from './address';
import Phone from './phone';
import PropTypes from 'prop-types';

function User({user, onClick}){
    // use destructring
    const { 
        picture: {thumbnail = undefined} = {}, 
        name: {title = "", first = "", last = ""} = {}, 
        login: {username = ""} = {},  
        email = "", dob: {date = ""} = {}, 
        location: userLocation = {}, 
        phone = "" } = user || {};

    const handleClick = () => {
        if(onClick){
            onClick(user);
        }
    }
    return (
        <div className="user" onClick={handleClick}>
            <img src={thumbnail} alt={`${first} ${last} `} className=""></img>
            <div>
                <span>{`${title} ${first} ${last} `}</span>
                <span className='title'>User Name:</span><span className='username'>{username}</span>
                <span className='title'>Email:</span><span>{email}</span>
                <span className='title'>DOB:</span><span>{new Date(date).toLocaleDateString()}</span>
                <Address userLocation={userLocation}/>
                <Phone phone={phone}/>
            </div>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};


export default User;