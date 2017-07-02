import React from "react";
import PropTypes from "prop-types";
import { DragSource } from "react-dnd";
import { ITEM } from "./Constants";

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
	listItem: PropTypes.node.isRequired,

	// Injected by React DnD:
	isDragging: PropTypes.bool.isRequired,
	connectDragSource: PropTypes.func.isRequired
};

const DraggableComponent = props => {
	const { isDragging, connectDragSource, listItem } = props;
	return connectDragSource(
		<div style={{ opacity: isDragging ? 0.5 : 1 }}>
			{listItem}
		</div>
	);
};

DragListItem.propTypes = propTypes;

export default DragSource(ITEM, itemSource, collect)(DragListItem);
