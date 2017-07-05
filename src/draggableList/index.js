import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import flow from "lodash/flow";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

// import component
import Item from "../common/draganddrop/Item";

// import action
import { moveItemRequest } from "./actions";

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.moveItem = this.moveItem.bind(this);
	}

	static propTypes = {
		moveItemRequest: PropTypes.func,
		draggable: PropTypes.shape({
			itemsList: PropTypes.array,
			requesting: PropTypes.bool,
			messages: PropTypes.array,
			error: PropTypes.array
		})
	};

	moveItem(dragIndex, hoverIndex) {
		const { draggable: itemsList } = this.props;
		const dragItem = itemsList.itemsList[dragIndex];

		this.props.moveItemRequest(
			itemsList.itemsList,
			dragIndex,
			hoverIndex,
			dragItem
		);
	}

	render() {
		const {
			draggable: { itemsList, requesting, messages, errors }
		} = this.props;

		return (
			<div className="draggable-list">
				{itemsList.map((item, key) =>
					<Item
						key={item.id}
						index={key}
						id={item.id}
						item={item.text}
						moveItem={this.moveItem}
					/>
				)}
				{!!errors && console.error(errors.error)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	draggable: state.draggable
});

export default flow(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, { moveItemRequest })
)(ListItem);
