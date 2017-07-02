import React from "react";
import PropTpes from "prop-types";

const ListItem = props => {
	const { className, key, content } = props;

	return (
		<div key={key} className={className}>
			{content}
		</div>
	);
};

ListItem.propTypes = {
	classname: PropTpes.string.isRequired,
	key: PropTpes.number.isRequired,
	content: PropTpes.array.isRequired
};

export default ListItem;
