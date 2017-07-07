import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

const style = {
	padding: "10px 20px",
	width: 100,
	display: "block",
	margin: "20px auto",
	fontSize: "16px"
};

// we need a separate component for button to be able
// remotely submit (submit from another component) with
// Redux Form. This submit button is not connected to the
// form, it only dispatches an action via Redux
const SubmitButton = ({ dispatch }) =>
	<button
		type="button"
		style={style}
		onClick={() => dispatch(submit("EventTemplate"))}
	>
		Submit
	</button>;

export default connect()(SubmitButton);
