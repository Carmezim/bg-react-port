import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { ITEM } from "./constants";

const itemSource = {
	beginDrag(props) {
		return {
			text: props.text
		};
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

const propTypes = {
	text: PropTypes.string.isRequired,

	// Injected by React DnD:
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

class Item extends React.Component {
	render() {
		const { isDragging, connectDragSource, text } = this.props;
		return connectDragSource(
			<div style={{ opacity: isDragging ? 0.5 : 1 }}>
				{text}
			</div>
		);
	}
}

Item.propTypes = propTypes;

export default DragSource(ITEM, itemSource, collect)(Item);
