import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { flow } from "lodash";

const style = {
	border: "1px dashed gray",
	padding: "0.5rem 1rem",
	marginBottom: ".5rem",
	backgroundColor: "white",
	cursor: "move"
};

const itemSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index
		};
	},
	isDragging(props, monitor) {
		return props.index === monitor.getItem().id;
	}
};

const itemTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveItem(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	}
};

const colletctDrop = (
	ItemTypes.ITEM,
	itemTarget,
	connect => ({
		connectDropTarget: connect.dropTarget()
	})
);

const collectDrag = (
	ItemTypes.ITEM,
	itemSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	})
);

class Item extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		moveItem: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		time: PropTypes.string
	};

	render() {
		const {
			date,
			name,
			price,
			time,
			title,
			isDragging,
			connectDragSource,
			connectDropTarget
		} = this.props;

		const opacity = isDragging ? 0.5 : 1;

		return connectDragSource(
			connectDropTarget(
				<div style={{ ...style, opacity }} className="draggable-list-item">
					<div className="panel-content">
						<div className="pan-col pan-title">
							<h3>
								<strong>
									{name}
								</strong>
							</h3>
						</div>
						<div className="pan-col col-same pan-event-title">
							<p>
								{title}
							</p>
						</div>

						<div className="pan-col pan-date">
							<p>
								{date}
							</p>
						</div>

						<div className="pan-col col-same pan-price">
							<p>
								{price}
							</p>
						</div>
					</div>
					<div className="pan-col col-same">
						{time}
					</div>
				</div>
			)
		);
	}
}

export default flow(
	DragSource(ItemTypes.ITEM, itemSource, collectDrag),
	DropTarget(ItemTypes.ITEM, itemTarget, colletctDrop)
)(Item);
