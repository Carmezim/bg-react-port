import React from "react";
import PropTypes from "prop-types";

const LogoutButton = props => {
	const { className, hasToken, onClick } = props;

	return (
		<div className={className}>
			{!!hasToken && <button onClick={onClick}>Logout</button>}
		</div>
	);
};

LogoutButton.propTypes = {
	hasToken: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
	buttonClass: PropTypes.string.isRequired
};

export default LogoutButton;
