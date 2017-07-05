import React from "react";
import PropTypes from "prop-types";

const Messages = props => {
	const { className, messages } = props;
	return (
		<div className={className}>
			<ul>
				{messages.map(message =>
					<li key={message.time}>
						{message.body}
					</li>
				)}
			</ul>
		</div>
	);
};

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			body: PropTypes.string,
			time: PropTypes.date
		})
	)
};

export default Messages;
