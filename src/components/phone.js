import PropTypes from 'prop-types';

function Phone({phone}){
    // remove '-'
    if(!phone){
        return <></>;
    }
    const phoneNNumber = phone?.replaceAll('-', '');
    return (
        <div className="phone">
            <span className="title">Phone</span><span>{phoneNNumber}</span>
        </div>
    )
}

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
};

export default Phone;