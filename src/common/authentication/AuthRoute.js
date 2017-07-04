import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PRIVATE_ROOT = "/dashboard";
const PUBLIC_ROOT = "/admin";

const AuthRoute = ({ component, ...props }) => {
	const { isPrivate, client: { token } } = props;
	const isAuthenticated = token ? true : false;

	if (isAuthenticated) {
		//User is Authenticated
		if (isPrivate === true) {
			//If the route is private the user may proceed.
			return (
				<Route
					path={props.path}
					component={props.comonent}
					{...props}
					component={component}
				/>
			);
		} else {
			//If the route is public, the user is redirected to the app's private root.
			return <Redirect to={PRIVATE_ROOT} />;
		}
	} else {
		//User is not Authenticated
		if (isPrivate === true) {
			//If the route is private the user is redirected to the app's public root.
			return <Redirect to={PUBLIC_ROOT} />;
		} else {
			//If the route is public, the user may proceed.
			return <Route {...props} component={component} />;
		}
	}
};

const mapStateToProps = state => ({
	client: state.client
});


AuthRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	isPrivate: PropTypes.bool.isRequired,
	client: PropTypes.shape({
		token: PropTypes.string
	})
};

export default connect(mapStateToProps)(AuthRoute);
