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
		draggable: PropTypes.shape({
			itemsList: PropTypes.array,
			pending: PropTypes.bool
		}),
		moveItemRequest: PropTypes.func
	};

	moveItem(dragIndex, hoverIndex) {
		const { draggable: itemsList } = this.props;
		const dragItem = itemsList.itemsList[dragIndex];
		this.props.moveItemRequest(itemsList.itemsList, dragIndex, hoverIndex, dragItem);
	}

	render() {
		const { draggable: itemsList } = this.props;
		console.log(itemsList);
		return (
			<div className="draggable-list">
				{itemsList.itemsList
					.filter(item => item !== null)
					.map((item, i) =>
						<Item
							key={item.id}
							index={i}
							id={item.id}
							item={item.text}
							moveItem={this.moveItem}
						/>
					)}
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
