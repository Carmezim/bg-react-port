import React from 'react';
import PropTypes from 'prop-types';


const LogoutButton = (props) => {

	const { buttonClass, token, onClick } = props;

	return (
		<div className={buttonClass}>
			{!!token && (
				<button onClick={onClick}>
					Logout
				</button>)}
		</div>
	);
};

LogoutButton.propTypes = {
	token: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	buttonClass: PropTypes.string.isRequired,
};


export default LogoutButton;