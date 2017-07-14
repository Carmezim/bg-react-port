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

class ItemsList extends Component {
	constructor(props) {
		super(props);
		this.moveItem = this.moveItem.bind(this);
	}

	static propTypes = {
		moveItemRequest: PropTypes.func,
		draggable: PropTypes.shape({
			itemsList: PropTypes.array,
			isFetching: PropTypes.bool,
			requesting: PropTypes.bool,
			messages: PropTypes.array,
			error: PropTypes.array
		})
	};

	moveItem(dragIndex, hoverIndex) {
		const { draggable: itemsList } = this.props;
		const dragItem = itemsList.itemsList[dragIndex];
		console.log("Move Item", itemsList.itemsList)
		this.props.moveItemRequest(
			itemsList.itemsList,
			dragIndex,
			hoverIndex,
			dragItem
		);
	}

	render() {
		const {
			draggable: { isFetching, itemsList, requesting, messages, errors }
		} = this.props;
		console.log(itemsList)
		console.log(itemsList[0])
		return (
			<div className="draggable-list">
				{console.log(itemsList)}
				{!!isFetching && <div>Loading events...</div>}
				{!isFetching &&
					itemsList.map((item, key) => {
						const {
							name,
							title,
							price,
							startDate,
							startTime
						} = item.attributes;
						// Render each event onto a draggable item
						return (
							<div key={key}>
								{!!itemsList && (
									<Item
										key={item.id}
										index={key}
										id={item.id}
										name={name ? name : "Parse didn't fetch name"}
										title={title ? title : "Parse didn't fetch title"}
										price={price ? price : ""}
										date={startDate ? startDate.toString() : ""}
										time={startTime}
										moveItem={this.moveItem}
									/>)}
							</div>
						)}
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
)(ItemsList);
