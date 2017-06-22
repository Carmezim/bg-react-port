import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ label, labelFor, inputClass, type, name, id, onChange }) => {
	return (
		<div>
			<label className="cd-label" for={labelFor}>{label}</label>
			<input
				className={inputClass}
				type={type}
				name={name}
				id={id}
				onchange=t{onChange}
				required />
		</div>
	);
};

LoginForm.propTypes = {
	label: PropTypes.string.isRequired,
	labelFor: PropTypes.string.isRequired,
	inputClass: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default LoginForm;