import PropTypes from 'prop-types';

function Address({userLocation}){
    // use destructring
    const { street: { name = "" } = {}, city = "", country = "", postcode = ""} = userLocation || {};
    return (
        <div className="address">
            <span className="title">Address</span>
            <span>{name}</span>
            <span>{city}</span>
            <span>{country}</span>
            <span>{postcode}</span>
        </div>
    )
}

Address.propTypes = {
    userLocation: PropTypes.object.isRequired,
};

export default Address;